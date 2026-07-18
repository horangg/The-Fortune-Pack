import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Typewriter } from './Typewriter';
import { TAROT_CARDS } from '../data/tarotData';
import { TarotCard } from '../types';

interface PositionDef {
  id: number;
  name: string;
  meaning: string;
}

interface ReadingStep {
  text: string;
  highlightPositionId?: number;
  stepLabel?: string;
  subText?: string;
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
    displayName: '원\n카드',
    layout: '1-card',
    description: '데일리 리딩이나 빠르고 직관적인 조언이 필요할 때 사용합니다.\n예/아니오 보다는 구체적인 질문에 적합합니다.',
    readingSteps: [
      { stepLabel: 'Step 1', text: '알고 싶은 상황이나 질문에 집중하며 카드를 섞습니다.' },
      { stepLabel: 'Step 2', text: '카드를 뒷면이 보이게 부채꼴로 넓게 펼친 후, 주로 사용하지 않는 손으로 카드를 뽑습니다.' },
      { stepLabel: 'Step 3', text: '카드를 뒤집을 때는 반드시 왼쪽에서 오른쪽 방향으로 뒤집습니다.', highlightPositionId: 1 }
    ],
    positions: [
      { id: 1, name: '결과', meaning: '질문에 대한 직접적인 답변이나 조언을 상징합니다.' }
    ]
  },
  {
    id: 'past-present-future',
    name: '과거, 현재, 미래',
    displayName: '과거\n현재\n미래',
    layout: '3-card',
    description: '미니 리딩이나 전반적인 상황 흐름을\n빠르게 파악하고 싶을 때 적합합니다.',
    readingSteps: [
      { stepLabel: 'Step 1', text: '알고 싶은 상황이나 질문에 집중하며 카드를 섞습니다.' },
      { stepLabel: 'Step 2', text: '카드를 뒷면이 보이게 부채꼴로 넓게 펼친 후, 주로 사용하지 않는 손으로 카드를 뽑습니다.' },
      { stepLabel: 'Step 3', text: '가로로 세 장의 카드를 순서대로 놓습니다. 카드를 뒤집을 때는 반드시 왼쪽에서 오른쪽 방향으로 뒤집습니다.' },
      { stepLabel: 'Step 3', text: '과거. 최근에 일어났던 일이나 발생한 사건, 배경을 상징합니다.', highlightPositionId: 1 },
      { stepLabel: 'Step 3', text: '현재. 질문자가 현재 처한 상황이나 느끼고 있는 상태를 보여줍니다.', highlightPositionId: 2 },
      { stepLabel: 'Step 3', text: '미래. 앞으로 가까운 미래에 전개될 상황이나 다가올 주요 영향력을 나타냅니다.', highlightPositionId: 3 },
      { stepLabel: 'Step 4', text: '(조언을 더 얻고 싶다면 각 카드 아래에 추가 카드를 한 장씩 더 배치해 총 6장으로 리딩할 수도 있습니다.)' }
    ],
    positions: [
      { id: 1, name: '과거', meaning: '최근에 일어났던 일이나 발생한 사건, 배경을 상징합니다.' },
      { id: 2, name: '현재', meaning: '질문자가 현재 처한 상황이나 느끼고 있는 상태를 보여줍니다.' },
      { id: 3, name: '미래', meaning: '앞으로 가까운 미래에 전개될 상황이나 다가올 주요 영향력을 나타냅니다.' }
    ]
  },
  {
    id: 'yesno',
    name: 'Yes or No',
    displayName: 'Yes\nNo',
    layout: '3-card',
    description: '빠르게 명확한 결정을\n내리고 싶을 때 적합합니다.',
    readingSteps: [
      { stepLabel: 'Step 1', text: '알고 싶은 상황이나 질문에 집중하며 카드를 섞습니다.' },
      { stepLabel: 'Step 2', text: '카드를 뒷면이 보이게 부채꼴로 넓게 펼친 후, 주로 사용하지 않는 손으로 카드를 뽑습니다.' },
      { stepLabel: 'Step 3', text: '질문을 마음 속으로 생각하며 세 장의 카드를 뽑아 순서대로 놓습니다. 카드를 뒤집을 때는 반드시 왼쪽에서 오른쪽 방향으로 뒤집습니다.' },
      { stepLabel: 'Step 4', text: '뽑힌 카드의 긍정/부정/중립 여부를 확인합니다.', subText: '*숫자코드를 입력해 확인하세요.' },
      { stepLabel: 'Step 5', text: '3장이 모두 Yes면 확실한 긍정,\n2장이 Yes면 긍정적이나 시간이 걸릴 수 있음,\nNo가 많다면 부정적인 결론에 가깝습니다.\n*역방향은 무조건 No로 해석합니다.' }
    ],
    positions: [
      { id: 1, name: '?', meaning: '' },
      { id: 2, name: '?', meaning: '' },
      { id: 3, name: '?', meaning: '' }
    ]
  },
  {
    id: 'celtic-cross',
    name: '켈틱 크로스 (The Celtic Cross)',
    displayName: '자세한\n해석',
    layout: 'celtic-cross',
    description: '질문에 대해 상세히 분석하거나,\n전반적인 흐름과 장애물을 짚어보고 싶을 때 적합합니다.',
    readingSteps: [
      { stepLabel: 'Step 1', text: '알고 싶은 상황이나 질문에 집중하며 카드를 섞습니다.' },
      { stepLabel: 'Step 2', text: '카드를 뒷면이 보이게 부채꼴로 넓게 펼친 후, 주로 사용하지 않는 손으로 카드를 뽑습니다.' },
      { stepLabel: 'Step 3', text: '총 10장의 카드를 순서대로 십자가와 우측 세로 기둥 모양으로 배치합니다. 카드를 뒤집을 때는 반드시 왼쪽에서 오른쪽 방향으로 뒤집습니다.' },
      { stepLabel: 'Step 3', text: '1 현재', highlightPositionId: 1 },
      { stepLabel: 'Step 3', text: '2 장애물, 과제', highlightPositionId: 2 },
      { stepLabel: 'Step 3', text: '3 무의식', highlightPositionId: 3 },
      { stepLabel: 'Step 3', text: '4 과거', highlightPositionId: 4 },
      { stepLabel: 'Step 3', text: '5 목표, 가능성', highlightPositionId: 5 },
      { stepLabel: 'Step 3', text: '6 가까운 미래', highlightPositionId: 6 },
      { stepLabel: 'Step 3', text: '7 태도', highlightPositionId: 7 },
      { stepLabel: 'Step 3', text: '8 외부 영향', highlightPositionId: 8 },
      { stepLabel: 'Step 3', text: '9 희망/두려움', highlightPositionId: 9 },
      { stepLabel: 'Step 3', text: '10 결과', highlightPositionId: 10 }
    ],
    positions: [
      { id: 1, name: '1', meaning: '메인 이슈와 그를 둘러싼 전반적인 상황' },
      { id: 2, name: '2', meaning: '목표를 달성하는 과정에서 가로막고 있는 주요 장애물, 도전 과제, 혹은 보완해야 할 요소' },
      { id: 3, name: '3', meaning: '질문자가 처한 현재의 구체적인 상황이나 마음가짐, 혹은 이 리딩을 하게 만든 무의식적 배경' },
      { id: 4, name: '4', meaning: '현재의 이슈와 직접적으로 연결된 최근의 사건이나 핵심적인 과거의 흐름' },
      { id: 5, name: '5', meaning: '주어진 상황에서 도달할 수 있는 환경적인 최선이나 최고의 목표, 혹은 다가올 중간 단계의 흐름' },
      { id: 6, name: '6', meaning: '곧 맞이하게 될 다가오는 변화, 가까운 미래' },
      { id: 7, name: '7', meaning: '이 상황을 대하는 질문자 본인의 내면적 태도, 마음가짐, 정신 상태, 혹은 본인의 강점과 약점' },
      { id: 8, name: '8', meaning: '외부 환경이 메인 이슈에 미치는 영향력' },
      { id: 9, name: '9', meaning: '내면의 긍정적인 기대와 변화에 대한 자신감, 혹은 스스로를 제약하고 주저하게 만드는 심리적 요인' },
      { id: 10, name: '10', meaning: '현재의 흐름이 이어졌을 때 맞이하게 될 가장 유력한 최종 결과물' }
    ]
  },
  {
    id: 'choices',
    name: '양자택일',
    displayName: '양자\n택일',
    layout: '5-card',
    description: '두 가지 선택지 사이에서\n고민하는 상황에 적합합니다.',
    readingSteps: [
      { text: '알고 싶은 상황이나 질문에 집중하며 카드를 섞습니다.' },
      { text: '카드를 뒷면이 보이게 부채꼴로 넓게 펼친 후, 주로 사용하지 않는 손으로 카드를 뽑습니다.' },
      { text: '총 5장의 카드를 순서대로 배치합니다. 카드를 뒤집을 때는 반드시 왼쪽에서 오른쪽 방향으로 뒤집습니다.' }
    ],
    positions: [
      { id: 1, name: '1번 카드', meaning: '총 5장의 카드를 순서대로 배치합니다.' },
      { id: 2, name: '2번 카드', meaning: '총 5장의 카드를 순서대로 배치합니다.' },
      { id: 3, name: '3번 카드', meaning: '총 5장의 카드를 순서대로 배치합니다.' },
      { id: 4, name: '4번 카드', meaning: '총 5장의 카드를 순서대로 배치합니다.' },
      { id: 5, name: '5번 카드', meaning: '총 5장의 카드를 순서대로 배치합니다.' }
    ]
  },
  {
    id: 'love',
    name: '연애운',
    displayName: '연애운',
    layout: 'love-cross',
    description: '상대방의 마음을 읽거나\n관계의 흐름을 파악하고자 할 때 적합합니다.',
    readingSteps: [
      { text: '알고 싶은 상황이나 질문에 집중하며 카드를 섞습니다.' },
      { text: '카드를 뒷면이 보이게 부채꼴로 넓게 펼친 후, 주로 사용하지 않는 손으로 카드를 뽑습니다.' },
      { text: '5장의 카드를 뽑아 구도에 맞게 배치합니다. 카드를 뒤집을 때는 반드시 왼쪽에서 오른쪽 방향으로 뒤집습니다.' }
    ],
    positions: [
      { id: 1, name: '1번 카드', meaning: '5장의 카드를 뽑아 구도에 맞게 배치합니다.' },
      { id: 2, name: '2번 카드', meaning: '5장의 카드를 뽑아 구도에 맞게 배치합니다.' },
      { id: 3, name: '3번 카드', meaning: '5장의 카드를 뽑아 구도에 맞게 배치합니다.' },
      { id: 4, name: '4번 카드', meaning: '5장의 카드를 뽑아 구도에 맞게 배치합니다.' },
      { id: 5, name: '5번 카드', meaning: '5장의 카드를 뽑아 구도에 맞게 배치합니다.' }
    ]
  },
  {
    id: 'yearly',
    name: '1년 운세',
    displayName: '1년\n운세',
    layout: 'yearly-layout',
    description: '앞으로 다가올 1년 동안의\n흐름을 파악하고 싶을 때 적합합니다.',
    readingSteps: [
      { text: '알고 싶은 상황이나 질문에 집중하며 카드를 섞습니다.' },
      { text: '카드를 뒷면이 보이게 부채꼴로 넓게 펼친 후, 주로 사용하지 않는 손으로 카드를 뽑습니다.' },
      { text: '리딩의 기준이 되는 시그니피케이터 카드를 가장 먼저 중앙에 놓습니다.', highlightPositionId: 1 },
      { text: '현재 월 부터 시작하여 시계 방향으로 순서대로 카드를 놓습니다. 각 카드는 해당 월의 운세와 영향을 나타냅니다. 카드를 뒤집을 때는 반드시 왼쪽에서 오른쪽 방향으로 뒤집습니다.' }
    ],
    positions: [
      { id: 1, name: '중앙', meaning: '리딩의 기준이 되는 시그니피케이터 카드를 가장 먼저 중앙에 놓습니다.' },
      { id: 2, name: '현재 월', meaning: '각 카드는 해당 월의 운세와 영향을 나타냅니다.' },
      { id: 3, name: '1개월 후', meaning: '각 카드는 해당 월의 운세와 영향을 나타냅니다.' },
      { id: 4, name: '2개월 후', meaning: '각 카드는 해당 월의 운세와 영향을 나타냅니다.' },
      { id: 5, name: '3개월 후', meaning: '각 카드는 해당 월의 운세와 영향을 나타냅니다.' },
      { id: 6, name: '4개월 후', meaning: '각 카드는 해당 월의 운세와 영향을 나타냅니다.' },
      { id: 7, name: '5개월 후', meaning: '각 카드는 해당 월의 운세와 영향을 나타냅니다.' },
      { id: 8, name: '6개월 후', meaning: '각 카드는 해당 월의 운세와 영향을 나타냅니다.' },
      { id: 9, name: '7개월 후', meaning: '각 카드는 해당 월의 운세와 영향을 나타냅니다.' },
      { id: 10, name: '8개월 후', meaning: '각 카드는 해당 월의 운세와 영향을 나타냅니다.' },
      { id: 11, name: '9개월 후', meaning: '각 카드는 해당 월의 운세와 영향을 나타냅니다.' },
      { id: 12, name: '10개월 후', meaning: '각 카드는 해당 월의 운세와 영향을 나타냅니다.' },
      { id: 13, name: '11개월 후', meaning: '각 카드는 해당 월의 운세와 영향을 나타냅니다.' }
    ]
  },
  {
    id: 'monthly',
    name: '1달 운세',
    displayName: '1달\n운세',
    layout: 'monthly-layout',
    description: '향후 4주일 동안 나에게 미칠\n영향력과 흐름을 확인하고 싶을 때 적합합니다.',
    readingSteps: [
      { text: '알고 싶은 상황이나 질문에 집중하며 카드를 섞습니다.' },
      { text: '카드를 뒷면이 보이게 부채꼴로 넓게 펼친 후, 주로 사용하지 않는 손으로 카드를 뽑습니다.' },
      { text: '1주마다 2장의 카드를 배치하여 총 8장의 카드로 4주간의 운세를 리딩합니다. 카드를 뒤집을 때는 반드시 왼쪽에서 오른쪽 방향으로 뒤집습니다.' }
    ],
    positions: [
      { id: 1, name: '1주차', meaning: '1주마다 2장의 카드를 배치하여 총 8장의 카드로 4주간의 운세를 리딩합니다.' },
      { id: 2, name: '1주차', meaning: '1주마다 2장의 카드를 배치하여 총 8장의 카드로 4주간의 운세를 리딩합니다.' },
      { id: 3, name: '2주차', meaning: '1주마다 2장의 카드를 배치하여 총 8장의 카드로 4주간의 운세를 리딩합니다.' },
      { id: 4, name: '2주차', meaning: '1주마다 2장의 카드를 배치하여 총 8장의 카드로 4주간의 운세를 리딩합니다.' },
      { id: 5, name: '3주차', meaning: '1주마다 2장의 카드를 배치하여 총 8장의 카드로 4주간의 운세를 리딩합니다.' },
      { id: 6, name: '3주차', meaning: '1주마다 2장의 카드를 배치하여 총 8장의 카드로 4주간의 운세를 리딩합니다.' },
      { id: 7, name: '4주차', meaning: '1주마다 2장의 카드를 배치하여 총 8장의 카드로 4주간의 운세를 리딩합니다.' },
      { id: 8, name: '4주차', meaning: '1주마다 2장의 카드를 배치하여 총 8장의 카드로 4주간의 운세를 리딩합니다.' }
    ]
  },
  {
    id: 'weekly',
    name: '1주일 운세',
    displayName: '1주일\n운세',
    layout: 'weekly-layout',
    description: '한 주 동안 매일의 운세를\n살펴보고자 할 때 적합합니다.',
    readingSteps: [
      { stepLabel: 'Step 1', text: '알고 싶은 상황이나 질문에 집중하며 카드를 섞습니다.' },
      { stepLabel: 'Step 2', text: '카드를 뒷면이 보이게 부채꼴로 넓게 펼친 후, 주로 사용하지 않는 손으로 카드를 뽑습니다.' },
      { stepLabel: 'Step 3', text: 'Significator 카드를 뽑아 중앙에 위치합니다.', highlightPositionId: 1 },
      { stepLabel: 'Step 4', text: '그 주변으로 각 요일에 해당하는 카드를 아래의 정해진 번호 위치에 따라 배치합니다. 카드를 뒤집을 때는 반드시 왼쪽에서 오른쪽 방향으로 뒤집습니다.' },
      { stepLabel: 'Step 4', text: '1번 카드 (월요일)', highlightPositionId: 2 },
      { stepLabel: 'Step 4', text: '2번 카드 (수요일)', highlightPositionId: 3 },
      { stepLabel: 'Step 4', text: '3번 카드 (금요일)', highlightPositionId: 4 },
      { stepLabel: 'Step 4', text: '4번 카드 (일요일)', highlightPositionId: 5 },
      { stepLabel: 'Step 4', text: '5번 카드 (화요일)', highlightPositionId: 6 },
      { stepLabel: 'Step 4', text: '6번 카드 (목요일)', highlightPositionId: 7 },
      { stepLabel: 'Step 4', text: '7번 카드 (토요일)', highlightPositionId: 8 }
    ],
    positions: [
      { id: 1, name: 'Significator', meaning: '일주일 전반의 흐름을 나타냅니다.' },
      { id: 2, name: '월', meaning: '' },
      { id: 3, name: '수', meaning: '' },
      { id: 4, name: '금', meaning: '' },
      { id: 5, name: '일', meaning: '' },
      { id: 6, name: '화', meaning: '' },
      { id: 7, name: '목', meaning: '' },
      { id: 8, name: '토', meaning: '' }
    ]
  }
];

const DialogueBox: React.FC<{
  text: string;
  subText?: string;
  leftButton?: { label: string; onClick: () => void };
  rightButton?: { label: string; onClick: () => void };
  centerButton?: { onClick: () => void };
  typingDelay?: number;
  disableTyping?: boolean;
}> = ({ text, subText, leftButton, rightButton, centerButton, typingDelay = 0, disableTyping = false }) => {
  return (
    <div className="w-full max-w-[340px] mt-auto pb-4 mx-auto font-serif shrink-0">
      <div className="border-[1.5px] border-white p-[3px] bg-black h-[155px]">
        <div className="border-[1.5px] border-white h-full relative">

          <div className="absolute inset-x-4 top-2 bottom-10 overflow-y-auto custom-scrollbar flex flex-col">
            <div className="my-auto flex flex-col items-center py-1">
              <p className="text-white text-[14px] text-center whitespace-pre-wrap break-keep leading-relaxed tracking-wide w-full px-2">
                {disableTyping ? text : <Typewriter text={text} speed={30} delay={typingDelay} />}
              </p>

              {subText && (
                <p className="text-white/60 text-[12px] text-center mt-3 break-keep leading-relaxed tracking-wide w-full px-2">
                  {disableTyping ? subText : <Typewriter text={subText} speed={30} delay={typingDelay + (text.length * 30)} />}
                </p>
              )}
            </div>
          </div>

          {centerButton && (
            <button
              onClick={centerButton.onClick}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 hover:opacity-70 transition-opacity animate-bounce z-10"
            >
              <img src={`${import.meta.env.BASE_URL}icon/dowm.png`} alt="down" className="h-[12px] w-auto object-contain" />
            </button>
          )}

          {leftButton && (
            <button
              onClick={leftButton.onClick}
              className="absolute bottom-4 left-6 flex items-center gap-2 hover:opacity-70 transition-opacity z-10 bg-black px-1 animate-bounce-left"
            >
              <img src={`${import.meta.env.BASE_URL}icon/left.png`} alt="prev" className="h-[12px] w-auto object-contain" />
              <span className="text-white text-[13px] tracking-widest leading-none">{leftButton.label}</span>
            </button>
          )}

          {rightButton && (
            <button
              onClick={rightButton.onClick}
              className="absolute bottom-4 right-6 flex items-center gap-2 hover:opacity-70 transition-opacity z-10 bg-black px-1 animate-bounce-right"
            >
              <span className="text-white text-[13px] tracking-widest leading-none">{rightButton.label}</span>
              <img src={`${import.meta.env.BASE_URL}icon/right.png`} alt="next" className="h-[12px] w-auto object-contain" />
            </button>
          )}

        </div>
      </div>
    </div>
  );
};

export const SpreadGuideTab: React.FC = () => {
  const [tabState, setTabState] = useState<'selection' | 'reading'>('selection');
  const [previewSpread, setPreviewSpread] = useState<SpreadDef | null>(null);

  const [activeSpread, setActiveSpread] = useState<SpreadDef | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [searchCode, setSearchCode] = useState<string[]>(['', '', '']);

  const getCardDisplayName = (card: TarotCard) => {
    if (card.type === 'major') return `[${card.englishName}]`;
    const typeName: Record<string, string> = { swords: 'Sword', cups: 'Cup', wands: 'Wand', pentacles: 'Pentacle' };
    return `[${typeName[card.type] || card.type} ${card.name}]`;
  };

  const getYesNoStatus = (card: TarotCard) => {
    const type = card.type;
    const name = card.name;

    if (type === 'major' && ['죽음', '악마', '탑', '달'].some(k => name.includes(k)))
      return { status: '부정', color: 'text-[#E19D3B]' };

    if (type === 'swords' && ['3', '5', '6', '7', '8', '9', '10', '기사'].some(k => name === k))
      return { status: '부정', color: 'text-[#E19D3B]' };
    if (type === 'cups' && ['5', '7', '8'].some(k => name === k))
      return { status: '부정', color: 'text-[#E19D3B]' };
    if (type === 'pentacles' && name === '5')
      return { status: '부정', color: 'text-[#E19D3B]' };

    if (type === 'major' && ['은둔자', '매달린 사람'].some(k => name.includes(k)))
      return { status: '중립', color: 'text-gray-400' };
    if ((type === 'swords' && name === '4') || (type === 'cups' && name === '4'))
      return { status: '중립', color: 'text-gray-400' };

    if (type === 'wands' && ['5', '7'].some(k => name === k))
      return {
        status: '조건부 Yes',
        color: 'text-[#E19D3B]',
        desc: '*해당 카드가 나오면 결과는 Yes이지만 원하는 것을 얻기 위해 치열하게 노력하고 싸워야 함을 뜻한다.'
      };

    if ((type === 'swords' && name === '2') || (type === 'wands' && name === '10'))
      return {
        status: '알 수 없음',
        color: 'text-gray-400',
        desc: '*해당 카드가 나오면 현재로서는 결과를 알 수 없는 상태를 의미한다.'
      };

    return { status: '긍정', color: 'text-white' };
  };

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
      className="flex-1 flex flex-col justify-between w-full h-full"
    >
      <div className="flex-1 flex flex-col justify-center items-center w-full">
        <div className="text-white text-[14px] mb-6 leading-relaxed tracking-wide min-h-[21px]">
          <Typewriter text="어떤 것을 점쳐보시겠습니까?" speed={40} />
        </div>

        {/* TV / Table Outline mimicking Image 1 */}
        <div className="relative w-full max-w-[340px] mx-auto flex items-center justify-center py-4">
          {/* The Table Image */}
          <img src={`${import.meta.env.BASE_URL}Table.png`} alt="Table" className="w-full h-auto object-contain pointer-events-none" />

          {/* Overlay Cards Container */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 pb-8">
            {/* Top Row: 4 cards */}
            <div className="flex justify-center gap-3 mb-3 w-full">
              {SPREADS.slice(0, 4).map((spread) => (
                <button
                  key={spread.id}
                  onClick={() => handlePreviewSpread(spread)}
                  className={`w-[45px] aspect-[60/96] border flex items-center justify-center transition-colors ${previewSpread?.id === spread.id ? 'bg-white text-black font-bold border-white' : 'border-white bg-black hover:bg-white/20 text-white'
                    }`}
                >
                  <span className="text-[9px] whitespace-pre-line text-center leading-relaxed">
                    {spread.displayName}
                  </span>
                </button>
              ))}
            </div>
            {/* Bottom Row: 5 cards */}
            <div className="flex justify-center gap-3 w-full">
              {SPREADS.slice(4, 9).map((spread) => (
                <button
                  key={spread.id}
                  onClick={() => handlePreviewSpread(spread)}
                  className={`w-[45px] aspect-[60/96] border flex items-center justify-center transition-colors ${previewSpread?.id === spread.id ? 'bg-white text-black font-bold border-white' : 'border-white bg-black hover:bg-white/20 text-white'
                    }`}
                >
                  <span className="text-[9px] whitespace-pre-line text-center leading-relaxed">
                    {spread.displayName}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {previewSpread ? (
        <DialogueBox
          text={previewSpread.description}
          rightButton={{ label: '운세 보기', onClick: handleStartReading }}
          disableTyping={true}
        />
      ) : (
        <DialogueBox
          text={'스프레드를 선택해주세요.'}
          centerButton={{ onClick: () => { } }}
          typingDelay={800}
        />
      )}
    </motion.div>
  );

  const renderDetailLayout = (spread: SpreadDef, highlightId: number) => {
    const getCardStyle = (posId: number, widthClass: string = 'w-[63px]') => {
      const isSelected = highlightId === posId;
      return `${widthClass} aspect-[60/96] border-[1px] transition-all flex flex-col items-center justify-center p-1 relative select-none ${isSelected ? 'border-[#ffd700] bg-[#111] z-10 shadow-[0_0_8px_rgba(255,215,0,0.5)]' : 'border-white/50 bg-black'
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
                  <span className="text-white text-[10px] whitespace-pre-line text-center leading-relaxed">{spread.positions[row * 2].name}</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className={getCardStyle(row * 2 + 2, 'w-[50px]')}>
                  <span className="text-white text-[10px] whitespace-pre-line text-center leading-relaxed">{spread.positions[row * 2 + 1].name}</span>
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
        <div className="relative w-full h-[360px] mt-2 flex items-center justify-center max-w-[340px] mx-auto">
          {/* pos 1 (Center) */}
          <div style={{ position: 'absolute', left: '32%', top: '50%', transform: 'translate(-50%, -50%)' }}>
            <div className={getCardStyle(1, 'w-[44px]')}>
              <span className="text-white text-[18px] font-medium whitespace-pre-line text-center leading-relaxed">{spread.positions[0].name}</span>
            </div>
          </div>
          {/* pos 2 (Across 1) */}
          <div style={{ position: 'absolute', left: '32%', top: '50%', transform: 'translate(-50%, -50%) rotate(90deg)' }}>
            <div className={getCardStyle(2, 'w-[44px]')}>
              <span className="text-white text-[18px] font-medium whitespace-pre-line text-center leading-relaxed" style={{ transform: 'rotate(-90deg)', display: 'inline-block' }}>{spread.positions[1].name}</span>
            </div>
          </div>
          {/* pos 3 (Bottom) */}
          <div style={{ position: 'absolute', left: '32%', top: '80%', transform: 'translate(-50%, -50%)' }}>
            <div className={getCardStyle(3, 'w-[44px]')}>
              <span className="text-white text-[18px] font-medium whitespace-pre-line text-center leading-relaxed">{spread.positions[2].name}</span>
            </div>
          </div>
          {/* pos 4 (Left) */}
          <div style={{ position: 'absolute', left: '8%', top: '50%', transform: 'translate(-50%, -50%)' }}>
            <div className={getCardStyle(4, 'w-[44px]')}>
              <span className="text-white text-[18px] font-medium whitespace-pre-line text-center leading-relaxed">{spread.positions[3].name}</span>
            </div>
          </div>
          {/* pos 5 (Top) */}
          <div style={{ position: 'absolute', left: '32%', top: '20%', transform: 'translate(-50%, -50%)' }}>
            <div className={getCardStyle(5, 'w-[44px]')}>
              <span className="text-white text-[18px] font-medium whitespace-pre-line text-center leading-relaxed">{spread.positions[4].name}</span>
            </div>
          </div>
          {/* pos 6 (Right) */}
          <div style={{ position: 'absolute', left: '56%', top: '50%', transform: 'translate(-50%, -50%)' }}>
            <div className={getCardStyle(6, 'w-[44px]')}>
              <span className="text-white text-[18px] font-medium whitespace-pre-line text-center leading-relaxed">{spread.positions[5].name}</span>
            </div>
          </div>

          {/* Right Column: 7, 8, 9, 10 */}
          <div style={{ position: 'absolute', left: '88%', top: '85%', transform: 'translate(-50%, -50%)' }}>
            <div className={getCardStyle(7, 'w-[44px]')}>
              <span className="text-white text-[18px] font-medium whitespace-pre-line text-center leading-relaxed">{spread.positions[6].name}</span>
            </div>
          </div>
          <div style={{ position: 'absolute', left: '88%', top: '60%', transform: 'translate(-50%, -50%)' }}>
            <div className={getCardStyle(8, 'w-[44px]')}>
              <span className="text-white text-[18px] font-medium whitespace-pre-line text-center leading-relaxed">{spread.positions[7].name}</span>
            </div>
          </div>
          <div style={{ position: 'absolute', left: '88%', top: '35%', transform: 'translate(-50%, -50%)' }}>
            <div className={getCardStyle(9, 'w-[44px]')}>
              <span className="text-white text-[18px] font-medium whitespace-pre-line text-center leading-relaxed">{spread.positions[8].name}</span>
            </div>
          </div>
          <div style={{ position: 'absolute', left: '88%', top: '10%', transform: 'translate(-50%, -50%)' }}>
            <div className={getCardStyle(10, 'w-[44px]')}>
              <span className="text-white text-[18px] font-medium whitespace-pre-line text-center leading-relaxed">{spread.positions[9].name}</span>
            </div>
          </div>
        </div>
      );
    }

    if (spread.layout === 'weekly-layout') {
      const customPositions = {
        1: { x: 90, y: -45 },  // 1번: 월
        2: { x: 90, y: 55 },   // 2번: 수
        3: { x: 38, y: 120 },  // 3번: 금
        4: { x: -38, y: 120 }, // 4번: 일
        5: { x: -90, y: 55 },  // 5번: 화
        6: { x: -90, y: -45 }, // 6번: 목
        7: { x: 0, y: -110 }   // 7번: 토
      };

      return (
        <div className="relative w-full h-[340px] mt-2 flex items-center justify-center max-w-[340px] mx-auto">
          {/* Center */}
          <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
            <div className={getCardStyle(1, 'w-[48px]')}>
              <span className="text-white text-[10px] whitespace-pre-line text-center leading-relaxed">{spread.positions[0].name}</span>
            </div>
          </div>
          {/* Custom positioned items */}
          {spread.positions.slice(1).map((pos, i) => {
            const posData = customPositions[(i + 1) as keyof typeof customPositions];
            const left = `calc(50% + ${posData.x}px)`;
            const top = `calc(50% + ${posData.y}px)`;
            return (
              <div key={pos.id} style={{ position: 'absolute', left, top, transform: 'translate(-50%, -50%)' }}>
                <div className={getCardStyle(pos.id, 'w-[45px]')}>
                  <span className="text-white text-[11px] whitespace-pre-line text-center leading-relaxed">{pos.name}</span>
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
              <span className="text-white text-[8px] whitespace-pre-line text-center leading-relaxed">{spread.positions[0].name}</span>
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
                  <span className="text-white text-[7px] whitespace-pre-line text-center leading-relaxed">{pos.name}</span>
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
            <img src={`${import.meta.env.BASE_URL}icon/left.png`} alt="Back" className="w-5 h-5 object-contain" />
            <span className="text-[14px]">돌아가기</span>
          </button>
          <span className="text-white font-bold text-[14px] ml-auto">{spread.name}</span>
        </div>

        {/* Dynamic Spread Arena */}
        <div className="flex-1 w-full max-w-sm mx-auto min-h-[300px]">
          {renderDetailLayout(spread, highlightId)}
        </div>

        {/* Yes/No Card Search UI */}
        {spread.id === 'yesno' && (
          <div className={`flex flex-col items-center -mt-24 mb-2 shrink-0 relative z-20 transition-opacity duration-300 ${currentStepIndex >= 3 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="flex gap-3">
              {[0, 1, 2].map((idx) => (
                <input
                  key={idx}
                  id={`search-input-${idx}`}
                  type="text"
                  maxLength={1}
                  value={searchCode[idx]}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, '');
                    const newCode = [...searchCode];
                    newCode[idx] = val;
                    setSearchCode(newCode);
                    if (val && idx < 2) {
                      document.getElementById(`search-input-${idx + 1}`)?.focus();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' && !searchCode[idx] && idx > 0) {
                      const newCode = [...searchCode];
                      newCode[idx - 1] = '';
                      setSearchCode(newCode);
                      document.getElementById(`search-input-${idx - 1}`)?.focus();
                    }
                  }}
                  onClick={() => {
                    if (searchCode.some(val => val !== '')) {
                      setSearchCode(['', '', '']);
                      setTimeout(() => document.getElementById('search-input-0')?.focus(), 0);
                    }
                  }}
                  className="w-9 h-9 border border-white bg-black text-white text-center text-[15px] focus:outline-none focus:border-[#E19D3B]"
                />
              ))}
            </div>
            {(() => {
              const codeStr = searchCode.join('');
              return (
                <div className="w-full h-[75px] mt-4 flex flex-col items-center pointer-events-none">
                  <AnimatePresence>
                    {codeStr.length === 3 && (
                      <motion.div
                        key="result"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="flex flex-col items-center"
                      >
                        {(() => {
                          const card = TAROT_CARDS.find(c => c.code === codeStr);
                          if (card) {
                            const yesNoInfo = getYesNoStatus(card);
                            return (
                              <>
                                <span className="text-[#E19D3B] text-[13px] font-bold tracking-widest">{getCardDisplayName(card)}</span>
                                <span className="text-[#E19D3B] text-[13px] font-bold tracking-widest mt-1">{yesNoInfo.status}</span>
                                {yesNoInfo.desc && (
                                  <span className="text-white/60 text-[10px] mt-1 max-w-[280px] text-center leading-relaxed break-keep">
                                    {yesNoInfo.desc}
                                  </span>
                                )}
                              </>
                            );
                          } else {
                            return <span className="text-red-500 text-[13px] mt-1">존재하지 않는 코드입니다</span>;
                          }
                        })()}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })()}
          </div>
        )}

        {/* Bottom Dialogue Box */}
        <DialogueBox
          text={currentStep?.text || ''}
          subText={(() => {
            if (currentStep?.subText) return currentStep.subText;
            if (highlightId !== -1) {
              const meaning = spread.positions.find(p => p.id === highlightId)?.meaning;
              return meaning ? `(${meaning})` : undefined;
            }
            return undefined;
          })()}
          leftButton={!isFirstStep ? { label: '이전', onClick: handlePrevStep } : undefined}
          rightButton={!isLastStep ? { label: '다음', onClick: handleNextStep } : undefined}
          disableTyping={true}
        />
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
