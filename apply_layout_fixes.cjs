const fs = require('fs');

let file = fs.readFileSync('src/components/SpreadGuideTab.tsx', 'utf8');

// 1. Fix Layout Shift by using opacity instead of conditional rendering
file = file.replace(
  /\{spread\.id === 'yesno' && currentStepIndex >= 3 && \(\n\s*<div className="flex flex-col items-center mb-2 shrink-0">/,
  `{spread.id === 'yesno' && (\n          <div className={\`flex flex-col items-center mb-2 shrink-0 transition-opacity duration-300 \${currentStepIndex >= 3 ? 'opacity-100' : 'opacity-0 pointer-events-none'}\`}>`
);

// 2. Add the guide text to Step 4
file = file.replace(
  /\{ stepLabel: 'Step 4', text: '뽑힌 카드들이 긍정, 부정, 중립 인지 확인합니다\.' \}/,
  `{ stepLabel: 'Step 4', text: '뽑힌 카드들이 긍정, 부정, 중립 인지 확인합니다.\\n\\n*세 자리 숫자코드를 입력하면 확인할 수 있습니다.' }`
);

fs.writeFileSync('src/components/SpreadGuideTab.tsx', file);
console.log('Layout fixes applied successfully.');
