const fs = require('fs');

let file = fs.readFileSync('src/components/SpreadGuideTab.tsx', 'utf8');

// yearly
file = file.replace(
  /id: 'yearly'[\s\S]*?readingSteps: \[\s*\{[\s\S]*?해당 월의 운세와 영향', highlightPositionId: 13\s*\}\s*\]/m,
  (match) => match.replace(/readingSteps: \[\s*\{[\s\S]*?해당 월의 운세와 영향', highlightPositionId: 13\s*\}\s*\]/m, `readingSteps: [
      { stepLabel: 'Step 1', text: '알고 싶은 상황이나 질문에 집중하며 카드를 섞습니다.' },
      { stepLabel: 'Step 2', text: '카드를 뒷면이 보이게 부채꼴로 넓게 펼친 후, 주로 사용하지 않는 손으로 카드를 뽑습니다.' },
      { stepLabel: 'Step 3', text: '리딩의 기준이 되는 시그니피케이터 카드를 가장 먼저 중앙에 놓습니다.', highlightPositionId: 1 },
      { stepLabel: 'Step 4', text: '현재 월 부터 시작하여 시계 방향으로 순서대로 카드를 놓습니다. 각 카드는 해당 월의 운세와 영향을 나타냅니다. 카드를 뒤집을 때는 반드시 왼쪽에서 오른쪽 방향으로 뒤집습니다.' },
      { stepLabel: 'Step 4', text: '해당 월의 운세와 영향', highlightPositionId: 2 },
      { stepLabel: 'Step 4', text: '해당 월의 운세와 영향', highlightPositionId: 3 },
      { stepLabel: 'Step 4', text: '해당 월의 운세와 영향', highlightPositionId: 4 },
      { stepLabel: 'Step 4', text: '해당 월의 운세와 영향', highlightPositionId: 5 },
      { stepLabel: 'Step 4', text: '해당 월의 운세와 영향', highlightPositionId: 6 },
      { stepLabel: 'Step 4', text: '해당 월의 운세와 영향', highlightPositionId: 7 },
      { stepLabel: 'Step 4', text: '해당 월의 운세와 영향', highlightPositionId: 8 },
      { stepLabel: 'Step 4', text: '해당 월의 운세와 영향', highlightPositionId: 9 },
      { stepLabel: 'Step 4', text: '해당 월의 운세와 영향', highlightPositionId: 10 },
      { stepLabel: 'Step 4', text: '해당 월의 운세와 영향', highlightPositionId: 11 },
      { stepLabel: 'Step 4', text: '해당 월의 운세와 영향', highlightPositionId: 12 },
      { stepLabel: 'Step 4', text: '해당 월의 운세와 영향', highlightPositionId: 13 }
    ]`)
);

// weekly (it didn't have highlight steps originally in my output, wait, did it?)
// Let's just do a generic replace for weekly if it exists, or just rewrite it
file = file.replace(
  /id: 'weekly'[\s\S]*?readingSteps: \[\s*\{[\s\S]*?\]/m,
  (match) => match.replace(/readingSteps: \[\s*\{[\s\S]*?\]/m, `readingSteps: [
      { stepLabel: 'Step 1', text: '알고 싶은 상황이나 질문에 집중하며 카드를 섞습니다.' },
      { stepLabel: 'Step 2', text: '카드를 뒷면이 보이게 부채꼴로 넓게 펼친 후, 주로 사용하지 않는 손으로 카드를 뽑습니다.' },
      { stepLabel: 'Step 3', text: 'Significator 카드를 뽑아 중앙에 위치합니다.', highlightPositionId: 1 },
      { stepLabel: 'Step 4', text: '그 주변으로 각 요일에 해당하는 카드를 아래의 정해진 번호 위치에 따라 배치합니다. 카드를 뒤집을 때는 반드시 왼쪽에서 오른쪽 방향으로 뒤집습니다.' },
      { stepLabel: 'Step 4', text: '월요일 운세', highlightPositionId: 2 },
      { stepLabel: 'Step 4', text: '화요일 운세', highlightPositionId: 3 },
      { stepLabel: 'Step 4', text: '수요일 운세', highlightPositionId: 4 },
      { stepLabel: 'Step 4', text: '목요일 운세', highlightPositionId: 5 },
      { stepLabel: 'Step 4', text: '금요일 운세', highlightPositionId: 6 },
      { stepLabel: 'Step 4', text: '토요일 운세', highlightPositionId: 7 },
      { stepLabel: 'Step 4', text: '일요일 운세', highlightPositionId: 8 }
    ]`)
);

fs.writeFileSync('src/components/SpreadGuideTab.tsx', file);
console.log('yearly and weekly updated.');
