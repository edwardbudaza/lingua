import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe2, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const Footer = () => {
  const languages = [
    { code: 'hr', name: 'Croatian', users: '50K+' },
    { code: 'fr', name: 'French', users: '200K+' },
    { code: 'es', name: 'Spanish', users: '300K+' },
    { code: 'it', name: 'Italian', users: '150K+' },
    { code: 'jp', name: 'Japanese', users: '250K+' },
  ];

  return (
    <footer className="border-t-2 border-slate-200 bg-white pb-4">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-center gap-2 -mt-4">
          <div className="bg-white px-4 py-2 border-2 border-slate-200 rounded-full">
            <Globe2 className="w-5 h-5 text-sky-500" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
          {languages.map((lang) => (
            <Link href={`/learn/${lang.code}`} key={lang.code}>
              <Button
                variant="default"
                size="lg"
                className="w-full h-auto py-4 group hover:scale-105 transition-all duration-200"
              >
                <div className="flex flex-col items-center gap-2">
                  <Image
                    src={`/${lang.code}.svg`}
                    alt={lang.name}
                    height={40}
                    width={40}
                    className="rounded-lg shadow-sm group-hover:shadow-md transition-shadow"
                  />
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-slate-700">
                      {lang.name}
                    </span>
                    <span className="text-xs text-slate-500">
                      {lang.users} Learners
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};
