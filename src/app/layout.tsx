import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';

import { Toaster } from '@/components/ui/sonner';
import { ExitModal } from '@/components/modals/exit-modal';

import './globals.css';

const font = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Lingua - AI-Powered Language Learning Platform',
    template: '%s | Lingua',
  },
  description:
    "Master new languages naturally with Lingua's AI-powered platform. Join millions of learners worldwide and experience personalized language learning through interactive lessons, native conversations, and adaptive technology.",
  keywords: [
    'language learning',
    'AI language tutor',
    'learn languages online',
    'language practice',
    'language learning app',
    'interactive language learning',
    'online language courses',
  ],
  authors: [{ name: 'Lingua' }],
  creator: 'Lingua',
  publisher: 'Lingua',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      {
        url: '/mascot.svg',
        type: 'image/svg+xml',
      },
    ],
    shortcut: ['/mascot.svg'],
    apple: [
      {
        url: '/mascot.svg',
        type: 'image/svg+xml',
      },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lingua.com',
    title: 'Lingua - AI-Powered Language Learning Platform',
    description:
      "Master new languages naturally with Lingua's AI-powered platform. Join millions of learners worldwide and experience personalized language learning.",
    siteName: 'Lingua',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lingua - Language Learning Platform',
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'education',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html lang="en">
        <body className={font.className}>
          <Toaster />
          <ExitModal />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
