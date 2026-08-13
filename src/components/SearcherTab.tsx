import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { findCardByCode } from "../data/tarotData";
import { TarotCard, TarotSymbol } from "../types";
import { SpreadGuideTab } from "./SpreadGuideTab";
import { getCardImageSrc, getSymbolImageSrc } from "../utils/imageUtils";
export const SearcherTab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<"search" | "spread">(
    "search",
  );
  const [code, setCode] = useState<string>("");
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);
  const [selectedSymbol, setSelectedSymbol] = useState<TarotSymbol | null>(null);
  const [searchError, setSearchError] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (activeSubTab === "search") {
      inputRef.current?.focus();
    }
  }, [activeSubTab]);
  useEffect(() => {
    if (code.length === 3) {
      const card = findCardByCode(code);
      if (card) {
        setSelectedCard(card);
        setSelectedSymbol(null);
        setSearchError(false);
        setSaveStatus("");
        inputRef.current?.blur();
      } else {
        setSelectedCard(null);
        setSelectedSymbol(null);
        setSearchError(true);
      }
    } else {
      setSelectedCard(null);
      setSelectedSymbol(null);
      setSearchError(false);
    }
  }, [code]);
  const handleContainerClick = () => {
    if (!selectedCard && activeSubTab === "search") {
      inputRef.current?.focus();
    }
  };
  const handleClear = () => {
    setCode("");
    setSelectedCard(null);
    setSelectedSymbol(null);
    setSearchError(false);
    setSaveStatus("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };
  const getKeywords = (card: TarotCard) => {
    if (card.keyword) {
      return card.keyword
        .split(/[,/]/)
        .map((w) => `#${w.trim().replace(/\s+/g, "")}`)
        .join(" ");
    }
    return `#신비 #운명 #${card.englishName.replace(/\s+/g, "")}`;
  };
  const saveToCalendar = () => {
    if (!selectedCard) return;
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    try {
      const existingDataStr = localStorage.getItem("tarotCalendarData");
      const data = existingDataStr ? JSON.parse(existingDataStr) : {};
      data[todayStr] = selectedCard;
      localStorage.setItem("tarotCalendarData", JSON.stringify(data));
      setSaveStatus("SAVED");
      setTimeout(() => setSaveStatus(""), 2000);
    } catch (e) {
      console.error("Failed to save to calendar", e);
    }
  };
  return (
    <div
      className="flex-1 flex flex-col justify-start items-center px-4 py-4 min-h-[580px] select-none text-black bg-gradient-to-b from-[#E2F0F7] via-[#D3EBCB] to-[#E2F0F7] w-full"
      onClick={handleContainerClick}
    >
      {" "}
      {/* Sub Navigation (Hidden as per design, keeping logically if needed later, but removed from UI) */}
      <div className="flex-1 w-full max-w-sm relative">
        {" "}
        <AnimatePresence mode="wait">
          {" "}
          {activeSubTab === "spread" ? (
            <motion.div
              key="spread-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0"
            >
              {" "}
              <SpreadGuideTab />{" "}
            </motion.div>
          ) : (
            <motion.div
              key="search-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 flex flex-col items-center"
            >
              {" "}
              <input
                ref={inputRef}
                type="text"
                pattern="[0-9]*"
                inputMode="numeric"
                maxLength={3}
                value={code}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 3);
                  setCode(val);
                }}
                className="absolute opacity-0 pointer-events-none w-0 h-0"
                autoFocus
              />{" "}
              {!selectedCard ? (
                <div className="w-full flex flex-col justify-center items-center flex-1 py-4">
                  <div className="text-center space-y-1 mb-8">
                    <h1 className="text-black text-[15px] tracking-tight">
                      {searchError ? "등록되지 않은 코드입니다. 다시 입력해 주세요." : "세 자리 숫자코드를 입력하세요"}
                    </h1>
                  </div>
                  <div className="flex justify-center items-center gap-4 py-4 w-full">
                    {[0, 1, 2].map((idx) => {
                      const digit = code[idx] || "";
                      return (
                        <div
                          key={idx}
                          className={`w-[70px] h-[80px] flex items-center justify-center text-black bg-white/30 backdrop-blur-md rounded-[20px] shadow-[inset_0_2px_10px_rgba(255,255,255,0.7),0_4px_10px_rgba(0,0,0,0.02)] border border-white/60 transition-colors ${digit ? " text-black" : ""}`}
                        >
                          <span className="text-[24px] font-light">
                            {digit}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="w-full flex flex-col items-center flex-1 py-6 space-y-2 tracking-tight break-keep overflow-y-auto pb-10 custom-scrollbar mt-4">
                  
                  {/* Title Area */}
                  <h2 className="text-center mt-2 flex flex-col items-center gap-1">
                    <span className="text-[13px] text-slate-600 font-serif tracking-wider">
                      {selectedCard.type === 'major' ? 'Major Arcana' : 
                       selectedCard.type === 'wands' ? 'Suit of Wands' : 
                       selectedCard.type === 'cups' ? 'Suit of Cups' : 
                       selectedCard.type === 'swords' ? 'Suit of Swords' : 
                       'Suit of Pentacles'}
                    </span>
                    <span className="text-[18px] text-[#0085CA] font-bold tracking-widest uppercase mt-0.5">
                      {selectedCard.englishName}
                    </span>
                  </h2>

                  {/* Card Image Area with Refresh Button */}
                  <div className="relative w-full flex justify-center mt-6 mb-6">
                    <div className="relative">
                      <div className="w-[170px] aspect-[60/103] flex flex-col items-center justify-center bg-white rounded-[10px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] relative overflow-hidden border-[3.5px] border-white">
                        <img
                          src={getCardImageSrc(selectedCard.englishName)}
                          alt={selectedCard.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Refresh Button */}
                      <button 
                        onClick={handleClear} 
                        className="absolute -right-6 -bottom-2 w-11 h-11 bg-white rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] flex items-center justify-center text-[#0085CA] hover:bg-neutral-50 transition-colors z-10"
                        aria-label="Back to search"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-[22px] h-[22px]">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Interpretation Area */}
                  <div className="flex flex-col items-center text-center px-4 mt-2 mb-4">
                    <h3 className="text-[18px] font-bold text-[#344E3D] mb-3 drop-shadow-sm tracking-wide">
                      {selectedCard.keyword}
                    </h3>
                    <p className="text-[14.5px] text-[#344E3D] leading-[1.7] break-keep max-w-[300px]">
                      {selectedCard.uprightMeaning.split('. ').map((sentence, i, arr) => {
                        // Avoid adding dot if it already ends with punctuation
                        const hasDot = sentence.endsWith('.') || sentence.endsWith('!') || sentence.endsWith('?');
                        return (
                          <span key={i}>
                            {sentence}{!hasDot && i !== arr.length - 1 ? '.' : ''}
                            {i !== arr.length - 1 && <br />}
                          </span>
                        );
                      })}
                    </p>
                  </div>

                  {/* Symbols Area */}
                  {selectedCard.cardSymbols && selectedCard.cardSymbols.length > 0 && (
                    <div className="w-full flex flex-col items-center mt-6 max-w-full overflow-hidden">
                      <div className="flex justify-start sm:justify-center gap-2 sm:gap-3 flex-nowrap px-1 w-full overflow-x-auto custom-scrollbar pb-2 pt-2">
                        {selectedCard.cardSymbols.map((sym, idx) => (
                          <button 
                            key={idx} 
                            onClick={() => setSelectedSymbol(sym)}
                            className="flex flex-col items-center gap-1.5 shrink-0"
                          >
                            <div className={`w-[40px] h-[40px] sm:w-[46px] sm:h-[46px] rounded-full overflow-hidden transition-all duration-300 ${selectedSymbol?.name === sym.name ? 'border-[2px] border-white scale-110 shadow-[0_4px_12px_rgba(0,0,0,0.1)] bg-white' : 'border-[1.5px] border-white/80 shadow-sm hover:scale-105 bg-white/40'}`}>
                              <div className="w-full h-full flex items-center justify-center text-[9px] sm:text-[10px] text-blue-500">
                                {sym.imageSrc ? (
                                  <img 
                                    src={getSymbolImageSrc(sym.imageSrc)} 
                                    alt={sym.name} 
                                    className="w-full h-full object-cover" 
                                    onError={(e) => { 
                                      e.currentTarget.style.display = 'none'; 
                                      if (e.currentTarget.nextElementSibling) {
                                        (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'block';
                                      }
                                    }} 
                                  />
                                ) : null}
                                <span className={sym.imageSrc ? "hidden" : "block"}>{sym.name[0]}</span>
                              </div>
                            </div>
                            <span className={`text-[11.5px] sm:text-[12.5px] transition-colors mt-0.5 font-medium ${selectedSymbol?.name === sym.name ? 'text-[#344E3D] font-bold' : 'text-[#344E3D]'}`}>
                              {sym.name}
                            </span>
                          </button>
                        ))}
                      </div>

                      {/* Symbol Meaning Box */}
                      <AnimatePresence>
                        {selectedSymbol && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="w-[calc(100%-2.5rem)] max-w-md mt-6 p-6 bg-[#F6F8F3]/90 backdrop-blur-md rounded-[20px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-white/60 text-center"
                          >
                            {(() => {
                              const [mainText, ...rest] = selectedSymbol.meaning.split('\n※ ');
                              const subText = rest.join('\n※ ');
                              return (
                                <>
                                  <p className="text-[15.5px] text-[#FF5A5A] font-bold mb-2 break-keep leading-relaxed tracking-wide drop-shadow-sm">
                                    {mainText}
                                  </p>
                                  {subText && (
                                    <p className="text-[13.5px] text-[#2A4032] leading-relaxed break-keep mt-3 font-medium">
                                      ※ {subText}
                                    </p>
                                  )}
                                </>
                              );
                            })()}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              )}{" "}
            </motion.div>
          )}{" "}
        </AnimatePresence>{" "}
      </div>{" "}
    </div>
  );
};
