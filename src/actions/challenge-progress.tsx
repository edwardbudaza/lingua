'use server';

import { auth } from '@clerk/nextjs/server';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import db from '@/db/drizzle';
import { challengeProgress, challenges, userProgress } from '@/db/schema';
import { getUserProgress } from '@/db/queries';

export const upsertChallengeProgress = async (challengeId: number) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const currentuserProgress = await getUserProgress();
  // TODO: Handle subscription query later

  if (!currentuserProgress) {
    throw new Error('User progress not found');
  }

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  });

  if (!challenge) {
    throw new Error('Challenge not found');
  }

  const lessonId = challenge.lessonId;

  const existingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, userId),
      eq(challengeProgress.challengeId, challengeId)
    ),
  });

  const isPractice = !!existingChallengeProgress;

  // TODO: Not if user has a subscription
  if (currentuserProgress.hearts === 0 && !isPractice) {
    return { error: 'hearts' };
  }

  if (isPractice) {
    await db
      .update(challengeProgress)
      .set({ completed: true })
      .where(eq(challengeProgress.id, existingChallengeProgress.id));

    await db
      .update(userProgress)
      .set({
        hearts: Math.min(currentuserProgress.hearts + 1, 5),
        points: currentuserProgress.points + 10,
      })
      .where(eq(userProgress.userId, userId));

    revalidatePath('/learn');
    revalidatePath('/lesson');
    revalidatePath('/quests');
    revalidatePath('/leaderboard');
    revalidatePath(`/lesson/${lessonId}`);
    return;
  }

  await db.insert(challengeProgress).values({
    challengeId,
    userId,
    completed: true,
  });

  await db
    .update(userProgress)
    .set({
      points: currentuserProgress.points + 10,
    })
    .where(eq(userProgress.userId, userId));

  revalidatePath('/learn');
  revalidatePath('/lesson');
  revalidatePath('/quests');
  revalidatePath('/leaderboard');
  revalidatePath(`/lesson/${lessonId}`);
};
