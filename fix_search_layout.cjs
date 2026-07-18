const fs = require('fs');

let file = fs.readFileSync('src/components/SpreadGuideTab.tsx', 'utf8');

// Replace the result rendering logic
file = file.replace(
  /\{(?:\(\) => \{)?\s*const codeStr = searchCode\.join\(''\);\s*if \(codeStr\.length === 3\) \{[\s\S]*?return <div className="h-\[60px\] mt-4"><\/div>;\s*(?:\}\)\(\))?\}/,
  `{(() => {
              const codeStr = searchCode.join('');
              return (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-full mt-4 flex flex-col items-center pointer-events-none">
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
                                <span className={\`\${yesNoInfo.color} text-[13px] font-bold tracking-widest mt-1\`}>{yesNoInfo.status}</span>
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
console.log('Search UI layout and animation fixed.');
