const fs = require('fs');

let file = fs.readFileSync('src/components/SpreadGuideTab.tsx', 'utf8');

// 1. Move Search UI up further and adjust bottom margin (Restore)
file = file.replace(
  /className=\{`flex flex-col items-center -mt-16 mb-4 shrink-0 relative z-20 transition-opacity duration-300/,
  `className={\`flex flex-col items-center -mt-24 mb-2 shrink-0 relative z-20 transition-opacity duration-300`
);

// 2. Restore Animation and Fixed Height Container, incorporating the unified color (#E19D3B)
file = file.replace(
  /\{(?:\(\) => \{)?\s*const codeStr = searchCode\.join\(''\);\s*if \(codeStr\.length === 3\) \{[\s\S]*?return <div className="h-\[60px\] mt-4"><\/div>;\s*(?:\}\)\(\))?\}/,
  `{(() => {
              const codeStr = searchCode.join('');
              return (
                <div className="w-full h-[75px] mt-4 flex flex-col items-center pointer-events-none">
                  <AnimatePresence>
                    {codeStr.length === 3 && (
                      <motion.div
                        key="result"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="flex flex-col items-center"
                      >
                        {(() => {
                          const card = TAROT_CARDS.find(c => c.code === codeStr);
                          if (card) {
                            const yesNoInfo = getYesNoStatus(card);
                            return (
                              <>
                                <span className="text-[#E19D3B] text-[13px] font-bold tracking-widest">{getCardDisplayName(card)}</span>
                                <span className="text-[#E19D3B] text-[13px] font-bold tracking-widest mt-1">{yesNoInfo.status}</span>
                                {yesNoInfo.desc && (
                                  <span className="text-white/60 text-[10px] mt-1 max-w-[280px] text-center leading-relaxed break-keep">
                                    {yesNoInfo.desc}
                                  </span>
                                )}
                              </>
                            );
                          } else {
                            return <span className="text-red-500 text-[13px] mt-1">존재하지 않는 코드입니다</span>;
                          }
                        })()}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })()}`
);

fs.writeFileSync('src/components/SpreadGuideTab.tsx', file);
console.log('Restored layout and animation, and unified colors.');
