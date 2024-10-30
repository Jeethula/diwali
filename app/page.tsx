"use client";

import { useLanguage } from '@/components/language-provider';
import { NavBar } from '@/components/nav-bar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const { t } = useLanguage();
  const [sparkles, setSparkles] = useState<Array<{ id: number; style: any }>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles(current => {
        const newSparkle = {
          id: Date.now(),
          style: {
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${0.5 + Math.random() * 1}s`,
            transform: `scale(${0.5 + Math.random() * 0.5})`,
          }
        };
        return [...current, newSparkle].slice(-20);
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative bg-gradient-to-b from-orange-500/20 to-yellow-500/20 min-h-screen overflow-hidden">
      <NavBar />
      
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="absolute animate-sparkle pointer-events-none"
          style={sparkle.style}
        >
          <Sparkles className="w-4 h-4 text-yellow-400" />
        </div>
      ))}

      <div className="mx-auto px-4 pt-24 pb-16 container">
        <div className="flex flex-col justify-center items-center gap-8 min-h-[80vh]">
          <h1 className="font-bold text-4xl text-center md:text-6xl animate-fade-in">
            {t('hero.title')} <span className="text-yellow-500">🪔</span>
          </h1>
          <p className="text-center text-muted-foreground text-xl md:text-2xl animate-fade-in-delay">
            {t('hero.subtitle')}
          </p>
          <Button asChild className="animate-bounce">
            <Link href="/history">
              {t('hero.cta')}
            </Link>
          </Button>
        </div>

        <div className="gap-6 grid grid-cols-1 md:grid-cols-3 my-16">
          <Card className="bg-background/60 backdrop-blur-sm hover:scale-105 transition-transform">
            <CardContent className="p-6">
              <Link href="/history">
                <h3 className="mb-2 font-semibold text-lg">Tradition</h3>
                <p className="text-muted-foreground text-sm">
                    Discover the rich traditions and customs of Diwali celebration
                </p>
              </Link>
            </CardContent>
          </Card>
          <Card className="bg-background/60 backdrop-blur-sm hover:scale-105 transition-transform">
            <CardContent className="p-6">
              <Link href="/history">
                <h3 className="mb-2 font-semibold text-lg">Culture</h3>
                <p className="text-muted-foreground text-sm">
                      Explore the cultural significance of the festival of lights
                </p>
              </Link>
            </CardContent>
          </Card>
          <Card className="bg-background/60 backdrop-blur-sm hover:scale-105 transition-transform">
            <CardContent className="p-6">
              <Link href="/game">
                <h3 className="mb-2 font-semibold text-lg">Celebration</h3>
                <p className="text-muted-foreground text-sm">
                    Join in the festivities with our interactive cracker game
                </p>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}