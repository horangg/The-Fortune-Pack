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
    id: 'my-question',
    name: '내 질문',
    displayName: '내\n질문',
    layout: '4-card',
    positions: [
      { id: 1, name: '주제', meaning: '상담하고자 하는 주요 주제나 현재 가장 집중해야 할 핵심 문제입니다.' },
      { id: 2, name: '과거', meaning: '당신과 상대의 과거를 평가하는 카드입니다.' },
      { id: 3, name: '현재', meaning: '현재 당신이 직면한 상황과 관계의 상태입니다.' },
      { id: 4, name: '미래', meaning: '미래에 나타날 관계 변화와 최종 예측입니다.' }
    ]
  },
  {
    id: 'love',
    name: '연애운',
    displayName: '연애운',
    layout: 'love-cross',
    positions: [
      { id: 1, name: '나와\n상대의\n과거', meaning: '뽑힌 카드들이 긍정(Yes), 부정(No), 중립(Neutral) 카드인지 분류한다.\n3장이 모두 Yes면 확실한 긍정, 2장이 Yes면 긍정적이나 시간이 걸릴 수 있음을 뜻하며, No가 많거나 중립이 섞여 있다면 부정적인 결론에 가깝다.\n*역방향 카드를 사용하는 경우 역방향은 무조건 No로 해석한다.' },
      { id: 2, name: '나의 성격', meaning: '뽑힌 카드들이 긍정(Yes), 부정(No), 중립(Neutral) 카드인지 분류한다.\n3장이 모두 Yes면 확실한 긍정, 2장이 Yes면 긍정적이나 시간이 걸릴 수 있음을 뜻하며, No가 많거나 중립이 섞여 있다면 부정적인 결론에 가깝다.\n*역방향 카드를 사용하는 경우 역방향은 무조건 No로 해석한다.' },
      { id: 3, name: '나와\n상대의\n미래', meaning: '뽑힌 카드들이 긍정(Yes), 부정(No), 중립(Neutral) 카드인지 분류한다.\n3장이 모두 Yes면 확실한 긍정, 2장이 Yes면 긍정적이나 시간이 걸릴 수 있음을 뜻하며, No가 많거나 중립이 섞여 있다면 부정적인 결론에 가깝다.\n*역방향 카드를 사용하는 경우 역방향은 무조건 No로 해석한다.' },
      { id: 4, name: '상대의\n성격', meaning: '뽑힌 카드들이 긍정(Yes), 부정(No), 중립(Neutral) 카드인지 분류한다.\n3장이 모두 Yes면 확실한 긍정, 2장이 Yes면 긍정적이나 시간이 걸릴 수 있음을 뜻하며, No가 많거나 중립이 섞여 있다면 부정적인 결론에 가깝다.\n*역방향 카드를 사용하는 경우 역방향은 무조건 No로 해석한다.' },
      { id: 5, name: '나와\n상대의\n현재', meaning: '뽑힌 카드들이 긍정(Yes), 부정(No), 중립(Neutral) 카드인지 분류한다.\n3장이 모두 Yes면 확실한 긍정, 2장이 Yes면 긍정적이나 시간이 걸릴 수 있음을 뜻하며, No가 많거나 중립이 섞여 있다면 부정적인 결론에 가깝다.\n*역방향 카드를 사용하는 경우 역방향은 무조건 No로 해석한다.' }
    ]
  },
  {
    id: 'yearly',
    name: '1년 운세',
    displayName: '1년\n운세',
    layout: 'yearly-layout',
    positions: [
      { id: 1, name: 'Significator\n한 해 전반', meaning: '1. 시그니피케이터(Significator) 카드 배치\n- 전체 카드를 셔플하기 전, 한 해의 전반적인 분위기나 중심 테마(General Theme)를 나타낼 시그니피케이터 카드를 임의로 고르거나 무작위로 뽑아 중앙에 뒷면이 보이도록 내려놓는다.\n1. 월별 카드 배치\n- 시그니피케이터 카드를 놓은 후, 남은 카드들을 셔플한다.\n- 현재 시점의 월부터 시작하여, 시계 방향(시계의 숫자 위치)으로 매월 한 장씩 순서대로 카드를 배열한다.\n- 예를 들어 리딩을 진행하는 현재 달이 8월이라면, 12시나 1시 방향에 8월 카드를 놓고, 이어서 9월, 10월... 순으로 시계 방향을 따라 총 12장의 카드를 동그랗게 놓는다.\n해석 방법\n- 중앙의 시그니피케이터 카드 해석: 가장 먼저 중앙에 둔 시그니피케이터 카드를 뒤집어, 그 해에 흐르는 전반적인 테마와 핵심 운세를 정의하고 리딩의 기준으로 삼는다.\n- 월별 흐름 해석: 현재 달부터 시작해 시계 방향으로 놓인 각 월별 카드를 한 장씩 확인하며, 해당 월에 겪게 될 주요 변화나 운세의 흐름을 리딩한다.' },
      { id: 2, name: '현재 달', meaning: '1년 운세 해석 방법을 참조하세요.' },
      { id: 3, name: '1개월 후', meaning: '1년 운세 해석 방법을 참조하세요.' },
      { id: 4, name: '2개월 후', meaning: '1년 운세 해석 방법을 참조하세요.' },
      { id: 5, name: '3개월 후', meaning: '1년 운세 해석 방법을 참조하세요.' },
      { id: 6, name: '4개월 후', meaning: '1년 운세 해석 방법을 참조하세요.' },
      { id: 7, name: '5개월 후', meaning: '1년 운세 해석 방법을 참조하세요.' },
      { id: 8, name: '6개월 후', meaning: '1년 운세 해석 방법을 참조하세요.' },
      { id: 9, name: '7개월 후', meaning: '1년 운세 해석 방법을 참조하세요.' },
      { id: 10, name: '8개월 후', meaning: '1년 운세 해석 방법을 참조하세요.' },
      { id: 11, name: '9개월 후', meaning: '1년 운세 해석 방법을 참조하세요.' },
      { id: 12, name: '10개월 후', meaning: '1년 운세 해석 방법을 참조하세요.' },
      { id: 13, name: '11개월 후', meaning: '1년 운세 해석 방법을 참조하세요.' }
    ]
  },
  {
    id: 'yesno',
    name: 'Yes / No',
    displayName: 'Yes\n·\nNo',
    layout: '1-card',
    positions: [
      { id: 1, name: '결과', meaning: '질문에 대한 명확한 긍정(Yes) 또는 부정(No)의 대답과 그 이유입니다.' }
    ]
  },
  {
    id: 'detailed-answer',
    name: '켈틱 크로스',
    displayName: '자세한\n답변',
    layout: 'celtic-cross',
    positions: [
      { id: 1, name: '1 현재', meaning: '타로 카드 10장을 활용하여 질문자의 상황, 무의식, 외부 환경, 미래 결과를 분석하는 해석법이다.' },
      { id: 2, name: '2\n장애물, 과제', meaning: '타로 카드 10장을 활용하여 질문자의 상황, 무의식, 외부 환경, 미래 결과를 분석하는 해석법이다.' },
      { id: 3, name: '3\n무의식', meaning: '타로 카드 10장을 활용하여 질문자의 상황, 무의식, 외부 환경, 미래 결과를 분석하는 해석법이다.' },
      { id: 4, name: '4\n과거', meaning: '타로 카드 10장을 활용하여 질문자의 상황, 무의식, 외부 환경, 미래 결과를 분석하는 해석법이다.' },
      { id: 5, name: '5\n의식\n목표\n가능성', meaning: '타로 카드 10장을 활용하여 질문자의 상황, 무의식, 외부 환경, 미래 결과를 분석하는 해석법이다.' },
      { id: 6, name: '6\n가까운\n미래', meaning: '타로 카드 10장을 활용하여 질문자의 상황, 무의식, 외부 환경, 미래 결과를 분석하는 해석법이다.' },
      { id: 7, name: '7\n태도', meaning: '타로 카드 10장을 활용하여 질문자의 상황, 무의식, 외부 환경, 미래 결과를 분석하는 해석법이다.' },
      { id: 8, name: '8\n외부 영향', meaning: '타로 카드 10장을 활용하여 질문자의 상황, 무의식, 외부 환경, 미래 결과를 분석하는 해석법이다.' },
      { id: 9, name: '9\n희망/\n두려움', meaning: '타로 카드 10장을 활용하여 질문자의 상황, 무의식, 외부 환경, 미래 결과를 분석하는 해석법이다.' },
      { id: 10, name: '10\n결과', meaning: '타로 카드 10장을 활용하여 질문자의 상황, 무의식, 외부 환경, 미래 결과를 분석하는 해석법이다.' }
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
    id: 'monthly',
    name: '1달 운세',
    displayName: '1달\n운세',
    layout: 'monthly-layout',
    positions: [
      { id: 1, name: '1주', meaning: '향후 4주 동안의 흐름과 영향을 주 단위로 보다 상세하게 짚어보고 싶을 때 유용한 배열법이다.' },
      { id: 2, name: '1주', meaning: '향후 4주 동안의 흐름과 영향을 주 단위로 보다 상세하게 짚어보고 싶을 때 유용한 배열법이다.' },
      { id: 3, name: '2주', meaning: '향후 4주 동안의 흐름과 영향을 주 단위로 보다 상세하게 짚어보고 싶을 때 유용한 배열법이다.' },
      { id: 4, name: '2주', meaning: '향후 4주 동안의 흐름과 영향을 주 단위로 보다 상세하게 짚어보고 싶을 때 유용한 배열법이다.' },
      { id: 5, name: '3주', meaning: '향후 4주 동안의 흐름과 영향을 주 단위로 보다 상세하게 짚어보고 싶을 때 유용한 배열법이다.' },
      { id: 6, name: '3주', meaning: '향후 4주 동안의 흐름과 영향을 주 단위로 보다 상세하게 짚어보고 싶을 때 유용한 배열법이다.' },
      { id: 7, name: '4주', meaning: '향후 4주 동안의 흐름과 영향을 주 단위로 보다 상세하게 짚어보고 싶을 때 유용한 배열법이다.' },
      { id: 8, name: '4주', meaning: '향후 4주 동안의 흐름과 영향을 주 단위로 보다 상세하게 짚어보고 싶을 때 유용한 배열법이다.' }
    ]
  },
  {
    id: 'weekly',
    name: '일주일 운세',
    displayName: '일주일\n운세',
    layout: 'placeholder',
    positions: [{ id: 1, name: '주간 흐름', meaning: '이번 주 당신에게 다가올 주요 사건과 에너지의 흐름입니다.' }]
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
      <div className="relative w-full max-w-[340px] mx-auto flex items-center justify-center py-4">
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
                className="w-[50px] aspect-[60/96] border border-white flex items-center justify-center hover:bg-white/20 transition-colors bg-black"
              >
                <span className="text-white text-[10px] whitespace-pre-line text-center leading-[1.1]">
                  {spread.displayName}
                </span>
              </button>
            ))}
          </div>
          {/* Bottom Row: 4 cards centered */}
          <div className="flex justify-center gap-2 w-full">
            {SPREADS.slice(4, 8).map((spread) => (
              <button
                key={spread.id}
                onClick={() => handleSelectSpread(spread)}
                className="w-[50px] aspect-[60/96] border border-white flex items-center justify-center hover:bg-white/20 transition-colors bg-black"
              >
                <span className="text-white text-[10px] whitespace-pre-line text-center leading-[1.1]">
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
    const getCardStyle = (posId: number, widthClass: string = 'w-[63px]') => {
      const isSelected = activePositionId === posId;
      return `${widthClass} aspect-[60/96] border-[1px] cursor-pointer transition-all flex flex-col items-center justify-center p-1 relative select-none ${
        isSelected ? 'border-white bg-[#111] z-10' : 'border-white/50 bg-black'
      }`;
    };

    if (spread.layout === '1-card') {
      const pos = spread.positions[0];
      return (
        <div className="flex justify-center mt-16">
          <div onClick={() => handleSlotClick(pos)} className={getCardStyle(pos.id)}>
            <span className="text-white text-[12px] whitespace-pre-line text-center">{pos.name}</span>
          </div>
        </div>
      );
    }

    if (spread.layout === '3-card') {
      return (
        <div className="flex justify-center gap-3 mt-16">
          {spread.positions.map((pos) => (
            <div key={pos.id} onClick={() => handleSlotClick(pos)} className={getCardStyle(pos.id)}>
              <span className="text-white text-[12px] whitespace-pre-line text-center">{pos.name}</span>
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
            <span className="text-white text-[12px] whitespace-pre-line text-center">{spread.positions[0].name}</span>
          </div>
          <div className="flex justify-center gap-3">
            {spread.positions.slice(1, 4).map((pos) => (
              <div key={pos.id} onClick={() => handleSlotClick(pos)} className={getCardStyle(pos.id)}>
                <span className="text-white text-[12px] whitespace-pre-line text-center">{pos.name}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (spread.layout === '5-card') {
      // Cross or Choices layout. We use a relative absolute positioning
      return (
        <div className="relative w-full h-[280px] mt-4 flex items-center justify-center max-w-[340px] mx-auto">
           {/* Center */}
           <div style={{ position: 'absolute', left: '50%', top: '20%', transform: 'translate(-50%, -50%)' }}>
             <div onClick={() => handleSlotClick(spread.positions[0])} className={getCardStyle(1)}>
                <span className="text-white text-[11px] whitespace-pre-line text-center">{spread.positions[0].name}</span>
             </div>
           </div>
           {/* Left Mid */}
           <div style={{ position: 'absolute', left: '25%', top: '50%', transform: 'translate(-50%, -50%)' }}>
             <div onClick={() => handleSlotClick(spread.positions[1])} className={getCardStyle(2)}>
                <span className="text-white text-[11px] whitespace-pre-line text-center">{spread.positions[1].name}</span>
             </div>
           </div>
           {/* Left Bottom */}
           <div style={{ position: 'absolute', left: '15%', top: '80%', transform: 'translate(-50%, -50%)' }}>
             <div onClick={() => handleSlotClick(spread.positions[2])} className={getCardStyle(3)}>
                <span className="text-white text-[11px] whitespace-pre-line text-center">{spread.positions[2].name}</span>
             </div>
           </div>
           {/* Right Mid */}
           <div style={{ position: 'absolute', left: '75%', top: '50%', transform: 'translate(-50%, -50%)' }}>
             <div onClick={() => handleSlotClick(spread.positions[3])} className={getCardStyle(4)}>
                <span className="text-white text-[11px] whitespace-pre-line text-center">{spread.positions[3].name}</span>
             </div>
           </div>
           {/* Right Bottom */}
           <div style={{ position: 'absolute', left: '85%', top: '80%', transform: 'translate(-50%, -50%)' }}>
             <div onClick={() => handleSlotClick(spread.positions[4])} className={getCardStyle(5)}>
                <span className="text-white text-[11px] whitespace-pre-line text-center">{spread.positions[4].name}</span>
             </div>
           </div>
        </div>
      );
    }

    if (spread.layout === 'monthly-layout') {
      return (
        <div className="grid grid-cols-2 gap-x-4 gap-y-4 mt-6 mx-auto w-fit pb-8">
          {spread.positions.map(pos => (
            <div key={pos.id} onClick={() => handleSlotClick(pos)} className={getCardStyle(pos.id, 'w-[55px]')}>
              <span className="text-white text-[11px] whitespace-pre-line text-center leading-tight">{pos.name}</span>
            </div>
          ))}
        </div>
      );
    }

    if (spread.layout === 'love-cross') {
      return (
        <div className="relative w-full h-[320px] mt-4 flex items-center justify-center max-w-[340px] mx-auto">
           {/* Top: 4 */}
           <div style={{ position: 'absolute', left: '50%', top: '15%', transform: 'translate(-50%, -50%)' }}>
             <div onClick={() => handleSlotClick(spread.positions[3])} className={getCardStyle(4)}>
                <span className="text-white text-[11px] whitespace-pre-line text-center leading-tight">{spread.positions[3].name}</span>
             </div>
           </div>
           {/* Left: 2 */}
           <div style={{ position: 'absolute', left: '25%', top: '50%', transform: 'translate(-50%, -50%)' }}>
             <div onClick={() => handleSlotClick(spread.positions[1])} className={getCardStyle(2)}>
                <span className="text-white text-[11px] whitespace-pre-line text-center leading-tight">{spread.positions[1].name}</span>
             </div>
           </div>
           {/* Center: 1 */}
           <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
             <div onClick={() => handleSlotClick(spread.positions[0])} className={getCardStyle(1)}>
                <span className="text-white text-[10px] whitespace-pre-line text-center leading-[1.1]">{spread.positions[0].name}</span>
             </div>
           </div>
           {/* Right: 3 */}
           <div style={{ position: 'absolute', left: '75%', top: '50%', transform: 'translate(-50%, -50%)' }}>
             <div onClick={() => handleSlotClick(spread.positions[2])} className={getCardStyle(3)}>
                <span className="text-white text-[10px] whitespace-pre-line text-center leading-[1.1]">{spread.positions[2].name}</span>
             </div>
           </div>
           {/* Bottom: 5 */}
           <div style={{ position: 'absolute', left: '50%', top: '85%', transform: 'translate(-50%, -50%)' }}>
             <div onClick={() => handleSlotClick(spread.positions[4])} className={getCardStyle(5)}>
                <span className="text-white text-[10px] whitespace-pre-line text-center leading-[1.1]">{spread.positions[4].name}</span>
             </div>
           </div>
        </div>
      );
    }

    if (spread.layout === 'celtic-cross') {
      return (
        <div className="relative w-full h-[360px] mt-2 flex items-center justify-center max-w-[340px] mx-auto">
           {/* Left: 4 */}
           <div style={{ position: 'absolute', left: '15%', top: '50%', transform: 'translate(-50%, -50%)' }}>
             <div onClick={() => handleSlotClick(spread.positions[3])} className={getCardStyle(4, 'w-[45px]')}>
                <span className="text-white text-[9px] whitespace-pre-line text-center leading-tight">{spread.positions[3].name}</span>
             </div>
           </div>
           {/* Center: 1 */}
           <div style={{ position: 'absolute', left: '40%', top: '50%', transform: 'translate(-50%, -50%)' }}>
             <div onClick={() => handleSlotClick(spread.positions[0])} className={getCardStyle(1, 'w-[45px]')}>
                <span className="text-white text-[9px] whitespace-pre-line text-center leading-tight">{spread.positions[0].name}</span>
             </div>
           </div>
           {/* Center Crossed: 2 */}
           <div style={{ position: 'absolute', left: '40%', top: '50%', transform: 'translate(-50%, -50%) rotate(90deg)' }}>
             <div onClick={() => handleSlotClick(spread.positions[1])} className={getCardStyle(2, 'w-[45px]')}>
                <span className="text-white text-[9px] whitespace-pre-line text-center leading-tight transform -rotate-90">{spread.positions[1].name}</span>
             </div>
           </div>
           {/* Bottom: 3 */}
           <div style={{ position: 'absolute', left: '40%', top: '80%', transform: 'translate(-50%, -50%)' }}>
             <div onClick={() => handleSlotClick(spread.positions[2])} className={getCardStyle(3, 'w-[45px]')}>
                <span className="text-white text-[9px] whitespace-pre-line text-center leading-tight">{spread.positions[2].name}</span>
             </div>
           </div>
           {/* Top: 5 */}
           <div style={{ position: 'absolute', left: '40%', top: '20%', transform: 'translate(-50%, -50%)' }}>
             <div onClick={() => handleSlotClick(spread.positions[4])} className={getCardStyle(5, 'w-[45px]')}>
                <span className="text-white text-[9px] whitespace-pre-line text-center leading-tight">{spread.positions[4].name}</span>
             </div>
           </div>
           {/* Right: 6 */}
           <div style={{ position: 'absolute', left: '65%', top: '50%', transform: 'translate(-50%, -50%)' }}>
             <div onClick={() => handleSlotClick(spread.positions[5])} className={getCardStyle(6, 'w-[45px]')}>
                <span className="text-white text-[9px] whitespace-pre-line text-center leading-tight">{spread.positions[5].name}</span>
             </div>
           </div>
           
           {/* Right Column */}
           <div style={{ position: 'absolute', left: '90%', top: '85%', transform: 'translate(-50%, -50%)' }}>
             <div onClick={() => handleSlotClick(spread.positions[6])} className={getCardStyle(7, 'w-[42px]')}>
                <span className="text-white text-[8px] whitespace-pre-line text-center leading-tight">{spread.positions[6].name}</span>
             </div>
           </div>
           <div style={{ position: 'absolute', left: '90%', top: '61%', transform: 'translate(-50%, -50%)' }}>
             <div onClick={() => handleSlotClick(spread.positions[7])} className={getCardStyle(8, 'w-[42px]')}>
                <span className="text-white text-[8px] whitespace-pre-line text-center leading-tight">{spread.positions[7].name}</span>
             </div>
           </div>
           <div style={{ position: 'absolute', left: '90%', top: '37%', transform: 'translate(-50%, -50%)' }}>
             <div onClick={() => handleSlotClick(spread.positions[8])} className={getCardStyle(9, 'w-[42px]')}>
                <span className="text-white text-[8px] whitespace-pre-line text-center leading-tight">{spread.positions[8].name}</span>
             </div>
           </div>
           <div style={{ position: 'absolute', left: '90%', top: '13%', transform: 'translate(-50%, -50%)' }}>
             <div onClick={() => handleSlotClick(spread.positions[9])} className={getCardStyle(10, 'w-[42px]')}>
                <span className="text-white text-[8px] whitespace-pre-line text-center leading-tight">{spread.positions[9].name}</span>
             </div>
           </div>
        </div>
      );
    }

    if (spread.layout === 'weekly-layout') {
      const radius = 110;
      const angles = {
        1: 51.4,   // 월
        2: 257.1,  // 화
        3: 102.8,  // 수
        4: 308.5,  // 목
        5: 154.2,  // 금
        6: 0,      // 토
        7: 205.7   // 일
      };
      
      return (
        <div className="relative w-full h-[320px] mt-4 flex items-center justify-center max-w-[340px] mx-auto">
          {/* Center */}
          <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
             <div onClick={() => handleSlotClick(spread.positions[0])} className={getCardStyle(1, 'w-[48px]')}>
                <span className="text-white text-[8px] whitespace-pre-line text-center leading-tight">{spread.positions[0].name}</span>
             </div>
          </div>
          {/* Circular items */}
          {spread.positions.slice(1).map((pos, i) => {
            const angleDeg = angles[(i + 1) as keyof typeof angles] - 90; 
            const angleRad = (angleDeg * Math.PI) / 180;
            const left = `calc(50% + ${Math.cos(angleRad) * radius}px)`;
            const top = `calc(50% + ${Math.sin(angleRad) * radius}px)`;
            return (
              <div key={pos.id} style={{ position: 'absolute', left, top, transform: 'translate(-50%, -50%)' }}>
                 <div onClick={() => handleSlotClick(pos)} className={getCardStyle(pos.id, 'w-[45px]')}>
                    <span className="text-white text-[9px] whitespace-pre-line text-center leading-tight">{pos.name}</span>
                 </div>
              </div>
            );
          })}
        </div>
      );
    }

    if (spread.layout === 'yearly-layout') {
      const radius = 135;
      return (
        <div className="relative w-full h-[380px] mt-2 flex items-center justify-center max-w-[340px] mx-auto">
          {/* Center */}
          <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
             <div onClick={() => handleSlotClick(spread.positions[0])} className={getCardStyle(1, 'w-[45px]')}>
                <span className="text-white text-[8px] whitespace-pre-line text-center leading-tight">{spread.positions[0].name}</span>
             </div>
          </div>
          {/* Clock items */}
          {spread.positions.slice(1).map((pos, i) => {
            const angleDeg = (i * 30) - 90; 
            const angleRad = (angleDeg * Math.PI) / 180;
            const left = `calc(50% + ${Math.cos(angleRad) * radius}px)`;
            const top = `calc(50% + ${Math.sin(angleRad) * radius}px)`;
            return (
              <div key={pos.id} style={{ position: 'absolute', left, top, transform: 'translate(-50%, -50%)' }}>
                 <div onClick={() => handleSlotClick(pos)} className={getCardStyle(pos.id, 'w-[36px]')}>
                    <span className="text-white text-[7px] whitespace-pre-line text-center leading-tight">{pos.name}</span>
                 </div>
              </div>
            );
          })}
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
