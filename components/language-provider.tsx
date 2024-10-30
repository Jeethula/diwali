"use client";

import { createContext, useContext, useState } from 'react';

type Language = 'en' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
}

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.history': 'History',
    'nav.game': 'Play Game',
    'hero.title': 'Happy Diwali',
    'hero.subtitle': 'Festival of Lights',
    'hero.cta': 'Learn More',
    'history.title': 'The Story of Diwali',
    'history.tamil': 'Diwali in Tamil Nadu',
    'game.title': 'Burst Crackers',
    'game.start': 'Start Game',
    'footer.created': 'Created with ❤️ by',
  },
  ta: {
    'nav.home': 'முகப்பு',
    'nav.history': 'வரலாறு',
    'nav.game': 'விளையாட்டு',
    'hero.title': 'இனிய தீபாவளி நல்வாழ்த்துக்கள்',
    'hero.subtitle': 'ஒளியின் திருவிழா',
    'hero.cta': 'மேலும் அறிய',
    'history.title': 'தீபாவளியின் கதை',
    'history.tamil': 'தமிழ்நாட்டில் தீபாவளி',
    'game.title': 'பட்டாசு வெடி',
    'game.start': 'விளையாட்டு தொடங்கு',
    'footer.created': 'உருவாக்கியவர்',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  type TranslationKey = keyof typeof translations.en;

  const t = (key: TranslationKey) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t  }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};