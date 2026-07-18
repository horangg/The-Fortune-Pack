const fs = require('fs');

let file = fs.readFileSync('src/components/SpreadGuideTab.tsx', 'utf8');

const replacements = [
  {
    oldStr: `description: '특정 질문에 대해 매우 상세히 분석하거나, 현재 삶의 전반적인 흐름과 장애물을 짚어보고 싶을 때 가장 널리 쓰이는 스프레드입니다.'`,
    newStr: `description: '질문에 대해 상세히 분석하거나, 전반적인 흐름과 장애물을 짚어보고 싶을 때 적합합니다.'`
  },
  {
    oldStr: `description: '두 가지 대안을 두고 선택을 고민하는 상황에 적합합니다.'`,
    newStr: `description: '두 가지 선택지 사이에서 고민하는 상황에 적합합니다.'`
  },
  {
    oldStr: `description: '특정 상대와의 관계 흐름 및 서로의 성향을 파악하고자 하는 상황에 적합합니다.'`,
    newStr: `description: '상대방의 마음을 읽거나 관계의 흐름을 파악하고자 할 때 적합합니다.'`
  },
  {
    oldStr: `description: '앞으로 다가올 12개월의 흐름을 시계 방향으로 배열하여 한눈에 파악하는 방법입니다.'`,
    newStr: `description: '앞으로 다가올 1년 동안의 흐름을 파악하고 싶을 때 적합합니다.'`
  },
  {
    oldStr: `description: '향후 4주일 동안 나에게 미칠 영향력과 흐름을 확인하는 방법입니다.'`,
    newStr: `description: '향후 4주일 동안 나에게 미칠 영향력과 흐름을 확인하고 싶을 때 적합합니다.'`
  },
  {
    oldStr: `description: '한 주간의 매일의 운세를 살펴보는 방법입니다.'`,
    newStr: `description: '한 주 동안 매일의 운세를 살펴보고자 할 때 적합합니다.'`
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
console.log(`Updated ${replacedCount} descriptions.`);
