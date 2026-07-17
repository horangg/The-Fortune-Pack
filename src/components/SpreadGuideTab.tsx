import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw, Sparkles } from 'lucide-react';
import { Typewriter } from './Typewriter';
import { findCardByCode } from '../data/tarotData';
import { TarotCard } from '../types';

const getCardImageSrc = (englishName: string) => {
  let fileName = englishName;
  if (englishName === "The Hierophant") fileName = "The HiePophant";
  else if (englishName === "The Lovers") fileName = "The Lover";
  else if (englishName === "Judgment") fileName = "Judgement";
  return `${import.meta.env.BASE_URL}Card/${fileName}.jpg`;
};

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

export interface RegisteredCard {
  card: TarotCard;
  isReversed: boolean;
}

export const SpreadGuideTab: React.FC = () => {
  const [selectedSpread, setSelectedSpread] = useState<SpreadDef | null>(null);
  const [activePositionId, setActivePositionId] = useState<number>(1);
  const [registeredCards, setRegisteredCards] = useState<Record<number, RegisteredCard>>({});
  
  // Registration Modal State
  const [registrationPosId, setRegistrationPosId] = useState<number | null>(null);
  const [codeInput, setCodeInput] = useState<string>('');
  const [isReversedInput, setIsReversedInput] = useState<boolean>(false);
  const [registrationError, setRegistrationError] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // AI Reading State
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiReading, setAiReading] = useState<string | null>(null);
  const [question, setQuestion] = useState('');

  useEffect(() => {
    if (registrationPosId !== null) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [registrationPosId]);

  const handleSelectSpread = (spread: SpreadDef) => {
    setSelectedSpread(spread);
    setActivePositionId(1);
    setRegisteredCards({});
    setAiReading(null);
    setQuestion('');
  };

  const handleBack = () => {
    setSelectedSpread(null);
  };

  const handleSlotClick = (pos: PositionDef) => {
    setActivePositionId(pos.id);
  };

  const handleSlotDoubleClick = (posId: number) => {
    setRegistrationPosId(posId);
    setCodeInput('');
    setIsReversedInput(false);
    setRegistrationError(false);
  };

  const handleRegisterCard = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (codeInput.length !== 3) {
      setRegistrationError(true);
      return;
    }
    const card = findCardByCode(codeInput);
    if (card && registrationPosId !== null) {
      setRegisteredCards(prev => ({
        ...prev,
        [registrationPosId]: { card, isReversed: isReversedInput }
      }));
      setRegistrationPosId(null);
    } else {
      setRegistrationError(true);
    }
  };

  const handleClearCard = () => {
    if (registrationPosId !== null) {
      setRegisteredCards(prev => {
        const next = { ...prev };
        delete next[registrationPosId];
        return next;
      });
      setRegistrationPosId(null);
    }
  };

  const handleAiReading = async () => {
    if (Object.keys(registeredCards).length === 0) return;
    setIsAiLoading(true);
    try {
      const cardsData = Object.entries(registeredCards).map(([posId, reg]) => {
        const pos = selectedSpread?.positions.find(p => p.id === Number(posId));
        return {
          positionName: pos?.name || '',
          cardName: reg.card.name,
          isReversed: reg.isReversed,
          meaning: reg.isReversed ? reg.card.reversedMeaning : reg.card.uprightMeaning
        };
      });

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/tarot-reader`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          question: question,
          spreadName: selectedSpread?.name,
          cards: cardsData
        })
      });

      if (!response.ok) {
        throw new Error('AI 리딩을 가져오는데 실패했습니다.');
      }

      const data = await response.json();
      setAiReading(data.reading);
    } catch (error) {
      console.error(error);
      alert('AI 리딩을 불러오는 중 오류가 발생했습니다. (백엔드 설정을 완료했는지 확인해주세요)');
    } finally {
      setIsAiLoading(false);
    }
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
      const hasCard = !!registeredCards[posId];
      return `${widthClass} aspect-[60/96] border-[1px] cursor-pointer transition-all flex flex-col items-center justify-center relative select-none ${
        isSelected ? 'border-white z-10 shadow-lg shadow-white/20' : 'border-white/50'
      } ${hasCard ? 'bg-transparent overflow-hidden' : (isSelected ? 'bg-[#111] p-1' : 'bg-black p-1')}`;
    };

    const renderSlotContent = (pos: PositionDef, textClass: string) => {
      const registered = registeredCards[pos.id];
      if (registered) {
        return (
          <img 
            src={getCardImageSrc(registered.card.englishName)} 
            alt={registered.card.name}
            className={`w-full h-full object-cover pointer-events-none ${registered.isReversed ? 'rotate-180' : ''}`}
          />
        );
      }
      return <span className={textClass}>{pos.name}</span>;
    };

    if (spread.layout === '1-card') {
      const pos = spread.positions[0];
      return (
        <div className="flex justify-center mt-16">
          <div 
            onClick={() => handleSlotClick(pos)} 
            onDoubleClick={() => handleSlotDoubleClick(pos.id)}
            className={getCardStyle(pos.id)}
          >
            {renderSlotContent(pos, "text-white text-[12px] whitespace-pre-line text-center")}
          </div>
        </div>
      );
    }

    if (spread.layout === '3-card') {
      return (
        <div className="flex justify-center gap-3 mt-16">
          {spread.positions.map((pos) => (
            <div 
              key={pos.id} 
              onClick={() => handleSlotClick(pos)} 
              onDoubleClick={() => handleSlotDoubleClick(pos.id)}
              className={getCardStyle(pos.id)}
            >
              {renderSlotContent(pos, "text-white text-[12px] whitespace-pre-line text-center")}
            </div>
          ))}
        </div>
      );
    }

    if (spread.layout === '4-card') {
      // 1 on top, 3 below
      return (
        <div className="flex flex-col items-center gap-4 mt-8">
          <div 
            onClick={() => handleSlotClick(spread.positions[0])} 
            onDoubleClick={() => handleSlotDoubleClick(spread.positions[0].id)}
            className={getCardStyle(1)}
          >
            {renderSlotContent(spread.positions[0], "text-white text-[12px] whitespace-pre-line text-center")}
          </div>
          <div className="flex justify-center gap-3">
            {spread.positions.slice(1, 4).map((pos) => (
              <div 
                key={pos.id} 
                onClick={() => handleSlotClick(pos)} 
                onDoubleClick={() => handleSlotDoubleClick(pos.id)}
                className={getCardStyle(pos.id)}
              >
                {renderSlotContent(pos, "text-white text-[12px] whitespace-pre-line text-center")}
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
             <div onClick={() => handleSlotClick(spread.positions[0])} onDoubleClick={() => handleSlotDoubleClick(spread.positions[0].id)} className={getCardStyle(1)}>
                {renderSlotContent(spread.positions[0], "text-white text-[11px] whitespace-pre-line text-center")}
             </div>
           </div>
           {/* Left Mid */}
           <div style={{ position: 'absolute', left: '25%', top: '50%', transform: 'translate(-50%, -50%)' }}>
             <div onClick={() => handleSlotClick(spread.positions[1])} onDoubleClick={() => handleSlotDoubleClick(spread.positions[1].id)} className={getCardStyle(2)}>
                {renderSlotContent(spread.positions[1], "text-white text-[11px] whitespace-pre-line text-center")}
             </div>
           </div>
           {/* Left Bottom */}
           <div style={{ position: 'absolute', left: '15%', top: '80%', transform: 'translate(-50%, -50%)' }}>
             <div onClick={() => handleSlotClick(spread.positions[2])} onDoubleClick={() => handleSlotDoubleClick(spread.positions[2].id)} className={getCardStyle(3)}>
                {renderSlotContent(spread.positions[2], "text-white text-[11px] whitespace-pre-line text-center")}
             </div>
           </div>
           {/* Right Mid */}
           <div style={{ position: 'absolute', left: '75%', top: '50%', transform: 'translate(-50%, -50%)' }}>
             <div onClick={() => handleSlotClick(spread.positions[3])} onDoubleClick={() => handleSlotDoubleClick(spread.positions[3].id)} className={getCardStyle(4)}>
                {renderSlotContent(spread.positions[3], "text-white text-[11px] whitespace-pre-line text-center")}
             </div>
           </div>
           {/* Right Bottom */}
           <div style={{ position: 'absolute', left: '85%', top: '80%', transform: 'translate(-50%, -50%)' }}>
             <div onClick={() => handleSlotClick(spread.positions[4])} onDoubleClick={() => handleSlotDoubleClick(spread.positions[4].id)} className={getCardStyle(5)}>
                {renderSlotContent(spread.positions[4], "text-white text-[11px] whitespace-pre-line text-center")}
             </div>
           </div>
        </div>
      );
    }

    if (spread.layout === 'monthly-layout') {
      return (
        <div className="grid grid-cols-2 gap-x-4 gap-y-4 mt-6 mx-auto w-fit pb-8">
          {spread.positions.map(pos => (
            <div 
              key={pos.id} 
              onClick={() => handleSlotClick(pos)} 
              onDoubleClick={() => handleSlotDoubleClick(pos.id)}
              className={getCardStyle(pos.id, 'w-[55px]')}
            >
              {renderSlotContent(pos, "text-white text-[11px] whitespace-pre-line text-center leading-tight")}
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
             <div onClick={() => handleSlotClick(spread.positions[3])} onDoubleClick={() => handleSlotDoubleClick(spread.positions[3].id)} className={getCardStyle(4)}>
                {renderSlotContent(spread.positions[3], "text-white text-[11px] whitespace-pre-line text-center leading-tight")}
             </div>
           </div>
           {/* Left: 2 */}
           <div style={{ position: 'absolute', left: '25%', top: '50%', transform: 'translate(-50%, -50%)' }}>
             <div onClick={() => handleSlotClick(spread.positions[1])} onDoubleClick={() => handleSlotDoubleClick(spread.positions[1].id)} className={getCardStyle(2)}>
                {renderSlotContent(spread.positions[1], "text-white text-[11px] whitespace-pre-line text-center leading-tight")}
             </div>
           </div>
           {/* Center: 1 */}
           <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
             <div onClick={() => handleSlotClick(spread.positions[0])} onDoubleClick={() => handleSlotDoubleClick(spread.positions[0].id)} className={getCardStyle(1)}>
                {renderSlotContent(spread.positions[0], "text-white text-[10px] whitespace-pre-line text-center leading-[1.1]")}
             </div>
           </div>
           {/* Right: 3 */}
           <div style={{ position: 'absolute', left: '75%', top: '50%', transform: 'translate(-50%, -50%)' }}>
             <div onClick={() => handleSlotClick(spread.positions[2])} onDoubleClick={() => handleSlotDoubleClick(spread.positions[2].id)} className={getCardStyle(3)}>
                {renderSlotContent(spread.positions[2], "text-white text-[10px] whitespace-pre-line text-center leading-[1.1]")}
             </div>
           </div>
           {/* Bottom: 5 */}
           <div style={{ position: 'absolute', left: '50%', top: '85%', transform: 'translate(-50%, -50%)' }}>
             <div onClick={() => handleSlotClick(spread.positions[4])} onDoubleClick={() => handleSlotDoubleClick(spread.positions[4].id)} className={getCardStyle(5)}>
                {renderSlotContent(spread.positions[4], "text-white text-[10px] whitespace-pre-line text-center leading-[1.1]")}
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
             <div onClick={() => handleSlotClick(spread.positions[3])} onDoubleClick={() => handleSlotDoubleClick(spread.positions[3].id)} className={getCardStyle(4, 'w-[45px]')}>
                {renderSlotContent(spread.positions[3], "text-white text-[9px] whitespace-pre-line text-center leading-tight")}
             </div>
           </div>
           {/* Center: 1 */}
           <div style={{ position: 'absolute', left: '40%', top: '50%', transform: 'translate(-50%, -50%)' }}>
             <div onClick={() => handleSlotClick(spread.positions[0])} onDoubleClick={() => handleSlotDoubleClick(spread.positions[0].id)} className={getCardStyle(1, 'w-[45px]')}>
                {renderSlotContent(spread.positions[0], "text-white text-[9px] whitespace-pre-line text-center leading-tight")}
             </div>
           </div>
           {/* Center Crossed: 2 */}
           <div style={{ position: 'absolute', left: '40%', top: '50%', transform: 'translate(-50%, -50%) rotate(90deg)' }}>
             <div onClick={() => handleSlotClick(spread.positions[1])} onDoubleClick={() => handleSlotDoubleClick(spread.positions[1].id)} className={getCardStyle(2, 'w-[45px]')}>
                {renderSlotContent(spread.positions[1], "text-white text-[9px] whitespace-pre-line text-center leading-tight transform -rotate-90")}
             </div>
           </div>
           {/* Bottom: 3 */}
           <div style={{ position: 'absolute', left: '40%', top: '80%', transform: 'translate(-50%, -50%)' }}>
             <div onClick={() => handleSlotClick(spread.positions[2])} onDoubleClick={() => handleSlotDoubleClick(spread.positions[2].id)} className={getCardStyle(3, 'w-[45px]')}>
                {renderSlotContent(spread.positions[2], "text-white text-[9px] whitespace-pre-line text-center leading-tight")}
             </div>
           </div>
           {/* Top: 5 */}
           <div style={{ position: 'absolute', left: '40%', top: '20%', transform: 'translate(-50%, -50%)' }}>
             <div onClick={() => handleSlotClick(spread.positions[4])} onDoubleClick={() => handleSlotDoubleClick(spread.positions[4].id)} className={getCardStyle(5, 'w-[45px]')}>
                {renderSlotContent(spread.positions[4], "text-white text-[9px] whitespace-pre-line text-center leading-tight")}
             </div>
           </div>
           {/* Right: 6 */}
           <div style={{ position: 'absolute', left: '65%', top: '50%', transform: 'translate(-50%, -50%)' }}>
             <div onClick={() => handleSlotClick(spread.positions[5])} onDoubleClick={() => handleSlotDoubleClick(spread.positions[5].id)} className={getCardStyle(6, 'w-[45px]')}>
                {renderSlotContent(spread.positions[5], "text-white text-[9px] whitespace-pre-line text-center leading-tight")}
             </div>
           </div>
           
           {/* Right Column */}
           <div style={{ position: 'absolute', left: '90%', top: '85%', transform: 'translate(-50%, -50%)' }}>
             <div onClick={() => handleSlotClick(spread.positions[6])} onDoubleClick={() => handleSlotDoubleClick(spread.positions[6].id)} className={getCardStyle(7, 'w-[42px]')}>
                {renderSlotContent(spread.positions[6], "text-white text-[8px] whitespace-pre-line text-center leading-tight")}
             </div>
           </div>
           <div style={{ position: 'absolute', left: '90%', top: '61%', transform: 'translate(-50%, -50%)' }}>
             <div onClick={() => handleSlotClick(spread.positions[7])} onDoubleClick={() => handleSlotDoubleClick(spread.positions[7].id)} className={getCardStyle(8, 'w-[42px]')}>
                {renderSlotContent(spread.positions[7], "text-white text-[8px] whitespace-pre-line text-center leading-tight")}
             </div>
           </div>
           <div style={{ position: 'absolute', left: '90%', top: '37%', transform: 'translate(-50%, -50%)' }}>
             <div onClick={() => handleSlotClick(spread.positions[8])} onDoubleClick={() => handleSlotDoubleClick(spread.positions[8].id)} className={getCardStyle(9, 'w-[42px]')}>
                {renderSlotContent(spread.positions[8], "text-white text-[8px] whitespace-pre-line text-center leading-tight")}
             </div>
           </div>
           <div style={{ position: 'absolute', left: '90%', top: '13%', transform: 'translate(-50%, -50%)' }}>
             <div onClick={() => handleSlotClick(spread.positions[9])} onDoubleClick={() => handleSlotDoubleClick(spread.positions[9].id)} className={getCardStyle(10, 'w-[42px]')}>
                {renderSlotContent(spread.positions[9], "text-white text-[8px] whitespace-pre-line text-center leading-tight")}
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
             <div onClick={() => handleSlotClick(spread.positions[0])} onDoubleClick={() => handleSlotDoubleClick(spread.positions[0].id)} className={getCardStyle(1, 'w-[48px]')}>
                {renderSlotContent(spread.positions[0], "text-white text-[8px] whitespace-pre-line text-center leading-tight")}
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
                 <div onClick={() => handleSlotClick(pos)} onDoubleClick={() => handleSlotDoubleClick(pos.id)} className={getCardStyle(pos.id, 'w-[45px]')}>
                    {renderSlotContent(pos, "text-white text-[9px] whitespace-pre-line text-center leading-tight")}
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
             <div onClick={() => handleSlotClick(spread.positions[0])} onDoubleClick={() => handleSlotDoubleClick(spread.positions[0].id)} className={getCardStyle(1, 'w-[45px]')}>
                {renderSlotContent(spread.positions[0], "text-white text-[8px] whitespace-pre-line text-center leading-tight")}
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
                 <div onClick={() => handleSlotClick(pos)} onDoubleClick={() => handleSlotDoubleClick(pos.id)} className={getCardStyle(pos.id, 'w-[36px]')}>
                    {renderSlotContent(pos, "text-white text-[7px] whitespace-pre-line text-center leading-tight")}
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
    const registered = registeredCards[activePositionId];

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

        {/* AI Integration */}
        {Object.keys(registeredCards).length > 0 && (
          <div className="w-full px-2 mt-6 space-y-3 shrink-0">
            <input 
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="타로 마스터에게 물어볼 질문 (선택사항)"
              className="w-full px-3 py-2.5 bg-black border border-white/50 text-white text-[12px] focus:outline-none focus:border-white transition-colors placeholder:text-white/40"
            />
            <button
               onClick={handleAiReading}
               disabled={isAiLoading}
               className="w-full py-3 border border-white bg-white text-black font-bold hover:bg-[#eee] transition-colors text-[13px] flex justify-center items-center gap-2"
             >
               {isAiLoading ? (
                 <span className="animate-pulse">🔮 마스터가 리딩을 준비중입니다...</span>
               ) : (
                 <>🔮 AI 마스터에게 통합 리딩 받기</>
               )}
             </button>
          </div>
        )}

        {/* Bottom Dialogue Box */}
        <div className="w-full px-2 mt-4 pb-4 shrink-0">
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
                    <h3 className="text-white uppercase font-bold text-[13px] mb-2">
                      {activePosition.name}
                      {registered && <span className="text-[#ffd700] font-normal ml-2 text-[12px]">({registered.card.name} {registered.isReversed ? '역방향' : '정방향'})</span>}
                    </h3>
                    
                    {!registered ? (
                      <p className="text-white/90 leading-relaxed max-w-xs mx-auto text-[12px]">
                        {activePosition.meaning}
                      </p>
                    ) : (
                      <div className="text-left space-y-2.5 mt-2">
                        <p className="text-white/90 text-[12px] leading-relaxed">
                          <strong className="text-white bg-white/20 px-1 rounded mr-1">[{activePosition.name}]</strong>
                          {activePosition.meaning}
                        </p>
                        <div className="pt-2 border-t border-white/20">
                          <p className="text-[#ffd700] text-[12px] leading-relaxed">
                            <strong className="font-bold block mb-1 text-[11px] text-white/80">💡 종합 해석 힌트</strong>
                            해당 자리에 <strong className="text-white">[{registered.card.name}]</strong> 카드가 나와 있습니다.<br/>
                            따라서 이 상황은 <strong className="text-white underline decoration-[#ffd700]/50 underline-offset-2">"{registered.isReversed ? registered.card.reversedMeaning : registered.card.uprightMeaning}"</strong> (이)라는 관점으로 연결해서 해석해 볼 수 있습니다.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              {!registered && (
                <span className="text-white/50 block mt-4 text-[10px]">
                  (자리를 더블클릭하여 카드를 등록하세요)
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="flex-1 flex flex-col items-center px-6 py-4 min-h-[580px] text-white bg-black w-full overflow-y-auto custom-scrollbar relative">
      <AnimatePresence mode="wait">
        {!selectedSpread ? renderTableSelection() : renderDetailView(selectedSpread)}
      </AnimatePresence>

      {/* Registration Modal */}
      <AnimatePresence>
        {registrationPosId !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-50 px-6 backdrop-blur-sm"
          >
            <div className="w-full max-w-[280px] border border-white p-6 bg-black flex flex-col items-center gap-4">
              <h3 className="text-white text-[14px] font-bold">카드 등록</h3>
              <p className="text-white/60 text-[11px] text-center leading-tight mb-2">
                리딩북에 적힌 3자리 카드를 입력하세요.<br />
                (예: 421)
              </p>
              
              <form onSubmit={handleRegisterCard} className="w-full flex flex-col gap-4">
                <input
                  ref={inputRef}
                  type="number"
                  placeholder="000"
                  value={codeInput}
                  onChange={(e) => {
                    const val = e.target.value.slice(0, 3);
                    setCodeInput(val);
                    setRegistrationError(false);
                  }}
                  className={`w-full bg-transparent border-b-2 text-center text-2xl py-2 focus:outline-none transition-colors ${
                    registrationError ? 'border-red-500 text-red-500' : 'border-white text-white'
                  }`}
                />
                
                <label className="flex items-center justify-center gap-2 text-white text-[12px] cursor-pointer mt-2">
                  <input 
                    type="checkbox" 
                    checked={isReversedInput}
                    onChange={(e) => setIsReversedInput(e.target.checked)}
                    className="accent-white w-4 h-4"
                  />
                  이 카드는 역방향입니다
                </label>

                {registrationError && (
                  <p className="text-red-500 text-[11px] text-center">올바른 카드를 찾을 수 없습니다.</p>
                )}

                <div className="flex gap-2 w-full mt-2">
                  <button
                    type="button"
                    onClick={() => setRegistrationPosId(null)}
                    className="flex-1 py-2 border border-white/50 text-white/70 hover:bg-white/10 text-[12px]"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-white text-black font-bold hover:bg-[#eee] text-[12px]"
                  >
                    등록
                  </button>
                </div>
                {registeredCards[registrationPosId] && (
                  <button
                    type="button"
                    onClick={handleClearCard}
                    className="w-full py-2 border border-red-500/50 text-red-400 hover:bg-red-500/10 text-[12px] mt-2"
                  >
                    등록 해제
                  </button>
                )}
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Reading Modal */}
      <AnimatePresence>
        {aiReading && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute inset-0 bg-black z-50 flex flex-col p-4 sm:p-6 pb-24 overflow-y-auto custom-scrollbar"
          >
             <div className="flex justify-between items-center mb-6 sticky top-0 bg-black py-2 border-b border-white/20">
               <h3 className="text-white text-[16px] font-bold">🔮 AI 통합 리딩 결과</h3>
               <button onClick={() => setAiReading(null)} className="text-white/60 hover:text-white p-2">
                 ✕
               </button>
             </div>
             
             <div className="text-white/90 text-[13px] leading-relaxed whitespace-pre-line space-y-4 font-serif">
               {aiReading}
             </div>
             
             <button 
               onClick={() => setAiReading(null)}
               className="w-full mt-10 py-3 border border-white text-white hover:bg-white hover:text-black transition-colors"
             >
               리딩 종료하기
             </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
