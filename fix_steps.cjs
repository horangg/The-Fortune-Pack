const fs = require('fs');

let file = fs.readFileSync('src/components/SpreadGuideTab.tsx', 'utf8');

// 1. Update interface
file = file.replace(
  /export interface ReadingStep \{\n  text: string;\n  highlightPositionId\?: number;\n\}/,
  `export interface ReadingStep {\n  text: string;\n  highlightPositionId?: number;\n  stepLabel?: string;\n}`
);

// 2. Update UI
file = file.replace(
  /<span className="text-\[12px\] text-white\/50 tracking-wider">Step \{currentStepIndex \+ 1\}<\/span>/g,
  `<span className="text-[12px] text-white/50 tracking-wider">{currentStep.stepLabel || \`Step \${currentStepIndex + 1}\`}</span>`
);

// 3. Update past-present-future
file = file.replace(
  /readingSteps: \[\s*\{\s*text: '알고 싶은 상황이나 질문에 집중하며 카드를 섞습니다.'\s*\},[\s\S]*?총 6장으로 리딩할 수도 있습니다.\)'\s*\}\s*\]/m,
  `readingSteps: [
      { stepLabel: 'Step 1', text: '알고 싶은 상황이나 질문에 집중하며 카드를 섞습니다.' },
      { stepLabel: 'Step 2', text: '카드를 뒷면이 보이게 부채꼴로 넓게 펼친 후, 주로 사용하지 않는 손으로 카드를 뽑습니다.' },
      { stepLabel: 'Step 3', text: '가로로 세 장의 카드를 순서대로 놓습니다. 카드를 뒤집을 때는 반드시 왼쪽에서 오른쪽 방향으로 뒤집습니다.' },
      { stepLabel: 'Step 3', text: '과거. 최근에 일어났던 일이나 발생한 사건, 배경을 상징합니다.', highlightPositionId: 1 },
      { stepLabel: 'Step 3', text: '현재. 질문자가 현재 처한 상황이나 느끼고 있는 상태를 보여줍니다.', highlightPositionId: 2 },
      { stepLabel: 'Step 3', text: '미래. 앞으로 가까운 미래에 전개될 상황이나 다가올 주요 영향력을 나타냅니다.', highlightPositionId: 3 },
      { stepLabel: 'Step 4', text: '(조언을 더 얻고 싶다면 각 카드 아래에 추가 카드를 한 장씩 더 배치해 총 6장으로 리딩할 수도 있습니다.)' }
    ]`
);

// 4. Update yesno
file = file.replace(
  /id: 'yesno'[\s\S]*?readingSteps: \[\s*\{[\s\S]*?상태를 의미한다.'\s*\}\s*\]/m,
  (match) => match.replace(/readingSteps: \[\s*\{[\s\S]*?상태를 의미한다.'\s*\}\s*\]/m, `readingSteps: [
      { stepLabel: 'Step 1', text: '알고 싶은 상황이나 질문에 집중하며 카드를 섞습니다.' },
      { stepLabel: 'Step 2', text: '카드를 뒷면이 보이게 부채꼴로 넓게 펼친 후, 주로 사용하지 않는 손으로 카드를 뽑습니다.' },
      { stepLabel: 'Step 3', text: '질문을 마음 속으로 생각하며 세 장의 카드를 뽑아 좌, 중, 우 순서대로 놓습니다. 카드를 뒤집을 때는 반드시 왼쪽에서 오른쪽 방향으로 뒤집습니다.', highlightPositionId: 2 },
      { stepLabel: 'Step 4', text: '뽑힌 카드들이 긍정(Yes), 부정(No), 중립(Neutral) 카드인지 분류합니다.\\n3장이 모두 Yes면 확실한 긍정, 2장이 Yes면 긍정적이나 시간이 걸릴 수 있음을 뜻하며, No가 많거나 중립이 섞여 있다면 부정적인 결론에 가깝습니다.' },
      { stepLabel: 'Step 4', text: '*역방향 카드를 사용하는 경우 역방향은 무조건 No로 해석합니다.' },
      { stepLabel: '상세 해석', text: '* Yes 카드: 아래의 No, 중립, 예외 카드를 제외한 모든 카드\\n* No 카드\\n  * 메이저: 죽음, 악마, 탑, 달\\n  * 마이너: 검(3, 5, 6, 7, 8, 9, 10, 기사), 컵(5, 7, 8), 펜타클(5)' },
      { stepLabel: '상세 해석', text: '* 중립 카드: 은둔자, 매달린 사람, 검 4, 컵 4\\n* 조건부 Yes : 지팡이 5, 7\\n  *해당 카드가 나오면 결과는 Yes이지만 원하는 것을 얻기 위해 치열하게 노력하고 싸워야 함을 뜻한다.' },
      { stepLabel: '상세 해석', text: '* 알 수 없음 : 검 2, 지팡이 10\\n  * 해당 카드가 나오면 현재로서는 결과를 알 수 없는 상태를 의미한다.' }
    ]`)
);

// 5. Update celtic-cross
file = file.replace(
  /id: 'celtic-cross'[\s\S]*?readingSteps: \[\s*\{[\s\S]*?세로 열의 맨 꼭대기\)', highlightPositionId: 10\s*\}\s*\]/m,
  (match) => match.replace(/readingSteps: \[\s*\{[\s\S]*?세로 열의 맨 꼭대기\)', highlightPositionId: 10\s*\}\s*\]/m, `readingSteps: [
      { stepLabel: 'Step 1', text: '알고 싶은 상황이나 질문에 집중하며 카드를 섞습니다.' },
      { stepLabel: 'Step 2', text: '카드를 뒷면이 보이게 부채꼴로 넓게 펼친 후, 주로 사용하지 않는 손으로 카드를 뽑습니다.' },
      { stepLabel: 'Step 3', text: '총 10장의 카드를 순서대로 십자가와 우측 세로 기둥 모양으로 배치합니다. 카드를 뒤집을 때는 반드시 왼쪽에서 오른쪽 방향으로 뒤집습니다.' },
      { stepLabel: 'Step 3', text: '본인 / 질문과 관련된 현재 상황 (중앙에 놓음)', highlightPositionId: 1 },
      { stepLabel: 'Step 3', text: '장애물 혹은 보완 요소 (1번 카드 위에 가로질러 놓음)', highlightPositionId: 2 },
      { stepLabel: 'Step 3', text: '도달할 수 있는 최고의 목표/환경적 최선 (1번의 위)', highlightPositionId: 3 },
      { stepLabel: 'Step 3', text: '무의식적 기초 / 리딩을 하게 된 근본적 이유 (1번의 아래)', highlightPositionId: 4 },
      { stepLabel: 'Step 3', text: '과거의 영향 (1번의 왼쪽)', highlightPositionId: 5 },
      { stepLabel: 'Step 3', text: '가까운 미래 (1번의 오른쪽)', highlightPositionId: 6 },
      { stepLabel: 'Step 3', text: '본인의 현재 태도나 마음가짐 (우측 세로 열의 맨 아래)', highlightPositionId: 7 },
      { stepLabel: 'Step 3', text: '주변 환경 및 외적 영향력 (7번의 위)', highlightPositionId: 8 },
      { stepLabel: 'Step 3', text: '희망 혹은 두려움 (8번의 위)', highlightPositionId: 9 },
      { stepLabel: 'Step 3', text: '최종 결과 (9번의 위, 세로 열의 맨 꼭대기)', highlightPositionId: 10 }
    ]`)
);

fs.writeFileSync('src/components/SpreadGuideTab.tsx', file);
console.log('Spreads updated successfully.');
