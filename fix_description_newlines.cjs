const fs = require('fs');

let file = fs.readFileSync('src/components/SpreadGuideTab.tsx', 'utf8');

const replacements = [
  {
    oldStr: `description: '데일리 리딩이나 빠르고 직관적인 조언이 필요할 때 사용합니다. 예/아니오 보다는 구체적인 질문에 적합합니다.'`,
    newStr: `description: '데일리 리딩이나 빠르고 직관적인 조언이 필요할 때 사용합니다.\\n예/아니오 보다는 구체적인 질문에 적합합니다.'`
  },
  {
    oldStr: `description: '미니 리딩이나 전반적인 상황 흐름을 빠르게 파악하고 싶을 때 적합합니다.'`,
    newStr: `description: '미니 리딩이나 전반적인 상황 흐름을\\n빠르게 파악하고 싶을 때 적합합니다.'`
  },
  {
    oldStr: `description: '빠르게 명확한 결정을 내리고 싶을 때 적합합니다.'`,
    newStr: `description: '빠르게 명확한 결정을\\n내리고 싶을 때 적합합니다.'`
  },
  {
    oldStr: `description: '질문에 대해 상세히 분석하거나, 전반적인 흐름과 장애물을 짚어보고 싶을 때 적합합니다.'`,
    newStr: `description: '질문에 대해 상세히 분석하거나,\\n전반적인 흐름과 장애물을 짚어보고 싶을 때 적합합니다.'`
  },
  {
    oldStr: `description: '두 가지 선택지 사이에서 고민하는 상황에 적합합니다.'`,
    newStr: `description: '두 가지 선택지 사이에서\\n고민하는 상황에 적합합니다.'`
  },
  {
    oldStr: `description: '상대방의 마음을 읽거나 관계의 흐름을 파악하고자 할 때 적합합니다.'`,
    newStr: `description: '상대방의 마음을 읽거나\\n관계의 흐름을 파악하고자 할 때 적합합니다.'`
  },
  {
    oldStr: `description: '앞으로 다가올 1년 동안의 흐름을 파악하고 싶을 때 적합합니다.'`,
    newStr: `description: '앞으로 다가올 1년 동안의\\n흐름을 파악하고 싶을 때 적합합니다.'`
  },
  {
    oldStr: `description: '향후 4주일 동안 나에게 미칠 영향력과 흐름을 확인하고 싶을 때 적합합니다.'`,
    newStr: `description: '향후 4주일 동안 나에게 미칠\\n영향력과 흐름을 확인하고 싶을 때 적합합니다.'`
  },
  {
    oldStr: `description: '한 주 동안 매일의 운세를 살펴보고자 할 때 적합합니다.'`,
    newStr: `description: '한 주 동안 매일의 운세를\\n살펴보고자 할 때 적합합니다.'`
  }
];

let replacedCount = 0;
replacements.forEach(({oldStr, newStr}) => {
  if (file.includes(oldStr)) {
    file = file.replace(oldStr, newStr);
    replacedCount++;
  } else {
    console.log('Failed to find:', oldStr);
  }
});

fs.writeFileSync('src/components/SpreadGuideTab.tsx', file);
console.log(`Updated ${replacedCount} descriptions with newlines.`);
