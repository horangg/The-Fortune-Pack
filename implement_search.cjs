const fs = require('fs');

let file = fs.readFileSync('src/components/SpreadGuideTab.tsx', 'utf8');

// 1. Add imports
file = file.replace(
  /import \{ Typewriter \} from '\.\/Typewriter';/,
  `import { Typewriter } from './Typewriter';\nimport { TAROT_CARDS } from '../data/tarotData';\nimport { TarotCard } from '../types';`
);

// 2. Add state
file = file.replace(
  /const \[currentStepIndex, setCurrentStepIndex\] = useState\(0\);/,
  `const [currentStepIndex, setCurrentStepIndex] = useState(0);\n  const [searchCode, setSearchCode] = useState<string[]>(['', '', '']);`
);

// 3. Add getYesNoStatus logic above the component
file = file.replace(
  /export function SpreadGuideTab/,
  `const getYesNoStatus = (card: TarotCard) => {
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

const getCardDisplayName = (card: TarotCard) => {
  if (card.type === 'major') return \`[\${card.name}]\`;
  const typeName: Record<string, string> = { swords: 'Sword', cups: 'Cup', wands: 'Wand', pentacles: 'Pentacle' };
  return \`[\${typeName[card.type] || card.type} \${card.name}]\`;
};

export function SpreadGuideTab`
);

// 4. Add UI
file = file.replace(
  /\{renderDetailLayout\(spread, highlightId\)\}\n\s*<\/div>\n\n\s*\{\/\* Bottom Dialogue Box \*\/\}/,
  `{renderDetailLayout(spread, highlightId)}\n        </div>\n\n        {/* Yes/No Card Search UI */}\n        {spread.id === 'yesno' && currentStepIndex >= 3 && (\n          <div className="flex flex-col items-center mb-2 shrink-0">\n            <div className="flex gap-4">\n              {[0, 1, 2].map((idx) => (\n                <input\n                  key={idx}\n                  id={\`search-input-\${idx}\`}\n                  type="text"\n                  maxLength={1}\n                  value={searchCode[idx]}\n                  onChange={(e) => {\n                    const val = e.target.value.replace(/[^0-9]/g, '');\n                    const newCode = [...searchCode];\n                    newCode[idx] = val;\n                    setSearchCode(newCode);\n                    if (val && idx < 2) {\n                      document.getElementById(\`search-input-\${idx + 1}\`)?.focus();\n                    }\n                  }}\n                  onKeyDown={(e) => {\n                    if (e.key === 'Backspace' && !searchCode[idx] && idx > 0) {\n                      const newCode = [...searchCode];\n                      newCode[idx - 1] = '';\n                      setSearchCode(newCode);\n                      document.getElementById(\`search-input-\${idx - 1}\`)?.focus();\n                    }\n                  }}\n                  className="w-10 h-10 border border-white bg-black text-white text-center text-[16px] focus:outline-none focus:border-[#E19D3B]"\n                />\n              ))}\n            </div>\n            {(() => {\n              const codeStr = searchCode.join('');\n              if (codeStr.length === 3) {\n                const card = TAROT_CARDS.find(c => c.code === codeStr);\n                if (card) {\n                  const yesNoInfo = getYesNoStatus(card);\n                  return (\n                    <div className="flex flex-col items-center mt-4 h-[60px]">\n                      <span className="text-[#E19D3B] text-[13px] font-bold tracking-widest">{getCardDisplayName(card)}</span>\n                      <span className={\`\${yesNoInfo.color} text-[13px] font-bold tracking-widest mt-1\`}>{yesNoInfo.status}</span>\n                      {yesNoInfo.desc && (\n                        <span className="text-white/60 text-[10px] mt-1 max-w-[280px] text-center leading-relaxed break-keep">\n                          {yesNoInfo.desc}\n                        </span>\n                      )}\n                    </div>\n                  );\n                } else {\n                  return <div className="flex flex-col items-center mt-4 h-[60px]"><span className="text-red-500 text-[13px] mt-1">존재하지 않는 코드입니다</span></div>;\n                }\n              }\n              return <div className="h-[60px] mt-4"></div>;\n            })()}\n          </div>\n        )}\n\n        {/* Bottom Dialogue Box */}`
);

// 5. Fix subText empty parentheses
file = file.replace(
  /subText=\{highlightId !== -1 \? \`\(\\\$\{spread\.positions\.find\(p => p\.id === highlightId\)\?\.meaning\}\)\` : undefined\}/,
  `subText={highlightId !== -1 && spread.positions.find(p => p.id === highlightId)?.meaning ? \`(\${spread.positions.find(p => p.id === highlightId)?.meaning})\` : undefined}`
);

fs.writeFileSync('src/components/SpreadGuideTab.tsx', file);
console.log('Search UI and logic added successfully.');
