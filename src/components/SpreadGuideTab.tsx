import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw } from 'lucide-react';
import { Typewriter } from './Typewriter';

interface PositionDef {
  id: number;
  name: string;
  meaning: string;
}

type SpreadId = 'topic' | 'yesno' | 'past-present-future' | 'choices' | 'yearly' | 'monthly' | 'unknown';

interface SpreadDef {
  id: SpreadId;
  name: string;
  displayName: string; // for the table card (with \n)
  layout: '1-card' | '3-card' | '4-card' | '5-card' | 'placeholder';
  positions: PositionDef[];
}

const SPREADS: SpreadDef[] = [
  {
    id: 'topic',
    name: '주제',
    displayName: '주제',
    layout: '4-card',
    positions: [
      { id: 1, name: '주제', meaning: '상담하고자 하는 주요 주제나 현재 가장 집중해야 할 핵심 문제입니다.' },
      { id: 2, name: '과거', meaning: '당신과 상대의 과거를 평가하는 카드입니다.' },
      { id: 3, name: '현재', meaning: '현재 당신이 직면한 상황과 관계의 상태입니다.' },
      { id: 4, name: '미래', meaning: '미래에 나타날 관계 변화와 최종 예측입니다.' }
    ]
  },
  {
    id: 'yesno',
    name: 'Yes / No',
    displayName: 'Yes\n/\nNo',
    layout: '1-card',
    positions: [
      { id: 1, name: '결과', meaning: '질문에 대한 명확한 긍정(Yes) 또는 부정(No)의 대답과 그 이유입니다.' }
    ]
  },
  {
    id: 'past-present-future',
    name: '과거 현재 미래',
    displayName: '과거\n현재\n미래',
    layout: '3-card',
    positions: [
      { id: 1, name: '과거', meaning: '이 문제의 원인이 되었던 흘러간 흐름과 상황의 출발점입니다.' },
      { id: 2, name: '현재', meaning: '당신이 처해 있는 지금 이 순간의 실질적인 상황과 직면한 상태입니다.' },
      { id: 3, name: '미래', meaning: '현재의 에너지가 그대로 유지될 때 마주하게 될 다가올 결과입니다.' }
    ]
  },
  {
    id: 'choices',
    name: '양자택일',
    displayName: '양자\n택일',
    layout: '5-card',
    positions: [
      { id: 1, name: '현재', meaning: '현재 당신이 직면한 상황에 대한 조언입니다.' },
      { id: 2, name: 'A', meaning: 'A안을 선택했을 때 진행 과정과 대안입니다.' },
      { id: 3, name: 'A결과', meaning: 'A안을 따라갔을 때 맞이할 결말과 조언입니다.' },
      { id: 4, name: 'B', meaning: 'B안을 선택했을 때 진행 과정과 대안입니다.' },
      { id: 5, name: 'B결과', meaning: 'B안을 따라갔을 때 맞이할 결말과 조언입니다.' }
    ]
  },
  {
    id: 'yearly',
    name: '1년 운세',
    displayName: '1년\n운세',
    layout: 'placeholder',
    positions: [{ id: 1, name: '1년 흐름', meaning: '올 한 해 동안 펼쳐질 전반적인 운의 흐름과 주요 테마입니다.' }]
  },
  {
    id: 'monthly',
    name: '1달 운세',
    displayName: '1달\n운세',
    layout: 'placeholder',
    positions: [{ id: 1, name: '이달의 흐름', meaning: '이번 달 당신에게 다가올 주요 사건과 에너지의 흐름입니다.' }]
  },
  {
    id: 'unknown',
    name: '?',
    displayName: '?',
    layout: 'placeholder',
    positions: [{ id: 1, name: '알 수 없음', meaning: '아직 개방되지 않은 미지의 스프레드입니다.' }]
  }
];

export const SpreadGuideTab: React.FC = () => {
  const [selectedSpread, setSelectedSpread] = useState<SpreadDef | null>(null);
  const [activePositionId, setActivePositionId] = useState<number>(1);

  const handleSelectSpread = (spread: SpreadDef) => {
    setSelectedSpread(spread);
    setActivePositionId(1);
  };

  const handleBack = () => {
    setSelectedSpread(null);
  };

  const handleSlotClick = (pos: PositionDef) => {
    setActivePositionId(pos.id);
  };

  const renderTableSelection = () => (
    <motion.div
      key="table-selection"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex-1 flex flex-col justify-center items-center w-full min-h-[500px]"
    >
      <div className="text-white text-[14px] mb-6 tracking-wide min-h-[21px]">
        <Typewriter text="어떤 것을 점쳐보시겠습니까?" speed={40} />
      </div>
      {/* TV / Table Outline mimicking Image 1 */}
      <div className="relative w-full max-w-[408px] mx-auto flex items-center justify-center py-4">
        {/* The Table Image */}
        <img src={`${import.meta.env.BASE_URL}Table.png`} alt="Table" className="w-full h-auto object-contain pointer-events-none" />
        
        {/* Overlay Cards Container */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 pb-8">
          {/* Top Row: 4 cards */}
          <div className="flex justify-center gap-2 mb-3 w-full">
            {SPREADS.slice(0, 4).map((spread) => (
              <button
                key={spread.id}
                onClick={() => handleSelectSpread(spread)}
                className="w-[60px] aspect-[60/96] border border-white flex items-center justify-center hover:bg-white/20 transition-colors bg-black"
              >
                <span className="text-white text-[11px] whitespace-pre-line text-center leading-[1.1]">
                  {spread.displayName}
                </span>
              </button>
            ))}
          </div>
          {/* Bottom Row: 3 cards centered */}
          <div className="flex justify-center gap-2 w-full">
            {SPREADS.slice(4, 7).map((spread) => (
              <button
                key={spread.id}
                onClick={() => handleSelectSpread(spread)}
                className="w-[60px] aspect-[60/96] border border-white flex items-center justify-center hover:bg-white/20 transition-colors bg-black"
              >
                <span className="text-white text-[11px] whitespace-pre-line text-center leading-[1.1]">
                  {spread.displayName}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderDetailLayout = (spread: SpreadDef) => {
    // Shared card style
    const getCardStyle = (posId: number) => {
      const isSelected = activePositionId === posId;
      return `w-[63px] aspect-[60/96] border-[1px] cursor-pointer transition-all flex flex-col items-center justify-center p-2 relative select-none ${
        isSelected ? 'border-white bg-[#111]' : 'border-white/50 bg-black'
      }`;
    };

    if (spread.layout === '1-card') {
      const pos = spread.positions[0];
      return (
        <div className="flex justify-center mt-16">
          <div onClick={() => handleSlotClick(pos)} className={getCardStyle(pos.id)}>
            <span className="text-white text-[12px]">{pos.name}</span>
          </div>
        </div>
      );
    }

    if (spread.layout === '3-card') {
      return (
        <div className="flex justify-center gap-3 mt-16">
          {spread.positions.map((pos) => (
            <div key={pos.id} onClick={() => handleSlotClick(pos)} className={getCardStyle(pos.id)}>
              <span className="text-white text-[12px]">{pos.name}</span>
            </div>
          ))}
        </div>
      );
    }

    if (spread.layout === '4-card') {
      // 1 on top, 3 below
      return (
        <div className="flex flex-col items-center gap-4 mt-8">
          <div onClick={() => handleSlotClick(spread.positions[0])} className={getCardStyle(1)}>
            <span className="text-white text-[12px]">{spread.positions[0].name}</span>
          </div>
          <div className="flex justify-center gap-3">
            {spread.positions.slice(1, 4).map((pos) => (
              <div key={pos.id} onClick={() => handleSlotClick(pos)} className={getCardStyle(pos.id)}>
                <span className="text-white text-[12px]">{pos.name}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (spread.layout === '5-card') {
      // Cross or Choices layout. We use a relative absolute positioning
      return (
        <div className="relative w-full h-[280px] mt-4 flex items-center justify-center">
           {/* Center */}
           <div style={{ position: 'absolute', left: '50%', top: '20%', transform: 'translate(-50%, -50%)' }}>
             <div onClick={() => handleSlotClick(spread.positions[0])} className={getCardStyle(1)}>
                <span className="text-white text-[11px]">{spread.positions[0].name}</span>
             </div>
           </div>
           {/* Left Mid */}
           <div style={{ position: 'absolute', left: '25%', top: '50%', transform: 'translate(-50%, -50%)' }}>
             <div onClick={() => handleSlotClick(spread.positions[1])} className={getCardStyle(2)}>
                <span className="text-white text-[11px]">{spread.positions[1].name}</span>
             </div>
           </div>
           {/* Left Bottom */}
           <div style={{ position: 'absolute', left: '15%', top: '80%', transform: 'translate(-50%, -50%)' }}>
             <div onClick={() => handleSlotClick(spread.positions[2])} className={getCardStyle(3)}>
                <span className="text-white text-[11px]">{spread.positions[2].name}</span>
             </div>
           </div>
           {/* Right Mid */}
           <div style={{ position: 'absolute', left: '75%', top: '50%', transform: 'translate(-50%, -50%)' }}>
             <div onClick={() => handleSlotClick(spread.positions[3])} className={getCardStyle(4)}>
                <span className="text-white text-[11px]">{spread.positions[3].name}</span>
             </div>
           </div>
           {/* Right Bottom */}
           <div style={{ position: 'absolute', left: '85%', top: '80%', transform: 'translate(-50%, -50%)' }}>
             <div onClick={() => handleSlotClick(spread.positions[4])} className={getCardStyle(5)}>
                <span className="text-white text-[11px]">{spread.positions[4].name}</span>
             </div>
           </div>
        </div>
      );
    }

    // placeholder
    const pos = spread.positions[0];
    return (
      <div className="flex justify-center mt-16">
        <div onClick={() => handleSlotClick(pos)} className={getCardStyle(1)}>
          <span className="text-white text-[12px] text-center">{pos.name}</span>
        </div>
      </div>
    );
  };

  const renderDetailView = (spread: SpreadDef) => {
    const activePosition = spread.positions.find(p => p.id === activePositionId) || spread.positions[0];

    return (
      <motion.div
        key="detail-view"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
        className="flex-1 flex flex-col justify-between w-full h-full"
      >
        {/* Header with back button */}
        <div className="flex items-center gap-3 py-4 select-none">
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
          >
            <img src={`${import.meta.env.BASE_URL}icon/back.png`} alt="Back" className="w-5 h-5 object-contain" />
            <span className="text-[14px]">돌아가기</span>
          </button>
          <span className="text-white font-bold text-[14px]">{spread.name}</span>
        </div>

        {/* Dynamic Spread Arena */}
        <div className="flex-1 w-full max-w-sm mx-auto min-h-[300px]">
          {renderDetailLayout(spread)}
        </div>

        {/* Bottom Dialogue Box */}
        <div className="w-full px-2 mt-auto pb-4">
          <div className="border border-white p-1 bg-black">
            <div className="border border-white py-6 px-5 text-center min-h-[145px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${spread.id}-${activePosition.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.12 }}
                  className="space-y-3 flex-1 flex flex-col justify-center"
                >
                  <div className="space-y-3">
                    <h3 className="text-white uppercase font-bold text-[13px]">
                      {activePosition.name}
                    </h3>
                    <p className="text-white/90 leading-relaxed max-w-xs mx-auto text-[12px]">
                      {activePosition.meaning}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <span className="text-white block pulsing-arrow mt-4">
                ▽
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="flex-1 flex flex-col items-center px-6 py-4 min-h-[580px] text-white bg-black w-full overflow-y-auto custom-scrollbar">
      <AnimatePresence mode="wait">
        {!selectedSpread ? renderTableSelection() : renderDetailView(selectedSpread)}
      </AnimatePresence>
    </div>
  );
};
