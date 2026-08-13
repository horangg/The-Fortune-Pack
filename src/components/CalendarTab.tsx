import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TarotCard } from "../types";
import { getCardImageSrc } from "../utils/imageUtils";

const SunIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
);

const MoonIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
);

const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>
);

interface CalendarData {
  [dateString: string]: TarotCard;
}

const getCardIconSrc = (card: TarotCard) => {
  return `${import.meta.env.BASE_URL}icon/${card.englishName}.png`;
};

const toDateStr = (d: Date) => {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

export const CalendarTab: React.FC = () => {
  const [viewMode, setViewMode] = useState<"daily" | "monthly" | "yearly">("daily");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarData, setCalendarData] = useState<CalendarData>({});

  useEffect(() => {
    const data = localStorage.getItem("tarotCalendarData");
    if (data) {
      setCalendarData(JSON.parse(data));
    }
  }, []);

  const handleSelectDate = (d: Date) => {
    setCurrentDate(d);
  };

  const renderToggle = () => (
    <div className="flex bg-[#C3DECD]/40 backdrop-blur-md rounded-2xl p-1.5 gap-1 mb-6 shadow-[inset_0_2px_6px_rgba(255,255,255,0.6)] border border-white/40">
      <button 
        onClick={() => setViewMode("daily")} 
        className={`p-2 rounded-[12px] transition-all duration-300 ${viewMode === "daily" ? "bg-[#0085CA] text-white shadow-md" : "text-[#0085CA] hover:bg-white/40"}`}
      >
        <SunIcon className="w-[22px] h-[22px]" />
      </button>
      <button 
        onClick={() => setViewMode("monthly")} 
        className={`p-2 rounded-[12px] transition-all duration-300 ${viewMode === "monthly" ? "bg-[#0085CA] text-white shadow-md" : "text-[#0085CA] hover:bg-white/40"}`}
      >
        <MoonIcon className="w-[22px] h-[22px]" />
      </button>
      <button 
        onClick={() => setViewMode("yearly")} 
        className={`p-2 rounded-[12px] transition-all duration-300 ${viewMode === "yearly" ? "bg-[#0085CA] text-white shadow-md" : "text-[#0085CA] hover:bg-white/40"}`}
      >
        <StarIcon className="w-[22px] h-[22px]" />
      </button>
    </div>
  );

  const renderDailyView = () => {
    const dates = [-2, -1, 0, 1, 2].map(offset => {
      const d = new Date(currentDate);
      d.setDate(d.getDate() + offset);
      return d;
    });

    const formatDateString = (d: Date) => {
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      return `${days[d.getDay()]}, ${String(d.getMonth() + 1).padStart(2, '0')}. ${String(d.getDate()).padStart(2, '0')}. ${d.getFullYear()}`;
    };

    const dStr = toDateStr(currentDate);
    const selectedCard = calendarData[dStr];

    return (
      <motion.div
        key="daily"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="flex flex-col items-center w-full mt-2"
      >
        <div className="text-[#0085CA] font-serif text-[14.5px] font-bold tracking-wide mb-6 text-center drop-shadow-sm">
          {formatDateString(currentDate)}
        </div>

        <div className="flex items-center justify-center gap-3 sm:gap-5 mb-10 w-full max-w-[320px]">
          {dates.map((d, i) => {
            const dateStr = toDateStr(d);
            const isSelected = i === 2;
            const card = calendarData[dateStr];

            return (
              <div 
                key={i} 
                onClick={() => handleSelectDate(d)} 
                className={`w-[46px] h-[46px] sm:w-[52px] sm:h-[52px] flex items-center justify-center rounded-[14px] cursor-pointer transition-all duration-300 ${isSelected ? "bg-[#7CC6AE] shadow-sm border border-white/50" : "hover:bg-black/5"}`}
              >
                {card ? (
                  <img src={getCardIconSrc(card)} alt="icon" className="w-[28px] h-[28px] sm:w-[32px] sm:h-[32px] object-contain opacity-90 drop-shadow-sm" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<div class="w-2 h-2 bg-[#0085CA] rounded-full opacity-60"></div>'; }} />
                ) : (
                  <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-white" : "bg-neutral-300/70"}`} />
                )}
              </div>
            );
          })}
        </div>

        {selectedCard ? (
          <div className="flex flex-col items-center pb-10">
            <h2 className="text-[#0085CA] font-serif text-[20px] font-bold mb-5 tracking-wide drop-shadow-sm">{selectedCard.englishName}</h2>
            <div className="w-[180px] sm:w-[190px] aspect-[60/103] bg-white rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.12)] p-1 border-[3.5px] border-white overflow-hidden mb-8 relative">
              <img src={getCardImageSrc(selectedCard.englishName)} alt={selectedCard.name} className="w-full h-full object-cover rounded-lg" />
            </div>
            
            <div className="w-full max-w-[300px] text-center space-y-2.5">
              <p className="text-neutral-700 text-[13.5px] leading-[1.7] break-keep font-medium">
                {selectedCard.uprightMeaning.split(',')[0]}
              </p>
              {selectedCard.uprightMeaning.split(',').length > 1 && (
                <p className="text-neutral-600 text-[13px] leading-[1.6] break-keep">
                  {selectedCard.uprightMeaning.substring(selectedCard.uprightMeaning.indexOf(',') + 1).trim()}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-12 h-12 mb-4 rounded-full bg-black/5 flex items-center justify-center text-black/20">
              <MoonIcon className="w-6 h-6" />
            </div>
            <span className="text-neutral-500 text-[13.5px] font-medium tracking-wide">저장된 카드가 없습니다.</span>
          </div>
        )}
      </motion.div>
    );
  };

  const renderMonthlyView = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    return (
      <motion.div
        key="monthly"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        className="flex flex-col items-center w-full mt-2"
      >
        <div className="w-full flex justify-between items-end mb-10 max-w-[320px] px-2">
          <div className="flex flex-col leading-none">
            <span className="text-[#0085CA] text-[15px] font-mono tracking-widest mb-1.5 drop-shadow-sm">{year}</span>
            <span className="text-[#0085CA] text-[36px] font-mono font-bold tracking-widest leading-none" style={{ textShadow: "1px 1px 0px rgba(0,133,202,0.2)" }}>{monthNames[month]}</span>
          </div>
          <div className="flex gap-4 pb-1">
            <button onClick={prevMonth} className="text-[#0085CA] hover:text-[#005a8c] transition-colors"><svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg></button>
            <button onClick={nextMonth} className="text-[#0085CA] hover:text-[#005a8c] transition-colors"><svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg></button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 w-full max-w-[320px] text-center gap-y-6">
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d, i) => (
            <div key={d} className={`text-[10px] font-bold tracking-widest ${i === 0 ? "text-[#FF5A5A]" : i === 6 ? "text-[#0085CA]" : "text-[#2A4032]"}`}>{d}</div>
          ))}
          
          {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
          
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const card = calendarData[dStr];
            const isToday = dStr === toDateStr(new Date());
            
            return (
              <div key={day} onClick={() => { handleSelectDate(new Date(year, month, day)); setViewMode('daily'); }} className="flex items-center justify-center h-10 cursor-pointer relative group">
                {card ? (
                  <div className="relative">
                    <img src={getCardIconSrc(card)} alt="icon" className="w-[30px] h-[30px] object-contain opacity-90 drop-shadow-md group-hover:scale-110 transition-transform" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<div class="w-3 h-3 bg-[#0085CA] rounded-full drop-shadow-sm"></div>'; }} />
                  </div>
                ) : (
                  <span className={`text-[15.5px] font-serif transition-colors ${isToday ? "bg-[#0085CA] text-white w-7 h-7 rounded-full flex items-center justify-center shadow-sm" : (new Date(year, month, day).getDay() === 0 ? "text-[#FF5A5A]/60 hover:text-[#FF5A5A]" : new Date(year, month, day).getDay() === 6 ? "text-[#0085CA]/60 hover:text-[#0085CA]" : "text-neutral-500 hover:text-black")}`}>{day}</span>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>
    );
  };

  const renderYearlyView = () => {
    const year = currentDate.getFullYear();
    const daysInYear = new Date(year, 1, 29).getMonth() === 1 ? 366 : 365;
    const startDayOfWeek = new Date(year, 0, 1).getDay(); // 0-6
    
    const days = [];
    for(let i=0; i<startDayOfWeek; i++) days.push(null);
    for(let i=1; i<=daysInYear; i++) {
      days.push(new Date(year, 0, i));
    }
    
    return (
      <motion.div
        key="yearly"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="flex flex-col items-center w-full mt-2"
      >
        <div className="w-full flex justify-center items-center mb-8">
          <span className="text-[#0085CA] text-[32px] font-mono font-bold tracking-widest drop-shadow-sm">{year}</span>
        </div>
        
        <div className="w-full flex justify-center overflow-visible px-4">
          <div className="inline-grid grid-rows-7 grid-flow-col gap-[5px] sm:gap-1.5 pb-8 overflow-x-auto custom-scrollbar pr-4">
            {days.map((d, i) => {
              if (!d) return <div key={`empty-${i}`} className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]" />;
              const dStr = toDateStr(d);
              const card = calendarData[dStr];
              
              return (
                <div 
                  key={i} 
                  onClick={() => { handleSelectDate(d); setViewMode('daily'); }}
                  className={`w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] rounded-[6px] flex items-center justify-center cursor-pointer transition-all duration-300 ${card ? "bg-transparent hover:scale-110" : "bg-white/40 hover:bg-white/70"}`}
                >
                  {card ? (
                    <img 
                      src={getCardIconSrc(card)} 
                      alt="icon" 
                      className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] object-contain opacity-100 drop-shadow-sm" 
                      style={{ filter: "invert(34%) sepia(83%) saturate(3501%) hue-rotate(178deg) brightness(87%) contrast(102%)" }} 
                      onError={(e) => { 
                        e.currentTarget.style.display = 'none'; 
                        e.currentTarget.parentElement!.classList.add('bg-[#0085CA]', 'shadow-sm'); 
                        e.currentTarget.parentElement!.classList.remove('bg-transparent'); 
                      }} 
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="flex-1 flex flex-col items-center px-4 sm:px-6 py-6 select-none text-black bg-gradient-to-b from-[#E2F0F7] via-[#D3EBCB] to-[#E2F0F7] w-full h-full overflow-hidden">
      {renderToggle()}
      <div className="w-full flex-1 flex flex-col relative overflow-y-auto overflow-x-hidden custom-scrollbar pt-2">
        <AnimatePresence mode="wait">
          {viewMode === "daily" && renderDailyView()}
          {viewMode === "monthly" && renderMonthlyView()}
          {viewMode === "yearly" && renderYearlyView()}
        </AnimatePresence>
      </div>
    </div>
  );
};
