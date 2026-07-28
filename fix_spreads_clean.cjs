const fs = require('fs');
let file = fs.readFileSync('src/components/SpreadGuideTab.tsx', 'utf8');

// 1. Remove Typewriter import
file = file.replace(/import \{ Typewriter \} from '\.\/Typewriter';\n/g, '');
file = file.replace(/import \{ Typewriter, TypewriterContext \} from '\.\/Typewriter';\n/g, '');

// 2. Remove DialogueBox definition
const diagStart = file.indexOf('const DialogueBox');
const diagEnd = file.indexOf('export const SpreadGuideTab', diagStart);
if (diagStart !== -1 && diagEnd !== -1) {
    file = file.slice(0, diagStart) + file.slice(diagEnd);
}

// 3. Rewrite renderTableSelection
const renderTableStart = file.indexOf('const renderTableSelection =');
const renderTableEnd = file.indexOf('const renderReading =', renderTableStart);

if (renderTableStart !== -1 && renderTableEnd !== -1) {
    const newRenderTable = `  const renderTableSelection = () => (
    <motion.div
      key="table-selection"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex-1 flex flex-col w-full h-full px-4 py-6 overflow-y-auto custom-scrollbar"
    >
      <h2 className="text-[#FF9900] text-lg font-light tracking-widest mb-6 text-center">SPREAD GUIDE</h2>
      
      <div className="grid grid-cols-2 gap-4 w-full max-w-sm mx-auto mb-8">
        {SPREADS.map((spread) => (
          <button
            key={spread.id}
            onClick={() => handlePreviewSpread(spread)}
            className={\`p-4 border flex flex-col items-center justify-center transition-colors \${previewSpread?.id === spread.id ? 'bg-white text-black font-bold border-white' : 'border-neutral-800 bg-black hover:bg-white/10 text-white'}\`}
          >
            <span className="text-[13px] text-center leading-relaxed whitespace-pre-line mb-2">
              {spread.displayName}
            </span>
            <span className={\`text-[10px] \${previewSpread?.id === spread.id ? 'text-black/60' : 'text-neutral-500'}\`}>
              {spread.layout}
            </span>
          </button>
        ))}
      </div>

      {previewSpread && (
        <div className="w-full max-w-sm mx-auto p-4 border border-[#FF9900]/30 bg-[#FF9900]/5 rounded-sm">
          <h3 className="text-[#FF9900] text-sm font-bold mb-2">{previewSpread.name}</h3>
          <p className="text-white text-[13px] leading-relaxed mb-6">{previewSpread.description}</p>
          <button
            onClick={handleStartReading}
            className="w-full py-3 bg-[#FF9900] text-black font-bold text-[13px] tracking-widest hover:bg-[#e68a00] transition-colors"
          >
            운세 보기
          </button>
        </div>
      )}
    </motion.div>
  );

  `;
    file = file.slice(0, renderTableStart) + newRenderTable + file.slice(renderTableEnd);
}

// 4. Rewrite renderReading
const renderReadingStart = file.indexOf('const renderReading =');
const renderReadingEnd = file.indexOf('return (', renderReadingStart);

if (renderReadingStart !== -1 && renderReadingEnd !== -1) {
    const newRenderReading = `  const renderReading = () => {
    if (!activeSpread) return null;
    const currentStep = activeSpread.readingSteps[currentStepIndex];
    return (
      <motion.div
        key="reading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex-1 flex flex-col w-full h-full px-4 py-6 overflow-y-auto custom-scrollbar"
      >
        <button
          onClick={handleBackToSelection}
          className="text-[#FF9900] text-[12px] font-bold tracking-widest mb-6 text-left hover:opacity-70 transition-opacity flex items-center gap-2"
        >
          <span>&lt;</span> 뒤로 가기
        </button>

        <h2 className="text-xl font-light tracking-widest text-white mb-2">{activeSpread.name}</h2>
        <div className="h-[1px] w-full bg-neutral-800 mb-6"></div>

        <div className="flex-1 flex flex-col">
          <div className="mb-6">
            <span className="inline-block px-2 py-1 bg-neutral-900 text-[#FF9900] text-[11px] font-bold tracking-widest mb-3">
              STEP {currentStepIndex + 1} / {activeSpread.readingSteps.length}
            </span>
            {currentStep.stepLabel && (
              <h3 className="text-white font-bold text-sm mb-2">{currentStep.stepLabel}</h3>
            )}
            <p className="text-neutral-200 text-[14px] leading-relaxed break-keep">
              {currentStep.text}
            </p>
            {currentStep.subText && (
              <p className="text-neutral-500 text-[12px] leading-relaxed mt-2 break-keep">
                {currentStep.subText}
              </p>
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
      </motion.div>
    );
  };

  `;
    file = file.slice(0, renderReadingStart) + newRenderReading + file.slice(renderReadingEnd);
}

fs.writeFileSync('src/components/SpreadGuideTab.tsx', file, 'utf8');
