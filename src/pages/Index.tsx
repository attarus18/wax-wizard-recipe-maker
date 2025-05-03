
import React from 'react';
import Header from '@/components/Header';
import CandleCalculator from '@/components/CandleCalculator';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container px-4 py-8">
        <Header />
        
        <main className="my-8">
          <CandleCalculator />
        </main>
        
        <Footer />
      </div>
      
      {/* Decorative elements */}
      <div className="fixed top-0 left-0 w-64 h-64 bg-candle-amber/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 z-0"></div>
      <div className="fixed bottom-0 right-0 w-80 h-80 bg-candle-amber/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 z-0"></div>
    </div>
  );
};

export default Index;
