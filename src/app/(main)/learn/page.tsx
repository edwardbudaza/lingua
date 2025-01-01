import { redirect } from 'next/navigation';

import { getUserProgress } from '@/db/queries';
import { FeedWrapper } from '@/components/shared/feed-wrapper';
import { UserProgress } from '@/components/shared/user-progress';
import { StickyWrapper } from '@/components/shared/sticky-wrapper';

import { Header } from './_components/header';

const LearnPage = async () => {
  const userProgressData = getUserProgress();

  const [userProgress] = await Promise.all([userProgressData]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect('/courses');
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={{ title: 'Spanish', imageSrc: '/es.svg' }}
          hearts={5}
          points={100}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title="Spanish" />
      </FeedWrapper>
    </div>
  );
};
export default LearnPage;
