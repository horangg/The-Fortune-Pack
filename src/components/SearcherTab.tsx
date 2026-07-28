import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { findCardByCode } from "../data/tarotData";
import { TarotCard } from "../types";
import { SpreadGuideTab } from "./SpreadGuideTab";
import { getCardImageSrc } from "../utils/imageUtils";
export const SearcherTab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<"search" | "spread">(
    "search",
  );
  const [code, setCode] = useState<string>("");
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);
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
        setSearchError(false);
        setSaveStatus("");
        inputRef.current?.blur();
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
    if (!selectedCard && activeSubTab === "search") {
      inputRef.current?.focus();
    }
  };
  const handleClear = () => {
    setCode("");
    setSelectedCard(null);
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
      className="flex-1 flex flex-col justify-start items-center px-4 py-4 min-h-[580px] select-none text-black bg-[#F2F2F7] w-full"
      onClick={handleContainerClick}
    >
      {" "}
      {/* Sub Navigation */}
      <div className="w-full flex justify-center mb-6 pt-4 shrink-0">
        <div className="flex bg-neutral-200/60 p-1 rounded-2xl w-full max-w-[200px]">
          <button
            onClick={() => setActiveSubTab("search")}
            className={`flex-1 py-1.5 text-[14px] rounded-xl transition-all ${
              activeSubTab === "search"
                ? "bg-white text-black font-bold"
                : "text-neutral-500"
            }`}
          >
            SEARCH
          </button>
          <button
            onClick={() => setActiveSubTab("spread")}
            className={`flex-1 py-1.5 text-[14px] rounded-xl transition-all ${
              activeSubTab === "spread"
                ? "bg-white text-black font-bold"
                : "text-neutral-500"
            }`}
          >
            SPREADS
          </button>
        </div>
      </div>
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
                <div className="w-full flex flex-col justify-between items-center flex-1 py-4 space-y-12">
                  {" "}
                  <div className="text-center space-y-1 mt-8">
                    {" "}
                    <h1 className="text-black text-[18px] tracking-widest font-light">
                      {" "}
                      FORTUNE PACK{" "}
                    </h1>{" "}
                  </div>{" "}
                  <div className="flex justify-center items-center gap-4 py-4 w-full">
                    {" "}
                    {[0, 1, 2].map((idx) => {
                      const digit = code[idx] || "";
                      return (
                        <div
                          key={idx}
                          className={`w-14 h-16 flex items-center justify-center text-black bg-white transition-colors ${digit ? " text-black" : ""}`}
                        >
                          {" "}
                          <span className="text-[18px] font-light">
                            {digit}
                          </span>{" "}
                        </div>
                      );
                    })}{" "}
                  </div>{" "}
                  <div className="w-full px-4 mt-auto mb-10 text-center">
                    {" "}
                    <p
                      className={`text-[12px] leading-relaxed whitespace-pre-line ${searchError ? "text-black" : "text-neutral-500"}`}
                    >
                      {" "}
                      {searchError
                        ? "등록되지 않은 코드입니다. 다시 입력해 주세요."
                        : "코드를 입력하세요.\n세 자리 숫자 코드입니다."}{" "}
                    </p>{" "}
                  </div>{" "}
                </div>
              ) : (
                <div className="w-full flex flex-col items-center flex-1 py-2 space-y-4 tracking-tight break-keep overflow-y-auto pb-10 custom-scrollbar">
                  {" "}
                  <h2 className="text-center text-black mt-2 flex flex-col items-center gap-1">
                    {" "}
                    <span className="text-[18px]">{selectedCard.name}</span>{" "}
                    <span className="text-[12px] text-neutral-500 font-sans tracking-widest uppercase">
                      {selectedCard.englishName}
                    </span>{" "}
                  </h2>{" "}
                  <div className="w-48 aspect-[60/103] flex flex-col items-center justify-center bg-white relative overflow-hidden">
                    {" "}
                    <img
                      src={getCardImageSrc(selectedCard.englishName)}
                      alt={selectedCard.name}
                      className="w-full h-full object-cover"
                    />{" "}
                  </div>{" "}
                  <p className="text-black text-center text-[12px] pt-1 font-medium">
                    {" "}
                    {getKeywords(selectedCard)}{" "}
                  </p>{" "}
                  <div className="space-y-4 px-2 text-center pt-2 w-full max-w-[280px]">
                    {" "}
                    <div>
                      {" "}
                      <div className="inline-block text-black text-[10px] px-2 py-0.5 mb-1.5 tracking-widest uppercase">
                        UPRIGHT
                      </div>{" "}
                      <p className="text-black leading-relaxed text-[13px] break-keep">
                        {" "}
                        {selectedCard.uprightMeaning}{" "}
                      </p>{" "}
                    </div>{" "}
                    {selectedCard.reversedMeaning && (
                      <div className="mt-4">
                        {" "}
                        <div className="inline-block text-neutral-600 text-[10px] px-2 py-0.5 mb-1.5 tracking-widest uppercase">
                          REVERSED
                        </div>{" "}
                        <p className="text-neutral-700 leading-relaxed text-[13px] break-keep">
                          {" "}
                          {selectedCard.reversedMeaning}{" "}
                        </p>{" "}
                      </div>
                    )}{" "}
                  </div>{" "}
                  <div className="flex flex-col justify-center items-center gap-4 pt-6 w-full select-none">
                    <button
                      onClick={saveToCalendar}
                      disabled={saveStatus === "SAVED"}
                      className={`w-full max-w-[220px] py-3.5 rounded-full text-[12px] font-bold tracking-widest uppercase transition-all ${
                        saveStatus === "SAVED"
                          ? "bg-neutral-300 text-white"
                          : "bg-black text-white shadow-sm"
                      }`}
                    >
                      {saveStatus === "SAVED"
                        ? "SAVED TO CALENDAR"
                        : "SAVE TO CALENDAR"}
                    </button>
                    <button
                      onClick={handleClear}
                      className="text-[12px] text-neutral-500 hover:text-black tracking-widest uppercase py-2 font-medium"
                    >
                      BACK TO SEARCH
                    </button>
                  </div>
                </div>
              )}{" "}
            </motion.div>
          )}{" "}
        </AnimatePresence>{" "}
      </div>{" "}
    </div>
  );
};
