const fs = require('fs');

let file = fs.readFileSync('src/components/SpreadGuideTab.tsx', 'utf8');

// Replace the buggy one-card spread with the two separate spreads
file = file.replace(
  /\{\s*id: 'one-card'[\s\S]*?name: '3번 카드'[\s\S]*?\]\s*\}/,
  `{
    id: 'one-card',
    name: '원 카드 리딩 (One-Card Daily Reading)',
    displayName: '원\\n카드',
    layout: '1-card',
    description: '데일리 리딩이나 빠르고 직관적인 조언이 필요할 때 사용합니다. 예/아니오 보다는 구체적인 질문에 적합합니다.',
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
    name: '과거, 현재, 미래 스프레드 (Past, Present, Future)',
    displayName: '과거\\n현재\\n미래',
    layout: '3-card',
    description: '미니 리딩이나 전반적인 상황 흐름을 빠르게 파악하고 싶을 때 적합합니다.',
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
  }`
);

fs.writeFileSync('src/components/SpreadGuideTab.tsx', file);
console.log('Fixed spreads.');
