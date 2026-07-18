import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Typewriter } from './Typewriter';

interface PositionDef {
  id: number;
  name: string;
  meaning: string;
}

interface ReadingStep {
  text: string;
  highlightPositionId?: number;
}

type SpreadId = 'one-card' | 'past-present-future' | 'yesno' | 'celtic-cross' | 'choices' | 'love' | 'yearly' | 'monthly' | 'weekly';

interface SpreadDef {
  id: SpreadId;
  name: string;
  displayName: string;
  layout: '1-card' | '3-card' | '4-card' | '5-card' | 'celtic-cross' | 'love-cross' | 'yearly-layout' | 'monthly-layout' | 'weekly-layout' | 'placeholder';
  description: string;
  readingSteps: ReadingStep[];
  positions: PositionDef[];
}

const SPREADS: SpreadDef[] = [
  {
    id: 'one-card',
    name: '원 카드 리딩',
    displayName: '원 카드\n리딩',
    layout: '1-card',
    description: '데일리 리딩이나 빠르고 직관적인 조언이 필요할 때. 예/아니오 보다는 구체적인 질문에 적합합니다.',
    readingSteps: [
      { text: '1. 알고 싶은 상황이나 질문에 집중하며 카드를 섞습니다.' },
      { text: '2. 카드를 뒷면이 보이게 부채꼴로 넓게 펼친 후, 주로 사용하지 않는 손으로 카드를 뽑습니다.' },
      { text: '3. 카드를 뒤집을 때는 반드시 왼쪽에서 오른쪽 방향으로 뒤집습니다.' },
      { text: '1번 카드: 조언, 또는 질문에 대한 답', highlightPositionId: 1 }
    ],
    positions: [
      { id: 1, name: '결과', meaning: '조언 또는 질문에 대한 명확한 해답을 상징합니다.' }
    ]
  },
  {
    id: 'past-present-future',
    name: '과거, 현재, 미래',
    displayName: '과거·현재\n미래',
    layout: '3-card',
    description: '미니 리딩이나 전반적인 상황 흐름을 빠르게 파악하고 싶을 때 적합합니다.',
    readingSteps: [
      { text: '1. 알고 싶은 상황이나 질문에 집중하며 카드를 섞습니다.' },
      { text: '2. 카드를 뒷면이 보이게 부채꼴로 넓게 펼친 후, 주로 사용하지 않는 손으로 카드를 뽑습니다.' },
      { text: '3. 가로로 세 장의 카드를 순서대로 놓습니다. 카드를 뒤집을 때는 반드시 왼쪽에서 오른쪽 방향으로 뒤집습니다.' },
      { text: '1번 카드: 과거. 최근에 일어났던 일이나 발생한 사건, 배경을 상징합니다.', highlightPositionId: 1 },
      { text: '2번 카드: 현재. 질문자가 현재 처한 상황이나 느끼고 있는 상태를 보여줍니다.', highlightPositionId: 2 },
      { text: '3번 카드: 미래. 앞으로 가까운 미래에 전개될 상황이나 다가올 주요 영향력을 나타냅니다.', highlightPositionId: 3 }
    ],
    positions: [
      { id: 1, name: '과거', meaning: '최근에 일어났던 일이나 발생한 사건, 배경을 상징합니다.' },
      { id: 2, name: '현재', meaning: '질문자가 현재 처한 상황이나 느끼고 있는 상태를 보여줍니다.' },
      { id: 3, name: '미래', meaning: '앞으로 가까운 미래에 전개될 상황이나 다가올 주요 영향력을 나타냅니다.' }
    ]
  },
  {
    id: 'yesno',
    name: '예스 or 노',
    displayName: 'Yes\n·\nNo',
    layout: '3-card',
    description: '빠르게 명확한 결정을 내리고 싶을 때 적합합니다.',
    readingSteps: [
      { text: '1. 알고 싶은 상황이나 질문에 집중하며 카드를 섞습니다.' },
      { text: '2. 카드를 뒷면이 보이게 부채꼴로 넓게 펼친 후, 주로 사용하지 않는 손으로 카드를 뽑습니다.' },
      { text: '3. 질문을 마음 속으로 생각하며 세 장의 카드를 뽑아 좌, 중, 우 순서대로 놓습니다.' },
      { text: '좌측 카드: 긍정(Yes), 부정(No), 중립 카드를 판별합니다.', highlightPositionId: 1 },
      { text: '중앙 카드: 긍정(Yes), 부정(No), 중립 카드를 판별합니다.', highlightPositionId: 2 },
      { text: '우측 카드: 긍정(Yes), 부정(No), 중립 카드를 판별합니다.', highlightPositionId: 3 },
      { text: '분류 결과: 3장이 모두 Yes면 확실한 긍정, 2장이 Yes면 긍정적이나 시간이 걸릴 수 있음을 뜻하며, No가 많거나 중립이 섞여 있다면 부정적인 결론에 가깝습니다.' }
    ],
    positions: [
      { id: 1, name: '카드 1', meaning: '긍정, 부정, 중립 판별을 위한 첫 번째 카드입니다.' },
      { id: 2, name: '카드 2', meaning: '긍정, 부정, 중립 판별을 위한 두 번째 카드입니다.' },
      { id: 3, name: '카드 3', meaning: '긍정, 부정, 중립 판별을 위한 세 번째 카드입니다.' }
    ]
  },
  {
    id: 'celtic-cross',
    name: '켈틱 크로스',
    displayName: '켈틱\n크로스',
    layout: 'celtic-cross',
    description: '특정 질문에 대해 매우 상세히 분석하거나, 현재 삶의 전반적인 흐름과 장애물을 짚어보고 싶을 때 가장 널리 쓰이는 스프레드입니다.',
    readingSteps: [
      { text: '1. 알고 싶은 상황이나 질문에 집중하며 카드를 섞습니다.' },
      { text: '2. 카드를 뒷면이 보이게 부채꼴로 넓게 펼친 후, 총 10장의 카드를 순서대로 십자가와 우측 세로 기둥 모양으로 배치합니다.' },
      { text: '1번 카드: 본인 / 질문과 관련된 현재 상황 (중앙에 놓음)', highlightPositionId: 1 },
      { text: '2번 카드: 장애물 혹은 보완 요소 (1번 카드 위에 가로질러 놓음)', highlightPositionId: 2 },
      { text: '3번 카드: 도달할 수 있는 최고의 목표/환경적 최선 (1번의 위)', highlightPositionId: 3 },
      { text: '4번 카드: 무의식적 기초 / 리딩을 하게 된 근본적 이유 (1번의 아래)', highlightPositionId: 4 },
      { text: '5번 카드: 과거의 영향 (1번의 왼쪽)', highlightPositionId: 5 },
      { text: '6번 카드: 가까운 미래 (1번의 오른쪽)', highlightPositionId: 6 },
      { text: '7번 카드: 본인의 현재 태도나 마음가짐 (우측 세로 열의 맨 아래)', highlightPositionId: 7 },
      { text: '8번 카드: 주변 환경 및 외적 영향력 (7번의 위)', highlightPositionId: 8 },
      { text: '9번 카드: 희망 혹은 두려움 (8번의 위)', highlightPositionId: 9 },
      { text: '10번 카드: 최종 결과 (9번의 위, 세로 열의 맨 꼭대기)', highlightPositionId: 10 }
    ],
    positions: [
      { id: 1, name: '현재 상황', meaning: '질문과 관련된 본인의 현재 상황을 상징합니다.' },
      { id: 2, name: '장애물/보완', meaning: '방해가 되는 장애물이나 상황을 보완할 수 있는 요소를 뜻합니다.' },
      { id: 3, name: '목표/최선', meaning: '현재 상황에서 도달할 수 있는 최고의 목표를 나타냅니다.' },
      { id: 4, name: '무의식', meaning: '질문의 바탕에 깔린 무의식이나 근본적 이유를 뜻합니다.' },
      { id: 5, name: '과거 영향', meaning: '현재에 영향을 미친 과거의 사건이나 영향을 나타냅니다.' },
      { id: 6, name: '가까운 미래', meaning: '조만간 맞이하게 될 가까운 미래를 상징합니다.' },
      { id: 7, name: '현재 태도', meaning: '문제를 대하는 질문자의 현재 태도나 마음가짐입니다.' },
      { id: 8, name: '주변 환경', meaning: '영향을 미치는 주변 환경 및 외부 영향력을 뜻합니다.' },
      { id: 9, name: '희망/두려움', meaning: '질문자가 내심 바라는 희망이나 두려워하는 것을 의미합니다.' },
      { id: 10, name: '최종 결과', meaning: '모든 요소가 결합하여 나타날 최종적인 결과를 상징합니다.' }
    ]
  },
  {
    id: 'choices',
    name: '양자택일',
    displayName: '양자\n택일',
    layout: '5-card',
    description: '두 가지 대안을 두고 선택을 고민하는 상황에 적합합니다.',
    readingSteps: [
      { text: '1. 알고 싶은 상황이나 질문에 집중하며 카드를 섞습니다.' },
      { text: '2. 총 5장의 카드를 뽑아 하단 중앙부터 V자 형태로 순서대로 배치합니다.' },
      { text: '1번 카드: 현재 (당신이 직면한 상황)', highlightPositionId: 1 },
      { text: '2번 카드: A 대안의 과정 (A를 선택했을 때의 진행 상황)', highlightPositionId: 2 },
      { text: '3번 카드: A 대안의 결말 (A를 따랐을 때의 결과)', highlightPositionId: 3 },
      { text: '4번 카드: B 대안의 과정 (B를 선택했을 때의 진행 상황)', highlightPositionId: 4 },
      { text: '5번 카드: B 대안의 결말 (B를 따랐을 때의 결과)', highlightPositionId: 5 }
    ],
    positions: [
      { id: 1, name: '현재', meaning: '현재 당신이 직면한 상황에 대한 조언입니다.' },
      { id: 2, name: 'A 과정', meaning: 'A안을 선택했을 때 진행 과정과 대안입니다.' },
      { id: 3, name: 'A 결과', meaning: 'A안을 따라갔을 때 맞이할 결말과 조언입니다.' },
      { id: 4, name: 'B 과정', meaning: 'B안을 선택했을 때 진행 과정과 대안입니다.' },
      { id: 5, name: 'B 결과', meaning: 'B안을 따라갔을 때 맞이할 결말과 조언입니다.' }
    ]
  },
  {
    id: 'love',
    name: '연애운',
    displayName: '연애운',
    layout: 'love-cross',
    description: '특정 상대와의 관계 흐름 및 서로의 성향을 파악하고자 하는 상황에 적합합니다.',
    readingSteps: [
      { text: '1. 알고 싶은 상황이나 질문에 집중하며 카드를 섞습니다.' },
      { text: '2. 5장의 카드를 뽑아 십자가 형태로 구도에 맞게 배치합니다.' },
      { text: '1번 카드: 나와 상대의 과거 (관계의 배경)', highlightPositionId: 1 },
      { text: '2번 카드: 나의 성격 (내가 관계에서 보여주는 모습)', highlightPositionId: 2 },
      { text: '3번 카드: 나와 상대의 미래 (앞으로의 흐름)', highlightPositionId: 3 },
      { text: '4번 카드: 상대의 성격 (상대방이 관계에서 보여주는 모습)', highlightPositionId: 4 },
      { text: '5번 카드: 나와 상대의 현재 (현재 관계의 핵심 상태)', highlightPositionId: 5 }
    ],
    positions: [
      { id: 1, name: '과거', meaning: '나와 상대의 과거 관계나 연결고리입니다.' },
      { id: 2, name: '나의 성격', meaning: '내가 이 관계에서 보여주거나 느끼는 성격/상태입니다.' },
      { id: 3, name: '미래', meaning: '두 사람의 향후 관계 발전 방향입니다.' },
      { id: 4, name: '상대 성격', meaning: '상대방이 이 관계에서 보여주거나 느끼는 성격/상태입니다.' },
      { id: 5, name: '현재', meaning: '두 사람의 현재 관계 핵심 상황입니다.' }
    ]
  },
  {
    id: 'yearly',
    name: '1년 운세',
    displayName: '1년\n운세',
    layout: 'yearly-layout',
    description: '앞으로 다가올 12개월의 흐름을 시계 방향으로 배열하여 한눈에 파악하는 방법입니다.',
    readingSteps: [
      { text: '1. 전체 카드를 셔플하기 전, 한 해의 전반적인 분위기를 나타낼 시그니피케이터 카드를 뽑아 중앙에 내려놓습니다.', highlightPositionId: 1 },
      { text: '2. 남은 카드를 셔플하고, 현재 달부터 시작하여 시계 방향으로 매월 한 장씩 순서대로 카드를 배열합니다.' },
      { text: '3. 1시 방향: 현재 달의 운세', highlightPositionId: 2 },
      { text: '4. 2시 방향: 1개월 후의 운세', highlightPositionId: 3 },
      { text: '5. 시계 방향을 따라 12개월 전체의 흐름을 차례로 해석합니다.' }
    ],
    positions: [
      { id: 1, name: 'Significator', meaning: '그 해에 흐르는 전반적인 테마와 핵심 운세를 정의합니다.' },
      { id: 2, name: '현재 달', meaning: '현재 달에 겪게 될 주요 변화나 운세의 흐름입니다.' },
      { id: 3, name: '1개월 후', meaning: '다음 달에 겪게 될 주요 변화나 운세의 흐름입니다.' },
      { id: 4, name: '2개월 후', meaning: '2개월 후에 겪게 될 운세의 흐름입니다.' },
      { id: 5, name: '3개월 후', meaning: '3개월 후에 겪게 될 운세의 흐름입니다.' },
      { id: 6, name: '4개월 후', meaning: '4개월 후에 겪게 될 운세의 흐름입니다.' },
      { id: 7, name: '5개월 후', meaning: '5개월 후에 겪게 될 운세의 흐름입니다.' },
      { id: 8, name: '6개월 후', meaning: '6개월 후에 겪게 될 운세의 흐름입니다.' },
      { id: 9, name: '7개월 후', meaning: '7개월 후에 겪게 될 운세의 흐름입니다.' },
      { id: 10, name: '8개월 후', meaning: '8개월 후에 겪게 될 운세의 흐름입니다.' },
      { id: 11, name: '9개월 후', meaning: '9개월 후에 겪게 될 운세의 흐름입니다.' },
      { id: 12, name: '10개월 후', meaning: '10개월 후에 겪게 될 운세의 흐름입니다.' },
      { id: 13, name: '11개월 후', meaning: '11개월 후에 겪게 될 운세의 흐름입니다.' }
    ]
  },
  {
    id: 'monthly',
    name: '1달 운세',
    displayName: '1달\n운세',
    layout: 'monthly-layout',
    description: '향후 4주일 동안 나에게 미칠 영향력과 흐름을 확인하는 방법입니다.',
    readingSteps: [
      { text: '1. 알고 싶은 상황이나 질문에 집중하며 카드를 섞습니다.' },
      { text: '2. 1주마다 2장의 카드를 배치하여 총 8장의 카드로 4주간의 운세를 리딩합니다.' },
      { text: '1주차 흐름 (카드 1, 2)', highlightPositionId: 1 },
      { text: '2주차 흐름 (카드 3, 4)', highlightPositionId: 3 },
      { text: '3주차 흐름 (카드 5, 6)', highlightPositionId: 5 },
      { text: '4주차 흐름 (카드 7, 8)', highlightPositionId: 7 }
    ],
    positions: [
      { id: 1, name: '1주', meaning: '첫 번째 주의 주요 흐름과 조언입니다.' },
      { id: 2, name: '1주', meaning: '첫 번째 주의 보완적인 의미를 나타냅니다.' },
      { id: 3, name: '2주', meaning: '두 번째 주의 주요 흐름과 조언입니다.' },
      { id: 4, name: '2주', meaning: '두 번째 주의 보완적인 의미를 나타냅니다.' },
      { id: 5, name: '3주', meaning: '세 번째 주의 주요 흐름과 조언입니다.' },
      { id: 6, name: '3주', meaning: '세 번째 주의 보완적인 의미를 나타냅니다.' },
      { id: 7, name: '4주', meaning: '네 번째 주의 주요 흐름과 조언입니다.' },
      { id: 8, name: '4주', meaning: '네 번째 주의 보완적인 의미를 나타냅니다.' }
    ]
  },
  {
    id: 'weekly',
    name: '1주일 운세',
    displayName: '1주일\n운세',
    layout: 'weekly-layout',
    description: '한 주간의 매일의 운세를 살펴보는 방법입니다.',
    readingSteps: [
      { text: '1. 전체 분위기를 볼 Significator 카드를 뽑아 중앙에 위치합니다.', highlightPositionId: 1 },
      { text: '2. 그 주변으로 각 요일에 해당하는 카드를 정해진 위치에 따라 배치합니다.' },
      { text: '월요일 운세', highlightPositionId: 2 },
      { text: '화요일 운세', highlightPositionId: 3 },
      { text: '수요일 운세', highlightPositionId: 4 },
      { text: '목요일 운세', highlightPositionId: 5 },
      { text: '금요일 운세', highlightPositionId: 6 },
      { text: '토요일 운세', highlightPositionId: 7 },
      { text: '일요일 운세', highlightPositionId: 8 }
    ],
    positions: [
      { id: 1, name: '주간 흐름', meaning: '이번 주 당신에게 다가올 주요 사건과 에너지의 흐름입니다.' },
      { id: 2, name: '월', meaning: '월요일의 운세와 흐름입니다.' },
      { id: 3, name: '화', meaning: '화요일의 운세와 흐름입니다.' },
      { id: 4, name: '수', meaning: '수요일의 운세와 흐름입니다.' },
      { id: 5, name: '목', meaning: '목요일의 운세와 흐름입니다.' },
      { id: 6, name: '금', meaning: '금요일의 운세와 흐름입니다.' },
      { id: 7, name: '토', meaning: '토요일의 운세와 흐름입니다.' },
      { id: 8, name: '일', meaning: '일요일의 운세와 흐름입니다.' }
    ]
  }
];

export const SpreadGuideTab: React.FC = () => {
  const [tabState, setTabState] = useState<'selection' | 'reading'>('selection');
  const [previewSpread, setPreviewSpread] = useState<SpreadDef | null>(null);
  
  const [activeSpread, setActiveSpread] = useState<SpreadDef | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const handlePreviewSpread = (spread: SpreadDef) => {
    setPreviewSpread(spread);
  };

  const handleStartReading = () => {
    if (previewSpread) {
      setActiveSpread(previewSpread);
      setCurrentStepIndex(0);
      setTabState('reading');
    }
  };

  const handleBackToSelection = () => {
    setTabState('selection');
    setActiveSpread(null);
  };

  const handleNextStep = () => {
    if (activeSpread && currentStepIndex < activeSpread.readingSteps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
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
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 pb-8">
          {/* Top Row: 4 cards */}
          <div className="flex justify-center gap-2 mb-3 w-full">
            {SPREADS.slice(0, 4).map((spread) => (
              <button
                key={spread.id}
                onClick={() => handlePreviewSpread(spread)}
                className={`w-[45px] aspect-[60/96] border flex items-center justify-center transition-colors ${
                  previewSpread?.id === spread.id ? 'bg-white text-black font-bold border-white' : 'border-white bg-black hover:bg-white/20 text-white'
                }`}
              >
                <span className="text-[9px] whitespace-pre-line text-center leading-[1.1]">
                  {spread.displayName}
                </span>
              </button>
            ))}
          </div>
          {/* Bottom Row: 5 cards */}
          <div className="flex justify-center gap-1.5 w-full">
            {SPREADS.slice(4, 9).map((spread) => (
              <button
                key={spread.id}
                onClick={() => handlePreviewSpread(spread)}
                className={`w-[45px] aspect-[60/96] border flex items-center justify-center transition-colors ${
                  previewSpread?.id === spread.id ? 'bg-white text-black font-bold border-white' : 'border-white bg-black hover:bg-white/20 text-white'
                }`}
              >
                <span className="text-[9px] whitespace-pre-line text-center leading-[1.1]">
                  {spread.displayName}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full max-w-[340px] mt-6">
        <div className="border border-white p-1 bg-black">
          <div className="border border-white py-6 px-5 text-center min-h-[145px] flex flex-col justify-between items-center relative">
            {previewSpread ? (
              <div className="flex-1 flex flex-col justify-between items-center w-full">
                <p className="text-white text-[12px] leading-relaxed mb-6 whitespace-pre-line break-keep">
                  {previewSpread.description}
                </p>
                <button 
                  onClick={handleStartReading}
                  className="bg-white text-black font-bold py-2.5 px-8 text-[14px] hover:bg-[#ddd] transition-colors w-full border border-transparent"
                >
                  [운세 보기]
                </button>
              </div>
            ) : (
              <div className="flex-1 flex flex-col justify-center items-center w-full">
                <p className="text-white/50 text-[12px]">스프레드를 선택해주세요</p>
              </div>
            )}
            {!previewSpread && (
              <span className="text-white block pulsing-arrow mt-4 absolute bottom-4">▽</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderDetailLayout = (spread: SpreadDef, highlightId: number) => {
    const getCardStyle = (posId: number, widthClass: string = 'w-[63px]') => {
      const isSelected = highlightId === posId;
      return `${widthClass} aspect-[60/96] border-[1px] transition-all flex flex-col items-center justify-center p-1 relative select-none ${
        isSelected ? 'border-[#ffd700] bg-[#111] z-10 shadow-[0_0_8px_rgba(255,215,0,0.5)]' : 'border-white/50 bg-black'
      }`;
    };

    if (spread.layout === '1-card') {
      const pos = spread.positions[0];
      return (
        <div className="flex justify-center mt-16">
          <div className={getCardStyle(pos.id)}>
            <span className="text-white text-[12px] whitespace-pre-line text-center">{pos.name}</span>
          </div>
        </div>
      );
    }

    if (spread.layout === '3-card') {
      return (
        <div className="flex justify-center gap-3 mt-16">
          {spread.positions.map((pos) => (
            <div key={pos.id} className={getCardStyle(pos.id)}>
              <span className="text-white text-[12px] whitespace-pre-line text-center">{pos.name}</span>
            </div>
          ))}
        </div>
      );
    }

    if (spread.layout === '4-card') {
      return (
        <div className="flex flex-col items-center gap-4 mt-8">
          <div className={getCardStyle(1)}>
            <span className="text-white text-[12px] whitespace-pre-line text-center">{spread.positions[0].name}</span>
          </div>
          <div className="flex justify-center gap-3">
            {spread.positions.slice(1, 4).map((pos) => (
              <div key={pos.id} className={getCardStyle(pos.id)}>
                <span className="text-white text-[12px] whitespace-pre-line text-center">{pos.name}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (spread.layout === '5-card') {
      return (
        <div className="flex flex-col items-center gap-2 mt-4 relative h-[300px]">
          {/* pos 1 (Center bottom) */}
          <div className="absolute bottom-4" style={{ left: '50%', transform: 'translateX(-50%)' }}>
             <div className={getCardStyle(1)}>
                <span className="text-white text-[12px] whitespace-pre-line text-center">{spread.positions[0].name}</span>
             </div>
          </div>
          {/* pos 2 & 4 (Middle) */}
          <div className="absolute bottom-28" style={{ left: '20%' }}>
             <div className={getCardStyle(2)}>
                <span className="text-white text-[12px] whitespace-pre-line text-center">{spread.positions[1].name}</span>
             </div>
          </div>
          <div className="absolute bottom-28" style={{ right: '20%' }}>
             <div className={getCardStyle(4)}>
                <span className="text-white text-[12px] whitespace-pre-line text-center">{spread.positions[3].name}</span>
             </div>
          </div>
          {/* pos 3 & 5 (Top) */}
          <div className="absolute top-4" style={{ left: '10%' }}>
             <div className={getCardStyle(3)}>
                <span className="text-white text-[12px] whitespace-pre-line text-center">{spread.positions[2].name}</span>
             </div>
          </div>
          <div className="absolute top-4" style={{ right: '10%' }}>
             <div className={getCardStyle(5)}>
                <span className="text-white text-[12px] whitespace-pre-line text-center">{spread.positions[4].name}</span>
             </div>
          </div>
        </div>
      );
    }

    if (spread.layout === 'monthly-layout') {
      return (
        <div className="w-full flex flex-col items-center gap-2 mt-4 max-w-[340px] mx-auto">
          {/* 4 rows, 2 cards each */}
          {[0, 1, 2, 3].map(row => (
            <div key={`row-${row}`} className="flex justify-center gap-8 w-full border-b border-white/10 pb-2 mb-2 last:border-0">
               <div className="flex flex-col items-center gap-1">
                 <div className={getCardStyle(row * 2 + 1, 'w-[50px]')}>
                    <span className="text-white text-[10px] whitespace-pre-line text-center leading-tight">{spread.positions[row * 2].name}</span>
                 </div>
               </div>
               <div className="flex flex-col items-center gap-1">
                 <div className={getCardStyle(row * 2 + 2, 'w-[50px]')}>
                    <span className="text-white text-[10px] whitespace-pre-line text-center leading-tight">{spread.positions[row * 2 + 1].name}</span>
                 </div>
               </div>
            </div>
          ))}
        </div>
      );
    }

    if (spread.layout === 'love-cross') {
      return (
        <div className="relative w-full h-[320px] mt-4 flex items-center justify-center max-w-[340px] mx-auto">
          {/* pos 5 (Center) */}
          <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
             <div className={getCardStyle(5)}>
                <span className="text-white text-[12px] whitespace-pre-line text-center">{spread.positions[4].name}</span>
             </div>
          </div>
          {/* pos 1 (Left) */}
          <div style={{ position: 'absolute', left: '15%', top: '50%', transform: 'translateY(-50%)' }}>
             <div className={getCardStyle(1)}>
                <span className="text-white text-[12px] whitespace-pre-line text-center">{spread.positions[0].name}</span>
             </div>
          </div>
          {/* pos 3 (Right) */}
          <div style={{ position: 'absolute', right: '15%', top: '50%', transform: 'translateY(-50%)' }}>
             <div className={getCardStyle(3)}>
                <span className="text-white text-[12px] whitespace-pre-line text-center">{spread.positions[2].name}</span>
             </div>
          </div>
          {/* pos 2 (Top) */}
          <div style={{ position: 'absolute', left: '50%', top: '10%', transform: 'translateX(-50%)' }}>
             <div className={getCardStyle(2)}>
                <span className="text-white text-[12px] whitespace-pre-line text-center">{spread.positions[1].name}</span>
             </div>
          </div>
          {/* pos 4 (Bottom) */}
          <div style={{ position: 'absolute', left: '50%', bottom: '10%', transform: 'translateX(-50%)' }}>
             <div className={getCardStyle(4)}>
                <span className="text-white text-[12px] whitespace-pre-line text-center">{spread.positions[3].name}</span>
             </div>
          </div>
        </div>
      );
    }

    if (spread.layout === 'celtic-cross') {
      return (
        <div className="relative w-full h-[350px] mt-2 flex items-center justify-center max-w-[340px] mx-auto">
          {/* pos 1 (Center) */}
          <div style={{ position: 'absolute', left: '35%', top: '50%', transform: 'translate(-50%, -50%)' }}>
             <div className={getCardStyle(1, 'w-[42px]')}>
                <span className="text-white text-[8px] whitespace-pre-line text-center leading-tight">{spread.positions[0].name}</span>
             </div>
          </div>
          {/* pos 2 (Across 1) */}
          <div style={{ position: 'absolute', left: '35%', top: '50%', transform: 'translate(-50%, -50%) rotate(90deg)' }}>
             <div className={getCardStyle(2, 'w-[42px]')}>
                <span className="text-white text-[8px] whitespace-pre-line text-center leading-tight">{spread.positions[1].name}</span>
             </div>
          </div>
          {/* pos 3 (Top) */}
          <div style={{ position: 'absolute', left: '35%', top: '15%', transform: 'translate(-50%, -50%)' }}>
             <div className={getCardStyle(3, 'w-[42px]')}>
                <span className="text-white text-[8px] whitespace-pre-line text-center leading-tight">{spread.positions[2].name}</span>
             </div>
          </div>
          {/* pos 4 (Bottom) */}
          <div style={{ position: 'absolute', left: '35%', bottom: '15%', transform: 'translate(-50%, 50%)' }}>
             <div className={getCardStyle(4, 'w-[42px]')}>
                <span className="text-white text-[8px] whitespace-pre-line text-center leading-tight">{spread.positions[3].name}</span>
             </div>
          </div>
          {/* pos 5 (Left) */}
          <div style={{ position: 'absolute', left: '10%', top: '50%', transform: 'translate(-50%, -50%)' }}>
             <div className={getCardStyle(5, 'w-[42px]')}>
                <span className="text-white text-[8px] whitespace-pre-line text-center leading-tight">{spread.positions[4].name}</span>
             </div>
          </div>
          {/* pos 6 (Right) */}
          <div style={{ position: 'absolute', left: '60%', top: '50%', transform: 'translate(-50%, -50%)' }}>
             <div className={getCardStyle(6, 'w-[42px]')}>
                <span className="text-white text-[8px] whitespace-pre-line text-center leading-tight">{spread.positions[5].name}</span>
             </div>
          </div>

          {/* Right Column: 7, 8, 9, 10 */}
          <div style={{ position: 'absolute', left: '90%', bottom: '10%', transform: 'translate(-50%, 50%)' }}>
             <div className={getCardStyle(7, 'w-[42px]')}>
                <span className="text-white text-[8px] whitespace-pre-line text-center leading-tight">{spread.positions[6].name}</span>
             </div>
          </div>
          <div style={{ position: 'absolute', left: '90%', bottom: '38%', transform: 'translate(-50%, 50%)' }}>
             <div className={getCardStyle(8, 'w-[42px]')}>
                <span className="text-white text-[8px] whitespace-pre-line text-center leading-tight">{spread.positions[7].name}</span>
             </div>
          </div>
          <div style={{ position: 'absolute', left: '90%', top: '38%', transform: 'translate(-50%, -50%)' }}>
             <div className={getCardStyle(9, 'w-[42px]')}>
                <span className="text-white text-[8px] whitespace-pre-line text-center leading-tight">{spread.positions[8].name}</span>
             </div>
          </div>
          <div style={{ position: 'absolute', left: '90%', top: '10%', transform: 'translate(-50%, -50%)' }}>
            <div className={getCardStyle(10, 'w-[42px]')}>
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
             <div className={getCardStyle(1, 'w-[48px]')}>
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
                 <div className={getCardStyle(pos.id, 'w-[45px]')}>
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
             <div className={getCardStyle(1, 'w-[45px]')}>
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
                 <div className={getCardStyle(pos.id, 'w-[36px]')}>
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
        <div className={getCardStyle(1)}>
          <span className="text-white text-[12px] text-center">{pos.name}</span>
        </div>
      </div>
    );
  };

  const renderDetailView = (spread: SpreadDef) => {
    const currentStep = spread.readingSteps[currentStepIndex];
    const highlightId = currentStep?.highlightPositionId || -1;
    const isFirstStep = currentStepIndex === 0;
    const isLastStep = currentStepIndex === spread.readingSteps.length - 1;

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
            onClick={handleBackToSelection}
            className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
          >
            <img src={`${import.meta.env.BASE_URL}icon/back.png`} alt="Back" className="w-5 h-5 object-contain" />
            <span className="text-[14px]">돌아가기</span>
          </button>
          <span className="text-white font-bold text-[14px] ml-auto">{spread.name}</span>
        </div>

        {/* Dynamic Spread Arena */}
        <div className="flex-1 w-full max-w-sm mx-auto min-h-[300px]">
          {renderDetailLayout(spread, highlightId)}
        </div>

        {/* Bottom Dialogue Box */}
        <div className="w-full px-2 mt-auto pb-4 pt-6">
          <div className="border border-white p-1 bg-black">
            <div className="border border-white py-5 px-4 text-center min-h-[145px] flex flex-col justify-between">
              
              <div className="flex-1 flex flex-col justify-center items-center">
                <p className="text-[#ffd700] text-[13px] font-bold mb-3">Step {currentStepIndex + 1}</p>
                <p className="text-white/90 leading-relaxed text-[13px] whitespace-pre-line max-w-[280px]">
                  {currentStep?.text}
                </p>
                {highlightId !== -1 && (
                  <p className="text-white/60 text-[11px] mt-3">
                    ({spread.positions.find(p => p.id === highlightId)?.meaning})
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center mt-5 pt-4 border-t border-white/20">
                <button 
                  onClick={handlePrevStep}
                  disabled={isFirstStep}
                  className={`px-4 py-2 text-[12px] transition-colors border ${isFirstStep ? 'text-white/30 border-transparent cursor-not-allowed' : 'text-white border-white/30 hover:bg-white/10'}`}
                >
                  ◀ 이전
                </button>
                <span className="text-white/40 text-[11px] font-mono">
                  {currentStepIndex + 1} / {spread.readingSteps.length}
                </span>
                <button 
                  onClick={handleNextStep}
                  disabled={isLastStep}
                  className={`px-4 py-2 text-[12px] transition-colors border ${isLastStep ? 'text-white/30 border-transparent cursor-not-allowed' : 'text-[#ffd700] border-[#ffd700]/50 hover:bg-[#ffd700]/10'}`}
                >
                  다음 ▶
                </button>
              </div>

            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="flex-1 flex flex-col items-center px-6 py-4 min-h-[580px] text-white bg-black w-full overflow-y-auto custom-scrollbar">
      <AnimatePresence mode="wait">
        {tabState === 'selection' ? renderTableSelection() : activeSpread ? renderDetailView(activeSpread) : null}
      </AnimatePresence>
    </div>
  );
};
