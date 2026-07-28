import { useState, useEffect } from 'react';
import { RulebookTab } from './components/RulebookTab';
import { SearcherTab } from './components/SearcherTab';
import { SpreadGuideTab } from './components/SpreadGuideTab';
import { motion, AnimatePresence } from 'motion/react';

type TabType = 'rulebook' | 'searcher' | 'spread';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>(() => {
    return (localStorage.getItem('activeTab') as TabType) || 'searcher';
  });

  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'rulebook':
        return <RulebookTab />;
      case 'searcher':
        return <SearcherTab />;
      case 'spread':
        return <SpreadGuideTab />;
      default:
        return <SearcherTab />;
    }
  };

  return (
    <div className="min-h-[100dvh] w-full bg-[#050505] flex items-center justify-center p-0 sm:p-4 md:p-6 antialiased text-[13px] selection:bg-white selection:text-white">
      
      {/* Mobile viewport container matching standard screen aspect ratios */}
      <div id="retro-container" className="w-full max-w-[420px] h-[100dvh] sm:h-[840px] bg-black sm:border sm:border-white/20 text-white flex flex-col relative overflow-hidden shadow-2xl">
        
        {/* Main interactive viewport */}
        <main className="flex-1 relative overflow-y-auto pb-28 custom-scrollbar bg-black">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex-1 flex flex-col min-h-full"
            >
              {renderActiveTab()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Elegant Minimalist Bottom Navigation Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-black border-t border-white z-50 py-4 px-2 select-none shadow-[0_-15px_30px_rgba(0,0,0,0.95)]">
          <div className="grid grid-cols-3 max-w-xs mx-auto">
            
            {/* 룰북 Tab Button */}
            <button
              onClick={() => setActiveTab('rulebook')}
              className="flex flex-col items-center justify-center cursor-pointer transition-opacity active:opacity-70"
            >
              <img 
                src={`${import.meta.env.BASE_URL}icon/dice.png`} 
                alt="Rulebook" 
                className={`w-6 h-6 mb-1.5 object-contain transition-all ${
                  activeTab === 'rulebook' ? 'opacity-100' : 'opacity-40'
                }`} 
              />
              <span className={`text-[11px] ${
                activeTab === 'rulebook' ? 'text-white font-bold' : 'text-white/60'
              }`}>
                룰북
              </span>
            </button>

            {/* 리딩북 Tab Button */}
            <button
              onClick={() => setActiveTab('searcher')}
              className="flex flex-col items-center justify-center cursor-pointer transition-opacity active:opacity-70"
            >
              <img 
                src={`${import.meta.env.BASE_URL}icon/Serch.png`} 
                alt="Reading Book" 
                className={`w-6 h-6 mb-1.5 object-contain transition-all ${
                  activeTab === 'searcher' ? 'opacity-100' : 'opacity-40'
                }`} 
              />
              <span className={`text-[11px] ${
                activeTab === 'searcher' ? 'text-white font-bold' : 'text-white/60'
              }`}>
                리딩북
              </span>
            </button>

            {/* 스프레드 Tab Button */}
            <button
              onClick={() => setActiveTab('spread')}
              className="flex flex-col items-center justify-center cursor-pointer transition-opacity active:opacity-70"
            >
              <img 
                src={`${import.meta.env.BASE_URL}icon/card.png`} 
                alt="Spread" 
                className={`w-6 h-6 mb-1.5 object-contain transition-all ${
                  activeTab === 'spread' ? 'opacity-100' : 'opacity-40'
                }`} 
              />
              <span className={`text-[11px] ${
                activeTab === 'spread' ? 'text-white font-bold' : 'text-white/60'
              }`}>
                스프레드
              </span>
            </button>
            
          </div>
        </div>

      </div>
    </div>
  );
}
