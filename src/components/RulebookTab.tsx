import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Typewriter } from './Typewriter';

interface RuleSlide {
  id: string;
  title: string;
  boxText: string;
  content: React.ReactNode;
}

export const RulebookTab: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const slides: RuleSlide[] = [
    {
      id: 'overview1',
      title: '게임 개요',
      boxText: '개요 및 목적',
      content: (
        <div className="space-y-4 text-center">
          <p className="text-[#FF9900]"><Typewriter text="엉터리 타로술사의 탄생" speed={40}/></p>
          <p className="text-white leading-[1.6] text-[13px]">
            <Typewriter text="이 게임은 '엉터리 타로술사'가 되어 서로의 고민을 상담해 주는 파티 게임입니다." speed={40} delay={530}/>
          </p>
          <p className="text-white/60 leading-[1.6] text-[13px]">
            <Typewriter text="*4~6인 플레이를 권장합니다." speed={40} delay={2380}/>
          </p>
        </div>
      ),
    },
    {
      id: 'overview2',
      title: '게임 개요',
      boxText: '개요 및 목적',
      content: (
        <div className="space-y-4 text-center mt-4">
          <p className="text-white leading-[1.6] text-[13px]">
            <Typewriter text={"카드의 정해진 의미를 억지로 외울 필요는 없습니다.\n당신의 말이 곧 카드의 의미입니다."} speed={40}/>
          </p>
          <p className="text-white leading-[1.6] text-[13px]">
            <Typewriter text={"가장 그럴싸한 해석으로 의뢰인의 마음을 사로잡아,\n가장 많은 복채를 획득해 최고의 타로술사가 되어보세요!"} speed={40} delay={1970}/>
          </p>
        </div>
      ),
    },
    {
      id: 'components',
      title: '구성물',
      boxText: '구성품',
      content: (
        <div className="space-y-4 text-center">
          <div className="space-y-2">
            <p className="text-white text-[13px]"><Typewriter text={"Tissue Office Fortune Pack 80장\n(the Tissue카드 2장 포함)"} speed={30}/></p>
            <p className="text-white text-[13px]"><Typewriter text="타로 치트키 QR Card 1장" speed={30} delay={1580}/></p>
            <p className="text-white text-[13px]"><Typewriter text="게임 코인 20개 + 주사위 1개" speed={30} delay={2140}/></p>
          </div>
          <div className="pt-4 border-t border-white/10 text-white text-[13px] leading-[1.6]">
            <Typewriter text={"타로카드, 복채, 주사위를 세팅한 후 의뢰인을 정한다.\n의뢰인이 아닌 사람은 모두 타로술사다."} speed={30} delay={2730}/>
          </div>
        </div>
      ),
    },
    {
      id: 'step1',
      title: '진행 방식',
      boxText: '타로카드 펼치기',
      content: (
        <div className="space-y-4 text-center px-2 text-[13px] leading-[1.6]">
          <p className="text-white"><span className="text-[#FF9900] mr-1"><Typewriter text={"1."} speed={30}/></span><Typewriter text="의뢰인이 고민 혹은 질문을 말한다." speed={30} delay={110}/></p>
          <p className="text-white"><span className="text-[#FF9900] mr-1"><Typewriter text={"2."} speed={30} delay={730}/></span><Typewriter text={"의뢰인 바로 왼쪽의 타로술사가\n카드를 섞은 뒤 펼친다."} speed={30} delay={840}/></p>
          <p className="text-white"><span className="text-[#FF9900] mr-1"><Typewriter text={"3."} speed={30} delay={1790}/></span><Typewriter text={"의뢰인은 카드 3장을\n"} speed={30} delay={1900}/><span className="text-[#FF9900]"><Typewriter text="주로 사용하는 손의 반대 손" speed={30} delay={2310}/></span><Typewriter text="으로 뽑는다." speed={30} delay={2810}/></p>
        </div>
      ),
    },
    {
      id: 'step2',
      title: '진행 방식',
      boxText: '타로 카드 해석',
      content: (
        <div className="space-y-4 text-center px-2 text-[13px] leading-[1.6]">
          <p className="text-white"><span className="text-[#FF9900] mr-1"><Typewriter text={"4."} speed={30}/></span><Typewriter text={"뽑힌 카드 3장을\n의뢰인과 타로술사가 함께 확인한다."} speed={30} delay={110}/></p>
          <p className="text-white"><span className="text-[#FF9900] mr-1"><Typewriter text={"5."} speed={30} delay={1030}/></span><Typewriter text={"먼저 준비된 타로술사가\n고민에 대한 카드 해석을 진행한다."} speed={30} delay={1140}/></p>
        </div>
      ),
    },
    {
      id: 'step3',
      title: '진행 방식',
      boxText: '복채 전달 & 역할 교체',
      content: (
        <div className="space-y-4 text-center px-2 text-[13px] leading-[1.6]">
          <p className="text-white"><span className="text-[#FF9900] mr-1"><Typewriter text={"6."} speed={30}/></span><Typewriter text={"의뢰인은 모든 타로술사들의 해석을 듣고,\n누구에게 복채를 줄지 결정한다."} speed={30} delay={110}/></p>
          <p className="text-white"><span className="text-[#FF9900] mr-1"><Typewriter text={"7."} speed={30} delay={1360}/></span><Typewriter text={"복채까지 줬다면 의뢰인의 왼쪽 사람이\n새로운 의뢰인이 된다."} speed={30} delay={1470}/></p>
        </div>
      ),
    },
    {
      id: 'rules',
      title: '규칙 및 제약',
      boxText: '규칙 및 제약 사항',
      content: (
        <div className="space-y-4 text-center text-[13px] leading-[1.6]">
          <p className="text-white">
            <span className="text-white font-bold mr-1"><Typewriter text={"-"} speed={30}/></span>
            <Typewriter text={"필요한 경우, 타로술사는 인당 1장의 카드를\n추가로 뽑아 3장의 카드 중 1장을 가려\n새로운 카드로 대체할 수 있다."} speed={30} delay={80}/>
          </p>
          <p className="text-white">
            <span className="text-white font-bold mr-1">-</span>
            <Typewriter text="이때, 추가로 뽑은 카드는 " speed={30} delay={2080}/><span className="text-[#FF9900]"><Typewriter text="반드시 사용" speed={30} delay={2580}/></span><Typewriter text="해야 한다." speed={30} delay={2810}/>
          </p>
          <p className="text-white">
            <span className="text-white font-bold mr-1"><Typewriter text={"-"} speed={30} delay={3040}/></span>
            <Typewriter text={"한번 대체된(덮인) 카드는 돌이킬 수 없다.\n단, 다른 타로술사가 새로운 카드로 덮어\n대체할 수는 있다."} speed={30} delay={3120}/>
          </p>
          <p className="text-white">
            <span className="text-white font-bold mr-1"><Typewriter text={"-"} speed={30} delay={4910}/></span>
            <Typewriter text={"타로술사는 카드의 순서를 마음대로 변경해\n해석할 수 있다."} speed={30} delay={4990}/>
          </p>
        </div>
      ),
    },
    {
      id: 'end',
      title: '종료 및 승점',
      boxText: '종료 및 승점 계산',
      content: (
        <div className="space-y-4 text-center text-[13px] leading-[1.6]">
          <p className="text-white"><Typewriter text="모든 플레이어가 의뢰인이 되고 나면 라운드가 종료된다." speed={30}/></p>
          <p className="text-white"><Typewriter text="라운드는 " speed={30} delay={950}/><span className="text-[#FF9900]"><Typewriter text="3라운드" speed={30} delay={1150}/></span><Typewriter text="를 기본으로 한다." speed={30} delay={1320}/></p>
          <p className="text-white">
            <Typewriter text={"라운드 종료 후 가진 복채만큼 주사위를 굴려,\n주사위의 합이 가장 큰 사람이 승리한다."} speed={30} delay={1670}/>
          </p>
        </div>
      ),
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  useEffect(() => {
    const scrollContainer = document.getElementById('rulebook-scroll');
    if (scrollContainer) {
      scrollContainer.scrollTop = 0;
    }
  }, [currentIndex]);

  useEffect(() => {
    const scrollContainer = document.getElementById('rulebook-scroll');
    const contentInner = document.getElementById('rulebook-content-inner');
    if (!scrollContainer || !contentInner) return;

    const observer = new MutationObserver(() => {
      // If near the bottom, auto-scroll down naturally
      const isAtBottom = scrollContainer.scrollHeight - scrollContainer.scrollTop <= scrollContainer.clientHeight + 60;
      if (isAtBottom) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    });

    observer.observe(contentInner, { childList: true, subtree: true, characterData: true });

    return () => observer.disconnect();
  }, [currentIndex]);

  const touchStartY = useRef(0);
  const isSwiping = useRef(false);

  const handleInteraction = () => {
    if (isSwiping.current) return;
    nextSlide();
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-6 py-4 w-full text-white bg-black select-none max-w-md mx-auto tracking-tight break-keep leading-[1.6]">

      {/* Upper header section */}
      <div className="space-y-3">

        {/* Progress Indicator (Line + Circle style) */}
        <div className="flex items-center justify-center w-full px-4 pt-2">
          {slides.map((slide, idx) => (
            <React.Fragment key={slide.id}>
              {/* Circle */}
              <button
                onClick={() => setCurrentIndex(idx)}
                className={`relative rounded-full transition-all duration-300 z-10 cursor-pointer outline-none shrink-0 ${currentIndex === idx
                  ? 'w-3 h-3 bg-[#FF9900] shadow-[0_0_8px_#FF9900]'
                  : currentIndex > idx
                    ? 'w-2 h-2 bg-white/80 hover:bg-white hover:scale-125'
                    : 'w-2 h-2 bg-neutral-600 hover:bg-neutral-400 hover:scale-125'
                  }`}
              />
              {/* Line */}
              {idx < slides.length - 1 && (
                <div className={`h-[1px] flex-1 max-w-[16px] transition-all duration-300 ${currentIndex > idx ? 'bg-white/80' : 'bg-neutral-600'
                  }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Center Image */}
      <div className="flex-1 flex flex-col items-center justify-center py-6 mt-8">
        <div className="relative flex items-center justify-center">

          <img
            src={`${import.meta.env.BASE_URL}tarot master.png`}
            alt="Tarot Master"
            className="w-[240px] h-[240px] object-contain opacity-90"
          />

        </div>
      </div>

      {/* Bottom Area: Title + Dialogue Frame */}
      <div className="w-full max-w-[340px] mx-auto flex flex-col items-start gap-1 shrink-0 pb-4">
        {/* Slide Title Indicator (Outside box, top left) */}
        <div className="text-[11px] text-white/90 uppercase pl-1 tracking-wider font-sans">
          {slides[currentIndex].title}
        </div>

        {/* Bottom Double-Border Dialogue Frame */}
        <div
          onClick={handleInteraction}
          onTouchStart={(e) => {
            touchStartY.current = e.touches[0].clientY;
            isSwiping.current = false;
          }}
          onTouchMove={(e) => {
            if (Math.abs(e.touches[0].clientY - touchStartY.current) > 10) {
              isSwiping.current = true;
            }
          }}
          className="w-full relative cursor-pointer font-serif"
        >
          <div className="border-[1.5px] border-white p-[3px] bg-black h-[155px]">
            <div className="border-[1.5px] border-white h-full relative overflow-hidden flex flex-col bg-black">

              <div id="rulebook-scroll" className="flex-1 min-h-0 overflow-y-auto px-4 pt-4 pb-14 custom-scrollbar">
                <div id="rulebook-content-inner" className="w-full flex flex-col">
                  <div key={currentIndex}>
                    {slides[currentIndex].content}
                  </div>
                </div>
              </div>

            {/* Gradient and Previous/Next buttons at the bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-black via-black/90 to-transparent flex items-end justify-between px-6 pb-4 pointer-events-none">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(Math.max(0, currentIndex - 1));
                }}
                className={`flex items-center gap-2 hover:opacity-70 transition-opacity z-10 bg-black px-1 pointer-events-auto ${currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'animate-bounce-left'}`}
              >
                <img src={`${import.meta.env.BASE_URL}icon/left.png`} alt="prev" className="h-[12px] w-auto object-contain" />
                <span className="text-white text-[13px] tracking-widest leading-none">이전</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleInteraction();
                }}
                className={`flex items-center gap-2 hover:opacity-70 transition-opacity z-10 bg-black px-1 pointer-events-auto ${currentIndex === slides.length - 1 ? 'opacity-0 pointer-events-none' : 'animate-bounce-right'}`}
              >
                <span className="text-white text-[13px] tracking-widest leading-none">다음</span>
                <img src={`${import.meta.env.BASE_URL}icon/right.png`} alt="next" className="h-[12px] w-auto object-contain" />
              </button>
            </div>

          </div>
        </div>
      </div>
      </div>

    </div>
  );
};
