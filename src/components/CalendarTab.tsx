import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TarotCard } from "../types";
import { getCardImageSrc } from "../utils/imageUtils";

const DayItem = React.memo(
  ({
    wYear,
    wMonth,
    wDate,
    isSelected,
    hasCard,
    daysStrIndex,
    onClick,
  }: any) => {
    const daysStr = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    return (
      <div
        className="flex flex-col items-center cursor-pointer group px-1 min-w-[calc(100%/7)] shrink-0 snap-center"
        onClick={() => onClick(wYear, wMonth, wDate)}
      >
        <span
          className={`text-[10px] tracking-wider mb-1 transition-colors ${isSelected ? "text-[#0085CA] font-bold px-1 rounded-[10px] font-bold" : "text-neutral-500 font-medium group-hover:text-neutral-600"}`}
        >
          {daysStr[daysStrIndex]}
        </span>
        <div
          className={`w-[32px] h-[32px] rounded-full flex items-center justify-center transition-all ${
            isSelected
              ? "text-[#0085CA] font-bold px-1 rounded-[10px] font-bold"
              : "text-neutral-600 hover:bg-neutral-100"
          }`}
        >
          <span
            className={`text-[14px] ${isSelected ? "font-bold" : "font-medium"}`}
          >
            {wDate}
          </span>
        </div>
        <div className="h-1 mt-0.5">
          {hasCard && (
            <div
              className={`w-1 h-1 rounded-full ${
                isSelected ? "bg-[#0085CA]" : "bg-black"
              }`}
            />
          )}
        </div>
      </div>
    );
  },
);

interface CalendarData {
  [dateString: string]: TarotCard;
}

export const CalendarTab: React.FC = () => {
  const [viewMode, setViewMode] = useState<"weekly" | "monthly">("weekly");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarData, setCalendarData] = useState<CalendarData>({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [baseDate, setBaseDate] = useState(() => new Date()); // Stable base for weekly strip

  useEffect(() => {
    const data = localStorage.getItem("tarotCalendarData");
    if (data) {
      setCalendarData(JSON.parse(data));
    }
    // Set today as default selected
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    setSelectedDate(todayStr);
    setCurrentDate(today);
  }, []);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const selectedData = selectedDate ? calendarData[selectedDate] : null;

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const isAutoScrolling = React.useRef(false);
  const scrollTimeout = React.useRef<NodeJS.Timeout | null>(null);

  const weekDays = React.useMemo(() => {
    const date = new Date(baseDate);
    const dayOfWeek = date.getDay(); // 0 (Sun) to 6 (Sat)
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - dayOfWeek - 12 * 7); // 26 weeks ago

    const week = [];
    for (let i = 0; i < 175; i++) {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      week.push(d);
    }
    return week;
  }, [baseDate]);

  const handleDateClick = React.useCallback(
    (yearNum: number, monthNum: number, day: number) => {
      const dateStr = `${yearNum}-${String(monthNum + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

      if (viewMode === "weekly" && scrollRef.current) {
        const container = scrollRef.current;
        const itemWidth = container.clientWidth / 7;
        const selectedIndex = weekDays.findIndex(
          (d) =>
            `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}` ===
            dateStr,
        );

        if (selectedIndex !== -1) {
          const targetLeft = selectedIndex * itemWidth;
          if (Math.abs(container.scrollLeft - targetLeft) > 1) {
            isAutoScrolling.current = true;
            container.style.scrollSnapType = "none";
            void container.offsetHeight;
            container.scrollTo({
              left: targetLeft,
              behavior: "smooth",
            });

            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
            scrollTimeout.current = setTimeout(() => {
              isAutoScrolling.current = false;
              if (scrollRef.current) {
                scrollRef.current.style.scrollSnapType = "x mandatory";
                scrollRef.current.scrollTo({
                  left: targetLeft,
                  behavior: "auto",
                });
              }
            }, 600);
          }
        }
      }

      setSelectedDate(dateStr);
      setCurrentDate(new Date(yearNum, monthNum, day));
    },
    [viewMode, weekDays],
  );

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (isAutoScrolling.current) return;
    const container = e.currentTarget;
    const itemWidth = container.clientWidth / 7;
    let index = Math.round(container.scrollLeft / itemWidth);
    if (index < 0) index = 0;
    if (index >= weekDays.length) index = weekDays.length - 1;

    const d = weekDays[index];
    if (d) {
      const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      if (selectedDate !== dateStr) {
        setSelectedDate(dateStr);
        setCurrentDate(d);
      }
    }
  };

  // Scroll to the selected date on mount or mode change
  useEffect(() => {
    if (viewMode === "weekly" && scrollRef.current) {
      setBaseDate(currentDate);

      // Give the DOM a tiny moment to render the new weekDays
      requestAnimationFrame(() => {
        if (scrollRef.current) {
          const container = scrollRef.current;
          const itemWidth = container.clientWidth / 7;

          const date = new Date(currentDate);
          const dayOfWeek = date.getDay();
          const startOfWeek = new Date(date);
          startOfWeek.setDate(date.getDate() - dayOfWeek - 12 * 7);

          const diffTime = currentDate.getTime() - startOfWeek.getTime();
          const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

          if (diffDays >= 0 && diffDays < 175) {
            // Instantly snap to the correct position
            container.style.scrollSnapType = "none";
            container.scrollLeft = diffDays * itemWidth;

            // Re-enable snapping physics
            setTimeout(() => {
              container.style.scrollSnapType = "x mandatory";
            }, 50);
          }
        }
      });
    }
  }, [viewMode]);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const selectedMonthName = monthNames[currentDate.getMonth()];
  const selectedDayNum = currentDate.getDate();

  const renderHeader = () => {
    const isWeekly = viewMode === "weekly";
    const headerYear = isWeekly ? currentDate.getFullYear() : year;
    const headerMonth = isWeekly ? currentDate.getMonth() + 1 : month + 1;

    return (
      <div className="w-full max-w-sm w-full max-w-sm bg-transparent rounded-[24px] px-6 py-2 mb-4 flex flex-col shrink-0">
        <div className="flex justify-between items-start mb-1">
          <span className="text-[13px] font-bold text-[#0085CA] tracking-wider uppercase">
            {headerYear}
          </span>
          <div className="flex gap-4 text-[14px] font-bold">
            <button
              onClick={() => setViewMode("weekly")}
              className={`${isWeekly ? "text-[#0085CA] font-bold px-3 py-1 rounded-full" : "text-neutral-400 hover:text-black active:neu-pressed-sm px-3 py-1 px-3 py-1"} transition-colors`}
            >
              위클리
            </button>
            <button
              onClick={() => setViewMode("monthly")}
              className={`${!isWeekly ? "text-[#0085CA] font-bold px-3 py-1 rounded-full" : "text-neutral-400 hover:text-black active:neu-pressed-sm"} transition-colors`}
            >
              먼슬리
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold tracking-tight text-[#0085CA]">
            {headerMonth}월
          </span>
          <div className="flex items-center gap-1.5">
            {isWeekly ? (
              selectedDate !==
                `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}` && (
                <button
                  onClick={() => {
                    const today = new Date();
                    handleDateClick(
                      today.getFullYear(),
                      today.getMonth(),
                      today.getDate(),
                    );
                  }}
                  className="px-3 py-1 bg-white text-black shadow-sm rounded-full font-bold hover:bg-neutral-50 transition-colors rounded-full text-[12px] font-bold hover:bg-neutral-50 transition-colors"
                >
                  오늘
                </button>
              )
            ) : (
              <>
                <button
                  onClick={prevMonth}
                  className="w-7 h-7 flex items-center justify-center bg-white text-black shadow-sm rounded-full font-bold hover:bg-neutral-50 transition-colors rounded-full font-bold hover:bg-neutral-50 transition-colors"
                >
                  &lt;
                </button>
                <button
                  onClick={nextMonth}
                  className="w-7 h-7 flex items-center justify-center bg-white text-black shadow-sm rounded-full font-bold hover:bg-neutral-50 transition-colors rounded-full font-bold hover:bg-neutral-50 transition-colors"
                >
                  &gt;
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderWeeklyView = () => (
    <motion.div
      key="weekly"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.15 }}
      className="w-full flex flex-col items-center flex-1"
    >
      {/* Huge Header like Reference Image */}
      <div className="relative flex items-center justify-center mb-1 w-full px-4 h-10 shrink-0">
        {selectedDate !==
          `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}` && (
          <button
            onClick={() => {
              const today = new Date();
              handleDateClick(
                today.getFullYear(),
                today.getMonth(),
                today.getDate(),
              );
            }}
            className="absolute right-4 px-3 py-1.5 bg-neutral-100 text-neutral-600 rounded-full text-[13px] font-bold hover:bg-neutral-200 transition-colors shadow-sm"
          >
            오늘
          </button>
        )}
        <div className="flex items-baseline gap-3">
          <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-black">
            {selectedMonthName}
          </h1>
          <span className="text-3xl sm:text-4xl font-light text-black">
            {selectedDayNum}
          </span>
        </div>
      </div>

      {/* Fixed Center Indicator (Outside) */}
      <div className="flex justify-center w-full z-10">
        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#0085CA]" />
      </div>

      {/* Horizontal Strip */}
      <div className="w-full max-w-sm mb-4 py-3 relative flex flex-col items-center shrink-0 bg-transparent">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex items-center w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide px-0"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {/* Left Spacer */}
          <div
            className="shrink-0"
            style={{ width: "calc(50% - (100% / 14))" }}
          />

          {weekDays.map((d, i) => {
            const wYear = d.getFullYear();
            const wMonth = d.getMonth();
            const wDate = d.getDate();
            const wDateStr = `${wYear}-${String(wMonth + 1).padStart(2, "0")}-${String(wDate).padStart(2, "0")}`;
            const isSelected = selectedDate === wDateStr;
            const hasCard = !!calendarData[wDateStr];

            return (
              <DayItem
                key={wDateStr}
                wYear={wYear}
                wMonth={wMonth}
                wDate={wDate}
                isSelected={isSelected}
                hasCard={hasCard}
                daysStrIndex={d.getDay()}
                onClick={handleDateClick}
              />
            );
          })}

          {/* Right Spacer */}
          <div
            className="shrink-0"
            style={{ width: "calc(50% - (100% / 14))" }}
          />
        </div>
      </div>

      {/* Card Info Section for Weekly */}
      <div className="w-full flex-1 flex flex-col items-center justify-center min-h-0 mt-2">
        {selectedData ? (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center w-full py-6 flex-1 min-h-0 bg-transparent"
          >
            <div className="flex-1 min-h-[120px] max-h-[280px] w-auto aspect-[60/103] relative overflow-hidden bg-white mb-4 rounded-xl shadow-md shrink-1 border border-black/5">
              <img
                src={getCardImageSrc(selectedData.englishName)}
                alt={selectedData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-black text-[18px] font-bold mb-1">
              {selectedData.name}
            </span>
            <span className="text-[12px] text-neutral-500 font-sans tracking-widest uppercase mb-3">
              {selectedData.englishName}
            </span>
            <p className="text-[12px] text-neutral-600 text-center leading-relaxed px-4">
              {selectedData.keyword
                ? selectedData.keyword
                : `#${selectedData.name.replace(/\s+/g, "")}`}
            </p>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 bg-white rounded-3xl w-full max-w-sm">
            <span className="text-[13px] text-neutral-400">
              저장된 카드가 없습니다.
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );

  const renderMonthlyView = () => (
    <motion.div
      key="monthly"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.15 }}
      className="w-full flex flex-col items-center"
    >
      <div className="w-full max-w-sm shrink-0">
        <div className="grid grid-cols-7 mb-2 text-center shrink-0">
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
            <div
              key={d}
              className="text-[10px] text-neutral-500 tracking-wider font-medium"
            >
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-2 text-center w-full px-3 py-4 bg-transparent">
          {days.map((day, index) => {
            if (day === null) return <div key={`empty-${index}`} />;

            const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const isSelected = selectedDate === dateStr;
            const hasCard = !!calendarData[dateStr];

            return (
              <div
                key={index}
                className="flex justify-start items-center flex-col min-h-[45px] sm:min-h-[50px] cursor-pointer group"
                onClick={() => handleDateClick(year, month, day)}
              >
                <span
                  className={`text-[13px] w-6 h-6 sm:w-7 sm:h-7 flex shrink-0 items-center justify-center rounded-full transition-colors ${
                    isSelected
                      ? "text-[#0085CA] font-bold px-1 rounded-[10px] font-bold"
                      : "text-neutral-600 group-hover:text-black group-hover:bg-neutral-100"
                  }`}
                >
                  {day}
                </span>

                {hasCard ? (
                  <div
                    className={`mt-0.5 relative w-[20px] h-[30px] sm:w-[24px] sm:h-[36px] rounded overflow-hidden transition-all`}
                  >
                    <img
                      src={getCardImageSrc(calendarData[dateStr].englishName)}
                      alt="card"
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100"
                    />
                  </div>
                ) : (
                  <div className="mt-0.5 w-[20px] h-[30px] sm:w-[24px] sm:h-[36px]"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Card Info Section for Monthly */}
      <div className="w-full flex-1 flex flex-col items-center justify-center min-h-0 mt-4">
        {selectedData ? (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center w-full py-4 flex-1 min-h-0 bg-transparent"
          >
            <div className="flex-1 min-h-[60px] max-h-[160px] w-auto aspect-[60/103] relative overflow-hidden bg-white mb-3 rounded-2xl shadow-sm shrink-1">
              <img
                src={getCardImageSrc(selectedData.englishName)}
                alt={selectedData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-black text-[18px] font-bold mb-1">
              {selectedData.name}
            </span>
            <span className="text-[12px] text-neutral-500 font-sans tracking-widest uppercase mb-3">
              {selectedData.englishName}
            </span>
            <p className="text-[12px] text-neutral-600 text-center leading-relaxed px-4">
              {selectedData.keyword
                ? selectedData.keyword
                : `#${selectedData.name.replace(/\s+/g, "")}`}
            </p>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 bg-white rounded-3xl w-full max-w-sm shadow-sm mt-4">
            <span className="text-[13px] text-neutral-400">
              선택한 날짜에 저장된 카드가 없습니다.
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="flex-1 flex flex-col items-center px-4 sm:px-6 py-4 select-none text-black bg-transparent w-full h-full overflow-hidden">
      {renderHeader()}
      <div className="w-full flex-1 flex flex-col relative overflow-y-auto custom-scrollbar pt-2 pb-10">
        <AnimatePresence mode="wait">
          {viewMode === "weekly" ? renderWeeklyView() : renderMonthlyView()}
        </AnimatePresence>
      </div>
    </div>
  );
};
