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
  Globe2,
  Brain,
  Target,
  Users,
  Award,
  Sparkles,
  MessageCircle,
  BookOpen,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const features = [
    {
      icon: <Brain className="w-6 h-6 text-blue-500" />,
      title: 'AI-Powered Learning',
      description:
        'Advanced algorithms adapt to your learning style for personalized language acquisition',
    },
    {
      icon: <Target className="w-6 h-6 text-green-500" />,
      title: 'Goal-Oriented Practice',
      description:
        'Set and achieve meaningful language goals with structured learning paths',
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-purple-500" />,
      title: 'Interactive Conversations',
      description:
        'Practice real-world conversations with native speakers and AI partners',
    },
    {
      icon: <Users className="w-6 h-6 text-orange-500" />,
      title: 'Community Learning',
      description:
        'Connect with fellow language learners and practice together',
    },
  ];

  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto py-12 px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center lg:items-start gap-y-8 lg:max-w-[600px]">
            <div className="flex items-center gap-2 text-blue-600">
              <Globe2 className="w-6 h-6" />
              <span className="font-medium">Welcome to Lingua</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-neutral-800 text-center lg:text-left">
              Master New Languages with Confidence and Joy
            </h1>

            <p className="text-lg text-neutral-600 text-center lg:text-left">
              Join millions of learners worldwide who are transforming their
              lives through language learning. Experience our AI-powered
              platform that makes mastering a new language natural and
              enjoyable.
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
                      <Sparkles className="w-5 h-5 mr-2" />
                      Start Learning Free
                    </Button>
                  </SignUpButton>
                  <SignInButton mode="modal">
                    <Button
                      size="lg"
                      variant="primaryOutline"
                      className="w-full sm:w-auto"
                    >
                      <BookOpen className="w-5 h-5 mr-2" />
                      Sign In
                    </Button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <Button
                    size="lg"
                    variant="secondary"
                    className="w-full sm:w-auto"
                    asChild
                  >
                    <Link href="/learn">
                      <BookOpen className="w-5 h-5 mr-2" />
                      Continue Learning
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
              alt="Language learning illustration"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-neutral-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-800 mb-4">
              Why Choose Lingua?
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge technology with proven learning
              methods to help you achieve fluency faster.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-neutral-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Award className="w-8 h-8 text-yellow-500" />
            <h2 className="text-3xl font-bold text-neutral-800">
              Trusted by Language Learners Worldwide
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-blue-600">1M+</span>
              <span className="text-neutral-600">Active Users</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-green-600">5+</span>
              <span className="text-neutral-600">Languages</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-purple-600">4.8/5</span>
              <span className="text-neutral-600">User Rating</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-orange-600">98%</span>
              <span className="text-neutral-600">Success Rate</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
