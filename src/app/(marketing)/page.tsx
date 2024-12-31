import React from 'react';
import { Button } from '@/components/ui/button';
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from '@clerk/nextjs';
import {
  Loader,
  Rocket,
  Brain,
  Target,
  Users,
  Stars,
  Sparkles,
  MessageSquare,
  Globe,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const features = [
    {
      icon: <Brain className="w-8 h-8 text-indigo-500" />,
      title: 'Smart & Fun Learning',
      description: 'Our AI buddy adapts to how you learn best!',
    },
    {
      icon: <Target className="w-8 h-8 text-green-500" />,
      title: 'Level Up Your Skills',
      description: 'Complete quests and unlock new language powers',
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-sky-500" />,
      title: 'Practice Adventures',
      description: 'Chat with friendly natives and AI companions',
    },
    {
      icon: <Users className="w-8 h-8 text-rose-500" />,
      title: 'Join the Party',
      description: 'Team up with fellow language explorers',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto pt-12 px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center lg:items-start gap-y-8 lg:max-w-[600px]">
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 border-2 border-slate-200">
              <Globe className="w-5 h-5 text-sky-500 animate-spin-slow" />
              <span className="font-bold text-slate-600">
                Welcome to your language adventure!
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-800 text-center lg:text-left">
              Turn Language Learning into an
              <span className="text-sky-500"> Awesome Adventure!</span>
            </h1>

            <p className="text-lg text-slate-600 text-center lg:text-left">
              Join our squad of language explorers! Learn, play, and level up
              your language skills with our super-fun AI-powered platform. Ready
              to begin your quest? 🚀
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <ClerkLoading>
                <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
              </ClerkLoading>
              <ClerkLoaded>
                <SignedOut>
                  <SignUpButton mode="modal">
                    <Button
                      size="lg"
                      variant="secondary"
                      className="w-full sm:w-auto"
                    >
                      <Rocket className="w-5 h-5" />
                      Start Your Adventure
                    </Button>
                  </SignUpButton>
                  <SignInButton mode="modal">
                    <Button
                      size="lg"
                      variant="primaryOutline"
                      className="w-full sm:w-auto"
                    >
                      <Sparkles className="w-5 h-5" />
                      Return to Quest
                    </Button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <Button
                    size="lg"
                    variant="super"
                    className="w-full sm:w-auto"
                    asChild
                  >
                    <Link href="/learn">
                      <Stars className="w-5 h-5" />
                      Continue Adventure
                    </Link>
                  </Button>
                </SignedIn>
              </ClerkLoaded>
            </div>
          </div>

          <div className="relative w-[280px] h-[280px] lg:w-[500px] lg:h-[500px]">
            <Image
              src="/hero.svg"
              fill
              alt="Language learning adventure"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-800 mb-4">
              Your Learning Superpowers
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Unlock amazing abilities on your language learning journey! 🌟
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border-2 border-slate-200 border-b-4 hover:border-b-2 hover:translate-y-[2px] transition-all"
              >
                <Button size="icon" className="mb-4">
                  {feature.icon}
                </Button>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white border-y-2 border-slate-200">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Stars className="w-8 h-8 text-yellow-500" />
            <h2 className="text-3xl font-extrabold text-slate-800">
              Join Our League of Language Heroes!
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Button
              variant="super"
              className="flex flex-col items-center h-auto py-6"
            >
              <span className="text-4xl font-extrabold">1M+</span>
              <span className="text-sm">Active Explorers</span>
            </Button>
            <Button
              variant="primary"
              className="flex flex-col items-center h-auto py-6"
            >
              <span className="text-4xl font-extrabold">5+</span>
              <span className="text-sm">Language Quests</span>
            </Button>
            <Button
              variant="secondary"
              className="flex flex-col items-center h-auto py-6"
            >
              <span className="text-4xl font-extrabold">4.8</span>
              <span className="text-sm">Star Rating</span>
            </Button>
            <Button
              variant="danger"
              className="flex flex-col items-center h-auto py-6"
            >
              <span className="text-4xl font-extrabold">95%</span>
              <span className="text-sm">Success Rate</span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
