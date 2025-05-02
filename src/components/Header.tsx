
import React from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn("py-6 text-center", className)}>
      <div className="relative inline-block">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-candle-amber">
          Wax Wizard
        </h1>
        <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-candle-amber to-transparent"></div>
      </div>
      <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
        Calcola facilmente la quantità esatta di ingredienti per le tue candele
      </p>
    </header>
  );
};

export default Header;
