const fs = require('fs');

let file = fs.readFileSync('src/components/SpreadGuideTab.tsx', 'utf8');

// 1. Update the layout rendering
const oldLayout = `    if (spread.layout === 'weekly-layout') {
      const radius = 110;
      const angles = {
        1: 51.4,   // 1번: 월
        2: 102.8,  // 2번: 수
        3: 154.2,  // 3번: 금
        4: 205.7,  // 4번: 일
        5: 257.1,  // 5번: 화
        6: 308.5,  // 6번: 목
        7: 0       // 7번: 토
      };

      return (
        <div className="relative w-full h-[320px] mt-4 flex items-center justify-center max-w-[340px] mx-auto">
          {/* Center */}
          <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
            <div className={getCardStyle(1, 'w-[48px]')}>
              <span className="text-white text-[8px] whitespace-pre-line text-center leading-relaxed">{spread.positions[0].name}</span>
            </div>
          </div>
          {/* Circular items */}
          {spread.positions.slice(1).map((pos, i) => {
            const angleDeg = angles[(i + 1) as keyof typeof angles] - 90;
            const angleRad = (angleDeg * Math.PI) / 180;
            const left = \`calc(50% + \${Math.cos(angleRad) * radius}px)\`;
            const top = \`calc(50% + \${Math.sin(angleRad) * radius}px)\`;
            return (
              <div key={pos.id} style={{ position: 'absolute', left, top, transform: 'translate(-50%, -50%)' }}>
                <div className={getCardStyle(pos.id, 'w-[45px]')}>
                  <span className="text-white text-[9px] whitespace-pre-line text-center leading-relaxed">{pos.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      );
    }`;

const newLayout = `    if (spread.layout === 'weekly-layout') {
      const customPositions = {
        1: { x: 90, y: -45 },  // 1번: 월
        2: { x: 90, y: 55 },   // 2번: 수
        3: { x: 38, y: 120 },  // 3번: 금
        4: { x: -38, y: 120 }, // 4번: 일
        5: { x: -90, y: 55 },  // 5번: 화
        6: { x: -90, y: -45 }, // 6번: 목
        7: { x: 0, y: -110 }   // 7번: 토
      };

      return (
        <div className="relative w-full h-[340px] mt-2 flex items-center justify-center max-w-[340px] mx-auto">
          {/* Center */}
          <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
            <div className={getCardStyle(1, 'w-[48px]')}>
              <span className="text-white text-[10px] whitespace-pre-line text-center leading-relaxed">{spread.positions[0].name}</span>
            </div>
          </div>
          {/* Custom positioned items */}
          {spread.positions.slice(1).map((pos, i) => {
            const posData = customPositions[(i + 1) as keyof typeof customPositions];
            const left = \`calc(50% + \${posData.x}px)\`;
            const top = \`calc(50% + \${posData.y}px)\`;
            return (
              <div key={pos.id} style={{ position: 'absolute', left, top, transform: 'translate(-50%, -50%)' }}>
                <div className={getCardStyle(pos.id, 'w-[45px]')}>
                  <span className="text-white text-[11px] whitespace-pre-line text-center leading-relaxed">{pos.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      );
    }`;

file = file.replace(oldLayout, newLayout);

// 2. Update the names in the positions array
const oldPositions = `positions: [
      { id: 1, name: 'Significator\\n일주일 전반', meaning: '일주일 전반의 흐름을 나타냅니다.' },
      { id: 2, name: '월요일', meaning: '1번 카드 (월요일)' },
      { id: 3, name: '수요일', meaning: '2번 카드 (수요일)' },
      { id: 4, name: '금요일', meaning: '3번 카드 (금요일)' },
      { id: 5, name: '일요일', meaning: '4번 카드 (일요일)' },
      { id: 6, name: '화요일', meaning: '5번 카드 (화요일)' },
      { id: 7, name: '목요일', meaning: '6번 카드 (목요일)' },
      { id: 8, name: '토요일', meaning: '7번 카드 (토요일)' }
    ]`;

const newPositions = `positions: [
      { id: 1, name: 'Significator', meaning: '일주일 전반의 흐름을 나타냅니다.' },
      { id: 2, name: '월', meaning: '1번 카드 (월요일)' },
      { id: 3, name: '수', meaning: '2번 카드 (수요일)' },
      { id: 4, name: '금', meaning: '3번 카드 (금요일)' },
      { id: 5, name: '일', meaning: '4번 카드 (일요일)' },
      { id: 6, name: '화', meaning: '5번 카드 (화요일)' },
      { id: 7, name: '목', meaning: '6번 카드 (목요일)' },
      { id: 8, name: '토', meaning: '7번 카드 (토요일)' }
    ]`;

file = file.replace(oldPositions, newPositions);

fs.writeFileSync('src/components/SpreadGuideTab.tsx', file);
console.log('Weekly layout and card names updated.');
