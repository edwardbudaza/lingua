import { FeedWrapper } from '@/components/shared/feed-wrapper';
import { StickyWrapper } from '@/components/shared/sticky-wrapper';
import { Header } from './_components/header';
import { UserProgress } from '@/components/shared/user-progress';

const LearnPage = () => {
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
