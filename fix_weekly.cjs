const fs = require('fs');

// 1. Update SpreadGuideTab.tsx
let guideFile = fs.readFileSync('src/components/SpreadGuideTab.tsx', 'utf8');

// Replace the angles for weekly-layout
guideFile = guideFile.replace(
  /const angles = \{\s*1: 51\.4,[\s\S]*?7: 205\.7\s*\};/,
  `const angles = {
        1: 51.4,   // 1번: 월
        2: 102.8,  // 2번: 수
        3: 154.2,  // 3번: 금
        4: 205.7,  // 4번: 일
        5: 257.1,  // 5번: 화
        6: 308.5,  // 6번: 목
        7: 0       // 7번: 토
      };`
);

// Replace the weekly spread object
guideFile = guideFile.replace(
  /\{\s*id: 'weekly',[\s\S]*?id: 8, name: '카드', meaning: '각 요일에 해당하는 카드를 아래의 정해진 번호 위치에 따라 배치합니다.' \}\s*\]\s*\}/,
  `{
    id: 'weekly',
    name: '1주일 운세',
    displayName: '1주일\\n운세',
    layout: 'weekly-layout',
    description: '한 주 동안 매일의 운세를\\n살펴보고자 할 때 적합합니다.',
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
      { id: 1, name: 'Significator\\n일주일 전반', meaning: '일주일 전반의 흐름을 나타냅니다.' },
      { id: 2, name: '월요일', meaning: '1번 카드 (월요일)' },
      { id: 3, name: '수요일', meaning: '2번 카드 (수요일)' },
      { id: 4, name: '금요일', meaning: '3번 카드 (금요일)' },
      { id: 5, name: '일요일', meaning: '4번 카드 (일요일)' },
      { id: 6, name: '화요일', meaning: '5번 카드 (화요일)' },
      { id: 7, name: '목요일', meaning: '6번 카드 (목요일)' },
      { id: 8, name: '토요일', meaning: '7번 카드 (토요일)' }
    ]
  }`
);

fs.writeFileSync('src/components/SpreadGuideTab.tsx', guideFile);

// 2. Update 스프레드.md
let mdFile = fs.readFileSync('src/data/스프레드.md', 'utf8');
mdFile = mdFile.replace(
  /4\. 그 주변으로 각 요일에 해당하는 카드를 아래의 정해진 번호 위치에 따라 배치합니다\. 카드를 뒤집을 때는 반드시 왼쪽에서 오른쪽 방향으로 뒤집습니다\./,
  `4. 그 주변으로 각 요일에 해당하는 카드를 아래의 정해진 번호 위치에 따라 배치합니다. 카드를 뒤집을 때는 반드시 왼쪽에서 오른쪽 방향으로 뒤집습니다.\n   * 1번 카드 (월요일)\n   * 2번 카드 (수요일)\n   * 3번 카드 (금요일)\n   * 4번 카드 (일요일)\n   * 5번 카드 (화요일)\n   * 6번 카드 (목요일)\n   * 7번 카드 (토요일)`
);

fs.writeFileSync('src/data/스프레드.md', mdFile);
console.log('Weekly spread updated.');
