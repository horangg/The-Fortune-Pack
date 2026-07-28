const fs = require('fs');
const file = fs.readFileSync('src/components/SpreadGuideTab.tsx', 'utf8');

// The file has SPREADS definition ending at line 239:
//     ]
//   }
// ];

const splitStr = '];\n\nconst DialogueBox';
const parts = file.split('];\n\nconst DialogueBox');

if (parts.length < 2) {
    console.log("Could not find the split point");
    process.exit(1);
}

const head = parts[0] + '];\n\n';

const newTail = `export const SpreadGuideTab: React.FC = () => {
  const [tabState, setTabState] = useState<'selection' | 'reading'>('selection');
  const [previewSpread, setPreviewSpread] = useState<SpreadDef | null>(null);
  const [activeSpread, setActiveSpread] = useState<SpreadDef | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [searchCode, setSearchCode] = useState<string[]>(['', '', '']);

  const getCardDisplayName = (card: TarotCard) => {
    if (card.type === 'major') return \`[\${card.englishName}]\`;
    const typeName: Record<string, string> = { swords: 'Sword', cups: 'Cup', wands: 'Wand', pentacles: 'Pentacle' };
    return \`[\${typeName[card.type] || card.type} \${card.name}]\`;
  };

  const getYesNoStatus = (card: TarotCard) => {
    const type = card.type;
    const name = card.name;

    if (type === 'major' && ['죽음', '악마', '탑', '달'].some(k => name.includes(k)))
      return { status: '부정', color: 'text-[#FF9900]' };

    if (type === 'swords' && ['3', '5', '6', '7', '8', '9', '10', '기사'].some(k => name === k))
      return { status: '부정', color: 'text-[#FF9900]' };
    if (type === 'cups' && ['5', '7', '8'].some(k => name === k))
      return { status: '부정', color: 'text-[#FF9900]' };
    if (type === 'pentacles' && name === '5')
      return { status: '부정', color: 'text-[#FF9900]' };

    if (type === 'major' && ['은둔자', '매달린 사람'].some(k => name.includes(k)))
      return { status: '중립', color: 'text-gray-400' };
    if ((type === 'swords' && name === '4') || (type === 'cups' && name === '4'))
      return { status: '중립', color: 'text-gray-400' };

    if (type === 'wands' && ['5', '7'].some(k => name === k))
      return {
        status: '조건부 Yes',
        color: 'text-[#FF9900]',
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
    <div className="flex-1 flex flex-col w-full h-full overflow-y-auto custom-scrollbar px-4 py-8">
      <h2 className="text-[#FF9900] text-lg font-light tracking-widest mb-8 text-center uppercase">SPREAD GUIDE</h2>
      
      <div className="grid grid-cols-3 gap-3 w-full max-w-sm mx-auto mb-8">
        {SPREADS.map((spread) => (
          <button
            key={spread.id}
            onClick={() => handlePreviewSpread(spread)}
            className={\`p-3 border flex flex-col items-center justify-center transition-colors \${previewSpread?.id === spread.id ? 'bg-white text-black border-white' : 'border-neutral-800 bg-black hover:bg-neutral-900 text-white'}\`}
          >
            <span className="text-[12px] text-center leading-relaxed whitespace-pre-line mb-1 font-medium">
              {spread.displayName.replace(/\\n/g, ' ')}
            </span>
          </button>
        ))}
      </div>

      {previewSpread && (
        <div className="w-full max-w-sm mx-auto p-5 border border-neutral-800 bg-black">
          <h3 className="text-[#FF9900] text-base font-bold mb-3">{previewSpread.name}</h3>
          <p className="text-neutral-300 text-[13px] leading-relaxed mb-6">{previewSpread.description}</p>
          <button
            onClick={handleStartReading}
            className="w-full py-3 bg-[#FF9900] text-black font-bold text-[13px] tracking-widest hover:bg-[#e68a00] transition-colors"
          >
            운세 보기
          </button>
        </div>
      )}
    </div>
  );

  const renderReading = () => {
    if (!activeSpread) return null;
    const currentStep = activeSpread.readingSteps[currentStepIndex];

    return (
      <div className="flex-1 flex flex-col w-full h-full px-4 py-8 overflow-y-auto custom-scrollbar">
        <button
          onClick={handleBackToSelection}
          className="text-[#FF9900] text-[12px] font-bold tracking-widest mb-6 text-left hover:opacity-70 transition-opacity flex items-center gap-2"
        >
          <span>&lt;</span> 뒤로 가기
        </button>

        <h2 className="text-xl font-light tracking-widest text-white mb-4 uppercase">{activeSpread.name}</h2>
        <div className="h-[1px] w-full bg-neutral-800 mb-8"></div>

        <div className="flex-1 flex flex-col">
          <div className="mb-6">
            <span className="inline-block text-[#FF9900] text-[11px] font-bold tracking-widest mb-3 border border-[#FF9900] px-2 py-1">
              STEP {currentStepIndex + 1} / {activeSpread.readingSteps.length}
            </span>
            {currentStep.stepLabel && (
              <h3 className="text-white font-bold text-[15px] mb-3">{currentStep.stepLabel}</h3>
            )}
            <p className="text-neutral-300 text-[14px] leading-relaxed break-keep whitespace-pre-line">
              {currentStep.text}
            </p>
            {currentStep.subText && (
              <p className="text-neutral-500 text-[12px] leading-relaxed mt-3 break-keep">
                {currentStep.subText}
              </p>
            )}
            
            {/* If it's yesno, we could render the special logic, but keeping it unified for readability */}
            {activeSpread.id === 'yesno' && currentStepIndex === 3 && (
              <div className="mt-6 p-4 border border-neutral-800 bg-neutral-900/50">
                <p className="text-sm text-neutral-400 mb-4">카드를 확인하고 결과를 도출하세요.</p>
              </div>
            )}
          </div>

          <div className="mt-auto flex justify-between items-center pt-6 border-t border-neutral-900">
            <button
              onClick={handlePrevStep}
              className={\`px-4 py-2 text-[13px] font-bold tracking-widest transition-colors \${currentStepIndex === 0 ? 'opacity-0 pointer-events-none' : 'text-neutral-400 hover:text-white'}\`}
            >
              이전
            </button>
            <button
              onClick={currentStepIndex === activeSpread.readingSteps.length - 1 ? handleBackToSelection : handleNextStep}
              className="px-6 py-2 bg-white text-black font-bold text-[13px] tracking-widest hover:bg-neutral-200 transition-colors"
            >
              {currentStepIndex === activeSpread.readingSteps.length - 1 ? '완료' : '다음'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 w-full flex flex-col overflow-hidden bg-black font-sans">
      {tabState === 'selection' ? renderTableSelection() : renderReading()}
    </div>
  );
};
`;

let cleanedHead = head.replace(/import \{ Typewriter \} from '\.\/Typewriter';\n/, '');
cleanedHead = cleanedHead.replace(/import \{ Typewriter, TypewriterContext \} from '\.\/Typewriter';\n/, '');
cleanedHead = cleanedHead.replace(/import \{ motion, AnimatePresence \} from 'motion\/react';\n/, '');

fs.writeFileSync('src/components/SpreadGuideTab.tsx', cleanedHead + newTail);
