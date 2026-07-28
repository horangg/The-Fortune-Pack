const fs = require('fs');
let file = fs.readFileSync('src/components/SpreadGuideTab.tsx', 'utf8');

file = file.replace(/<img src=\{\`\$\{import\.meta\.env\.BASE_URL\}Table\.png\`\} alt="Table" className="w-full h-auto object-contain pointer-events-none" \/>/, '');
file = file.replace(/<img src=\{\`\$\{import\.meta\.env\.BASE_URL\}icon\/dowm\.png\`\} alt="down" className="h-\[12px\] w-auto object-contain" \/>/g, '<span className="text-[12px] text-white tracking-widest font-bold">V</span>');
file = file.replace(/<img src=\{\`\$\{import\.meta\.env\.BASE_URL\}icon\/left\.png\`\} alt="prev" className="h-\[12px\] w-auto object-contain" \/>/g, '<span className="text-[14px] font-bold">&lt;</span>');
file = file.replace(/<img src=\{\`\$\{import\.meta\.env\.BASE_URL\}icon\/right\.png\`\} alt="next" className="h-\[12px\] w-auto object-contain" \/>/g, '<span className="text-[14px] font-bold">&gt;</span>');

fs.writeFileSync('src/components/SpreadGuideTab.tsx', file, 'utf8');
