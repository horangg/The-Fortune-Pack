const fs = require('fs');

let file = fs.readFileSync('src/components/SpreadGuideTab.tsx', 'utf8');

// 1. Remove meaning from yesno
file = file.replace(
  /id: 'yesno'[\s\S]*?positions: \[\s*\{ id: 1, name: '좌', meaning: '뽑힌 카드들이 긍정\(Yes\), 부정\(No\), 중립\(Neutral\) 카드인지 분류합니다.' \},\s*\{ id: 2, name: '중', meaning: '뽑힌 카드들이 긍정\(Yes\), 부정\(No\), 중립\(Neutral\) 카드인지 분류합니다.' \},\s*\{ id: 3, name: '우', meaning: '뽑힌 카드들이 긍정\(Yes\), 부정\(No\), 중립\(Neutral\) 카드인지 분류합니다.' \}\s*\],/m,
  `id: 'yesno',\n    name: 'Yes or No',\n    positions: [\n      { id: 1, name: '좌', meaning: '' },\n      { id: 2, name: '중', meaning: '' },\n      { id: 3, name: '우', meaning: '' }\n    ],`
);

// 2. Update readingSteps for yesno
file = file.replace(
  /id: 'yesno'[\s\S]*?readingSteps: \[\s*\{[\s\S]*?알 수 없는 상태를 의미한다.'\s*\}\s*\]/m,
  (match) => match.replace(/readingSteps: \[\s*\{[\s\S]*?알 수 없는 상태를 의미한다.'\s*\}\s*\]/m, `readingSteps: [
      { stepLabel: 'Step 1', text: '알고 싶은 상황이나 질문에 집중하며 카드를 섞습니다.' },
      { stepLabel: 'Step 2', text: '카드를 뒷면이 보이게 부채꼴로 넓게 펼친 후, 주로 사용하지 않는 손으로 카드를 뽑습니다.' },
      { stepLabel: 'Step 3', text: '질문을 마음 속으로 생각하며 세 장의 카드를 뽑아 좌, 중, 우 순서대로 놓습니다. 카드를 뒤집을 때는 반드시 왼쪽에서 오른쪽 방향으로 뒤집습니다.', highlightPositionId: 2 },
      { stepLabel: 'Step 4', text: '뽑힌 카드들이 긍정, 부정, 중립 인지 확인합니다.' },
      { stepLabel: 'Step 5', text: '3장이 모두 Yes면 확실한 긍정,\\n2장이 Yes면 긍정적이나 시간이 걸릴 수 있음,\\nNo가 많다면 부정적인 결론에 가깝습니다.\\n*역방향 카드를 사용하는 경우 역방향은 무조건 No로 해석합니다.' },
      { stepLabel: '상세 해석', text: '* Yes 카드: 아래의 No, 중립, 예외 카드를 제외한 모든 카드\\n* No 카드\\n  * 메이저: 죽음, 악마, 탑, 달\\n  * 마이너: 검(3, 5, 6, 7, 8, 9, 10, 기사), 컵(5, 7, 8), 펜타클(5)' },
      { stepLabel: '상세 해석', text: '* 중립 카드: 은둔자, 매달린 사람, 검 4, 컵 4\\n* 조건부 Yes : 지팡이 5, 7\\n  *해당 카드가 나오면 결과는 Yes이지만 원하는 것을 얻기 위해 치열하게 노력하고 싸워야 함을 뜻한다.' },
      { stepLabel: '상세 해석', text: '* 알 수 없음 : 검 2, 지팡이 10\\n  * 해당 카드가 나오면 현재로서는 결과를 알 수 없는 상태를 의미한다.' }
    ]`)
);

fs.writeFileSync('src/components/SpreadGuideTab.tsx', file);
console.log('Done 1 and 2.');
