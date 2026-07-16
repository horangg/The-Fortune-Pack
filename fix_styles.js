import fs from 'fs';
import path from 'path';

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

walk('./src', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let original = content;

    // Remove text sizes, fonts, weights
    content = content.replace(/\b(text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl|\[.*?px\]))\b/g, '');
    content = content.replace(/\b(font-(sans|serif|mono|thin|extralight|light|normal|medium|semibold|bold|extrabold|black))\b/g, '');
    content = content.replace(/\b(tracking-(tighter|tight|normal|wide|wider|widest))\b/g, '');
    
    // Convert amber/yellow to #ffb900
    content = content.replace(/\b(text-(amber|yellow)-[0-9]+)\b/g, 'text-[#ffb900]');
    
    // Remove other colors and rely on global text-white, OR replace them with text-white
    content = content.replace(/\b(text-(white|black|transparent|neutral|gray|slate|stone|zinc|red|orange|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)(-\d+)?(\/[0-9]+)?)\b/g, 'text-white');
    
    // Clean up multiple spaces in classNames
    content = content.replace(/className=(["`])(.*?)\1/g, (match, quote, classes) => {
        const cleaned = classes.replace(/\s+/g, ' ').trim();
        return `className=${quote}${cleaned}${quote}`;
    });

    if (content !== original) {
      fs.writeFileSync(filePath, content);
      console.log(`Updated ${filePath}`);
    }
  }
});
