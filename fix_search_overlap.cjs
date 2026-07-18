const fs = require('fs');

let file = fs.readFileSync('src/components/SpreadGuideTab.tsx', 'utf8');

// 1. Move Search UI up further and adjust bottom margin
file = file.replace(
  /className=\{`flex flex-col items-center -mt-16 mb-4 shrink-0 relative z-20 transition-opacity duration-300/,
  `className={\`flex flex-col items-center -mt-24 mb-2 shrink-0 relative z-20 transition-opacity duration-300`
);

// 2. Change absolute positioning to fixed-height normal flow
file = file.replace(
  /<div className="absolute top-full left-1\/2 -translate-x-1\/2 w-full mt-4 flex flex-col items-center pointer-events-none">/,
  `<div className="w-full h-[75px] mt-4 flex flex-col items-center pointer-events-none">`
);

fs.writeFileSync('src/components/SpreadGuideTab.tsx', file);
console.log('Search UI overlap fixed.');
