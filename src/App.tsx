import React, { useState, useEffect } from "react";
import { RulebookTab } from "./components/RulebookTab";
import { SearcherTab } from "./components/SearcherTab";
import { CalendarTab } from "./components/CalendarTab";
import { motion, AnimatePresence } from "motion/react";
type TabType = "rulebook" | "searcher" | "calendar";
export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>(() => {
    return (localStorage.getItem("activeTab") as TabType) || "searcher";
  });
  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);
  const renderActiveTab = () => {
    switch (activeTab) {
      case "rulebook":
        return <RulebookTab />;
      case "searcher":
        return <SearcherTab />;
      case "calendar":
        return <CalendarTab />;
      default:
        return <SearcherTab />;
    }
  };
  return (
    <div className="min-h-[100dvh] w-full bg-[#f0f0f0] flex items-center justify-center p-0 sm:p-4 md:p-6 antialiased text-[13px] selection:bg-black selection:text-white font-sans">
      {" "}
      {/* Mobile viewport container matching standard screen aspect ratios */}{" "}
      <div className="w-full max-w-[420px] h-[100dvh] sm:h-[min(840px,95vh)] bg-[#F2F2F7] sm:rounded-[3rem] text-black flex flex-col relative overflow-hidden ">
        {" "}
        {/* Main interactive viewport */}
        <main className="flex-1 relative overflow-y-auto pb-28 custom-scrollbar bg-[#F2F2F7]">
          {" "}
          <AnimatePresence mode="wait">
            {" "}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex-1 flex flex-col min-h-full"
            >
              {" "}
              {renderActiveTab()}{" "}
            </motion.div>{" "}
          </AnimatePresence>{" "}
        </main>{" "}
        {/* Bottom Floating Tab Navigation */}
        <nav className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-[340px] h-[64px] bg-white/70 backdrop-blur-2xl rounded-full flex justify-around items-center px-2 shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-white/50 z-50">
          <div className="grid grid-cols-3 w-full h-full gap-1 py-1.5">
            {/* 룰북 Tab Button */}
            <button
              onClick={() => setActiveTab("rulebook")}
              className="flex flex-col items-center justify-center cursor-pointer relative w-full h-full"
            >
              <div
                className={`flex flex-col items-center justify-center w-full h-full rounded-full transition-all duration-300 ${activeTab === "rulebook" ? "bg-black/5" : ""}`}
              >
                <span
                  className={`text-[14px] tracking-wide ${activeTab === "rulebook" ? "text-black font-bold" : "text-neutral-500 font-medium"}`}
                >
                  룰북
                </span>
              </div>
            </button>
            {/* 카드 해석 Tab Button */}
            <button
              onClick={() => setActiveTab("searcher")}
              className="flex flex-col items-center justify-center cursor-pointer relative w-full h-full"
            >
              <div
                className={`flex flex-col items-center justify-center w-full h-full rounded-full transition-all duration-300 ${activeTab === "searcher" ? "bg-black/5" : ""}`}
              >
                <span
                  className={`text-[14px] tracking-wide ${activeTab === "searcher" ? "text-black font-bold" : "text-neutral-500 font-medium"}`}
                >
                  카드 해석
                </span>
              </div>
            </button>
            {/* 캘린더 Tab Button */}
            <button
              onClick={() => setActiveTab("calendar")}
              className="flex flex-col items-center justify-center cursor-pointer relative w-full h-full"
            >
              <div
                className={`flex flex-col items-center justify-center w-full h-full rounded-full transition-all duration-300 ${activeTab === "calendar" ? "bg-black/5" : ""}`}
              >
                <span
                  className={`text-[14px] tracking-wide ${activeTab === "calendar" ? "text-black font-bold" : "text-neutral-500 font-medium"}`}
                >
                  캘린더
                </span>
              </div>
            </button>
          </div>
        </nav>{" "}
      </div>{" "}
    </div>
  );
}
