
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-12 py-8 text-center text-sm text-muted-foreground">
      <div className="max-w-7xl mx-auto px-4">
        <p>©{new Date().getFullYear()} Wax Wizard | Calcolatore per Candele</p>
        <p className="mt-2">
          Creato con 💛 da LAB18 Design Studio per gli appassionati di candele
        </p>
      </div>
    </footer>
  );
};

export default Footer;
