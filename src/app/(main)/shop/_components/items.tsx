'use client';

import Image from 'next/image';
import { toast } from 'sonner';
import { useTransition } from 'react';

import { Button } from '@/components/ui/button';
import { refillHearts } from '@/actions/user-progress';

import { POINTS_TO_REFILL } from '@/constants';
import { createStripeUrl } from '@/actions/user-subscription';

type Props = {
  hearts: number;
  points: number;
  hasActivesubscription: boolean;
};

export const Items = ({ hearts, points, hasActivesubscription }: Props) => {
  const [pending, startTransition] = useTransition();

  const onRefillHearts = () => {
    if (pending || hearts === 5 || points < POINTS_TO_REFILL) {
      return;
    }

    startTransition(() => {
      refillHearts().catch(() => toast.error('Something went wrong.'));
    });
  };

  const onUpgrade = () => {
    startTransition(() => {
      createStripeUrl()
        .then((response) => {
          if (response.data) {
            window.location.href = response.data;
          }
        })
        .catch(() => toast.error('Something went wrong. Please try again'));
    }); // TODO: Add action for subscription
  };
  return (
    <ul className="w-full">
      <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
        <Image src="/heart.svg" alt="Heart" width={60} height={60} />
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            Refill hearts
          </p>
        </div>
        <Button
          onClick={onRefillHearts}
          disabled={pending || hearts === 5 || points < POINTS_TO_REFILL}
        >
          {hearts === 5 ? (
            'full'
          ) : (
            <div className="flex items-center">
              <Image src="/points.svg" alt="Points" width={20} height={20} />
              <p>{POINTS_TO_REFILL}</p>
            </div>
          )}
        </Button>
      </div>
      <div className="flex items-center w-full p-4 pt-8 gap-x-4 border-t-2">
        <Image src="/unlimited.svg" alt="Unlimited" width={60} height={60} />
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            Unlimited hearts
          </p>
        </div>
        <Button onClick={onUpgrade} disabled={pending}>
          {hasActivesubscription ? 'settings' : 'upgrade'}
        </Button>
      </div>
    </ul>
  );
};
