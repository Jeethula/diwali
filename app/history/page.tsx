"use client";

import { useLanguage } from '@/components/language-provider';
import { NavBar } from '@/components/nav-bar';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function History() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-500/20 to-yellow-500/20">
      <NavBar />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="text-4xl font-bold text-center mb-12">{t('history.title')}</h1>
        
        <Tabs defaultValue="story" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="story">Story</TabsTrigger>
            <TabsTrigger value="tamil">{t('history.tamil')}</TabsTrigger>
          </TabsList>
          <TabsContent value="story">
            <Card>
              <CardHeader>
                <CardTitle>The Legend of Diwali</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Diwali, the festival of lights, celebrates the victory of light over darkness, good over evil, and knowledge over ignorance. The most popular story behind Diwali is the return of Lord Rama to Ayodhya after 14 years of exile and his victory over Ravana.
                </p>
                <p>
                  According to the epic Ramayana, the people of Ayodhya lit diyas (oil lamps) to celebrate the return of their beloved prince Rama and to illuminate his path. This tradition continues to this day, with homes and streets being decorated with lights during Diwali.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tamil">
            <Card>
              <CardHeader>
                <CardTitle>Diwali in Tamil Nadu</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  In Tamil Nadu, Diwali is celebrated in the Tamil month of Aippasi. The day begins early with the traditional oil bath ritual known as "Ganga Snanam." People wear new clothes and seek blessings from elders.
                </p>
                <p>
                  The celebration is marked by the bursting of crackers, preparation of traditional sweets like Adhirasam and Mysore Pak, and the lighting of diyas. Families gather to share meals and exchange gifts, making it a time of joy and togetherness.
                </p>
                <p>
                  The festival also has religious significance, with people visiting temples to offer prayers and seek blessings for prosperity and happiness in the coming year.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </main>
  );
}