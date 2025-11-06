
import React, { useState } from 'react';
import SawBladeCalculator from './components/SawBladeCalculator';
import DrillBitCalculator from './components/DrillBitCalculator';
import RingBlankCalculator from './components/RingBlankCalculator';

type CalculatorType = 'saw' | 'drill' | 'ring';

const SawIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 7.629A6 6 0 106.38 17.38l.001-.001M10.38 13.62a3 3 0 10-4.242-4.242 3 3 0 004.242 4.242z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21l-8-8 8-8 8 8-8 8zm0 0v-8" />
  </svg>
);

const DrillIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const RingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
  </svg>
);

const App: React.FC = () => {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>('saw');

  const renderCalculator = () => {
    switch (activeCalculator) {
      case 'saw':
        return <SawBladeCalculator />;
      case 'drill':
        return <DrillBitCalculator />;
      case 'ring':
        return <RingBlankCalculator />;
      default:
        return <SawBladeCalculator />;
    }
  };
  
  const NavButton: React.FC<{
    calcType: CalculatorType;
    label: string;
    children: React.ReactNode;
  }> = ({ calcType, label, children }) => (
    <button
      onClick={() => setActiveCalculator(calcType)}
      className={`flex-1 flex items-center justify-center p-3 md:p-4 text-sm md:text-base font-medium transition-all duration-300 ease-in-out border-b-4 focus:outline-none ${
        activeCalculator === calcType
          ? 'text-cyan-400 border-cyan-400'
          : 'text-slate-400 border-transparent hover:bg-slate-700/50 hover:text-cyan-300'
      }`}
    >
      {children}
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-900 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-100 tracking-tight">
            Metalsmithing Calculator
          </h1>
          <p className="text-slate-400 mt-2 text-lg">
            Tools for the beginning jeweler.
          </p>
        </header>

        <main className="bg-slate-800 rounded-xl shadow-2xl shadow-slate-950/50 overflow-hidden">
          <nav className="flex border-b border-slate-700">
            <NavButton calcType="saw" label="Saw Blade"><SawIcon /></NavButton>
            <NavButton calcType="drill" label="Drill Bit"><DrillIcon /></NavButton>
            <NavButton calcType="ring" label="Ring Blank"><RingIcon /></NavButton>
          </nav>
          
          <div className="p-6 md:p-8">
            {renderCalculator()}
          </div>
        </main>
        
        <footer className="text-center mt-8 text-sm text-slate-500">
          <p>&copy; Built from reference materials provided by ML Jewelry Designs.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
