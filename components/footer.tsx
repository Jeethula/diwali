"use client";

import { useLanguage } from './language-provider';
import { Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-background/80 backdrop-blur-sm border-t w-full">
      <div className="mx-auto px-4 py-8 container">
        <div className="flex flex-col justify-center items-center gap-4">
          <p className="text-muted-foreground text-sm">
            {t('footer.created')} Jeethu LA
          </p>
          <div className="flex gap-4">
            <a href="https://github.com/jeethula" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/in/jeethula" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:jeeththenthar@gmail.com">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}