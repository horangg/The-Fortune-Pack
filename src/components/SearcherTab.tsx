import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  RotateCcw, 
  Send, 
  Star, 
  Sparkles, 
  Moon, 
  Heart, 
  Crown, 
  Flame, 
  Sword, 
  Droplet, 
  Coins 
} from 'lucide-react';
import { findCardByCode } from '../data/tarotData';
import { TarotCard } from '../types';

// A custom image replacing the retro pixelated eye SVG
const RetroEye: React.FC = () => (
  <img 
    src={`${import.meta.env.BASE_URL}custom-icon.png`} 
    alt="Custom Icon" 
    className="mx-auto opacity-90 w-[40px] h-auto object-contain"
  />
);

const getCardImageSrc = (englishName: string) => {
  let fileName = englishName;
  if (englishName === "The Hierophant") fileName = "The HiePophant";
  else if (englishName === "The Lovers") fileName = "The Lover";
  else if (englishName === "Judgment") fileName = "Judgement";
  return `${import.meta.env.BASE_URL}Card/${fileName}.jpg`;
};

export const SearcherTab: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);
  const [searchError, setSearchError] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Sync state with code
  useEffect(() => {
    if (code.length === 3) {
      const card = findCardByCode(code);
      if (card) {
        setSelectedCard(card);
        setSearchError(false);
      } else {
        setSelectedCard(null);
        setSearchError(true);
      }
    } else {
      setSelectedCard(null);
      setSearchError(false);
    }
  }, [code]);

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const handleClear = () => {
    setCode('');
    setSelectedCard(null);
    setSearchError(false);
    // Keep focused
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  const handleShare = () => {
    if (!selectedCard) return;
    const shareText = `[Tarot Card Guide] 내가 찾은 운명의 카드: ${selectedCard.name} (${selectedCard.englishName}) - "${selectedCard.uprightMeaning}"`;
    if (navigator.share) {
      navigator.share({
        title: 'Tarot Card Guide',
        text: shareText,
        url: window.location.href,
      }).catch(err => console.log(err));
    } else {
      navigator.clipboard.writeText(`${shareText}\n${window.location.href}`);
      alert('결과가 클립보드에 복사되었습니다!');
    }
  };

  // Helper to get card symbol icon
  const getSymbolIcon = (type: string, symbol: string) => {
    const size = "w-8 h-8 text-white";
    switch (type) {
      case 'major':
        if (symbol === 'Moon') return <Moon className={size} />;
        if (symbol === 'Heart') return <Heart className={size} />;
        if (symbol === 'Crown') return <Crown className={size} />;
        return <Star className={size} />;
      case 'swords':
        return <Sword className={size} />;
      case 'cups':
        return <Droplet className={size} />;
      case 'pentacles':
        return <Coins className={size} />;
      case 'wands':
        return <Flame className={size} />;
      default:
        return <Sparkles className={size} />;
    }
  };

  // Extract meaning into paragraphs
  const getFormattedParagraphs = (card: TarotCard) => {
    return {
      p1: card.keyword ? `${card.keyword}.` : `${card.englishName}.`,
      p2: card.uprightMeaning || `${card.englishName} 카드가 알려주는 당신의 미래 에너지는 순수하고 찬란한 변화를 이끕니다.`
    };
  };

  const paragraphs = selectedCard ? getFormattedParagraphs(selectedCard) : null;

  // Extract keywords
  const getKeywords = (card: TarotCard) => {
    if (card.keyword) {
      return card.keyword.split(/[,/]/).map(w => `#${w.trim().replace(/\s+/g, '')}`).join(' ');
    }
    return `#신비 #운명 #${card.englishName.replace(/\s+/g, '')}`;
  };

  return (
    <div 
      className="flex-1 flex flex-col justify-between items-center px-6 py-8 min-h-[580px] select-none text-white bg-black w-full"
      onClick={handleContainerClick}
    >
      {/* Hidden inputs to capture physical keyboard/mobile keypad typing */}
      <input
        ref={inputRef}
        type="text"
        pattern="[0-9]*"
        inputMode="numeric"
        maxLength={3}
        value={code}
        onChange={(e) => {
          const val = e.target.value.replace(/\D/g, '').slice(0, 3);
          setCode(val);
        }}
        className="absolute opacity-0 pointer-events-none w-0 h-0"
        autoFocus
      />

      <AnimatePresence mode="wait">
        {!selectedCard ? (
          // ================= IMAGE 1: CODE INPUT VIEW =================
          <motion.div
            key="input-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-sm flex flex-col justify-between items-center flex-1 py-4 space-y-12"
          >
            {/* Top Logo and Title */}
            <div className="text-center space-y-1">
              <RetroEye />
              <h1 className="text-white">
                Tarot Card Guide
              </h1>
            </div>

            {/* Three entry card boxes */}
            <div className="flex justify-center items-center gap-4 py-4 w-full">
              {[0, 1, 2].map((idx) => {
                const digit = code[idx] || '';
                return (
                  <div
                    key={idx}
                    className="w-16 h-16 border-[1px] border-white flex items-center justify-center text-white bg-black"
                  >
                    {digit}
                  </div>
                );
              })}
            </div>

            {/* Lower dialogue container with double white outline */}
            <div className="w-full px-2">
              <div className="border border-white p-1 bg-black">
                <div className="border border-white py-6 px-4 text-center space-y-4">
                  <p className="text-white leading-relaxed">
                    {searchError 
                      ? "기록되지 않은 신비한 코드입니다. 다시 입력해 주세요."
                      : <>네모칸을 클릭하여<br/>세 자리 숫자코드를 입력하세요.</>
                    }
                  </p>
                  <span className="text-white block pulsing-arrow">
                    ▽
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          // ================= IMAGE 2: CARD DETAILS VIEW =================
          <motion.div
            key="detail-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-sm flex flex-col items-center flex-1 py-2 space-y-4 tracking-tight break-keep"
          >
            {/* Card Name Header */}
            <h2 className="text-center text-white mt-2 flex flex-col items-center gap-1">
              <span className="text-lg">{selectedCard.name}</span>
              <span className="text-[14px] font-normal text-gray-400 font-sans tracking-normal">{selectedCard.englishName}</span>
            </h2>

            {/* Card Image Box (Sharp rectangle) */}
            <div className="w-48 aspect-[60/103] border-[1px] border-white flex flex-col items-center justify-center bg-black relative overflow-hidden">
              <img 
                src={getCardImageSrc(selectedCard.englishName)} 
                alt={selectedCard.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Keywords in custom golden/orange color */}
            <p className="text-[#FF9900] text-center text-[12px] pt-1">
              {getKeywords(selectedCard)}
            </p>

            {/* Description Text blocks */}
            <div className="space-y-4 px-2 text-center pt-2 w-full max-w-[280px]">
              {/* Upright Meaning */}
              <div>
                <div className="inline-block border border-[#FF9900] text-[#FF9900] text-[10px] px-1.5 py-0.5 mb-1.5 rounded-sm bg-[#FF9900]/10">정방향</div>
                <p className="text-[#FF9900] leading-[1.6] text-[13px] break-keep">
                  {selectedCard.uprightMeaning}
                </p>
              </div>
              
              {/* Reversed Meaning */}
              {selectedCard.reversedMeaning && (
                <div>
                  <div className="inline-block border border-neutral-500 text-neutral-400 text-[10px] px-1.5 py-0.5 mb-1.5 rounded-sm bg-neutral-500/10">역방향</div>
                  <p className="text-neutral-300 leading-[1.6] text-[13px] break-keep">
                    {selectedCard.reversedMeaning}
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Actions Buttons (Vertical style: icon + label) */}
            <div className="flex justify-center items-center gap-16 pt-4 w-full select-none">
              <button 
                onClick={handleClear} 
                className="flex flex-col items-center gap-2 text-white hover:opacity-80 transition-opacity cursor-pointer group"
              >
                <RotateCcw className="w-6 h-6 text-white" />
                <span className="text-[11px]">돌아가기</span>
              </button>

              <button 
                onClick={handleShare} 
                className="flex flex-col items-center gap-2 text-white hover:opacity-80 transition-opacity cursor-pointer group"
              >
                <Send className="w-6 h-6 text-white" />
                <span className="text-[11px]">공유하기</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
