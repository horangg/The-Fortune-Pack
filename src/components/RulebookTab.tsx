import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

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
          <p className="text-[#FF9900]">엉터리 타로술사의 탄생</p>
          <p className="text-white leading-[1.6] text-[13px]">
            이 게임은 '엉터리 타로술사'가 되어 서로의 고민을 상담해 주는 파티 게임입니다.
          </p>
          <p className="text-white leading-[1.6] text-[13px]">
            *4~6인 플레이를 권장합니다.
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
            카드의 정해진 의미를 억지로 외울 필요는 없습니다.<br />당신의 말이 곧 카드의 의미입니다.<br />가장 그럴싸한 해석으로 의뢰인의 마음을 사로잡아,<br />가장 많은 복채를 획득해 최고의 타로술사가 되어보세요!
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
            <p className="text-white text-[13px]">Tissue Office Fortune Pack 80장<br />(the Tissue카드 2장 포함)</p>
            <p className="text-white text-[13px]">타로 치트키 QR Card 1장</p>
            <p className="text-white text-[13px]">게임 코인 20개 + 주사위 1개</p>
          </div>
          <div className="pt-4 border-t border-white/10 text-white text-[13px] leading-[1.6]">
            타로카드, 복채, 주사위를 세팅한 후 의뢰인을 정한다.<br />의뢰인이 아닌 사람은 모두 타로술사다.
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
          <p className="text-white"><span className="text-[#FF9900] mr-1">1.</span>의뢰인이 고민 혹은 질문을 말한다.</p>
          <p className="text-white"><span className="text-[#FF9900] mr-1">2.</span>의뢰인 바로 왼쪽의 타로술사가<br />카드를 섞은 뒤 펼친다.</p>
          <p className="text-white"><span className="text-[#FF9900] mr-1">3.</span>의뢰인은 카드 3장을<br /><span className="text-[#FF9900]">주로 사용하는 손의 반대 손</span>으로 뽑는다.</p>
        </div>
      ),
    },
    {
      id: 'step2',
      title: '진행 방식',
      boxText: '타로 카드 해석',
      content: (
        <div className="space-y-4 text-center px-2 text-[13px] leading-[1.6]">
          <p className="text-white"><span className="text-[#FF9900] mr-1">4.</span>뽑힌 카드 3장을<br />의뢰인과 타로술사가 함께 확인한다.</p>
          <p className="text-white"><span className="text-[#FF9900] mr-1">5.</span>먼저 준비된 타로술사가<br />고민에 대한 카드 해석을 진행한다.</p>
        </div>
      ),
    },
    {
      id: 'step3',
      title: '진행 방식',
      boxText: '복채 전달 & 역할 교체',
      content: (
        <div className="space-y-4 text-center px-2 text-[13px] leading-[1.6]">
          <p className="text-white"><span className="text-[#FF9900] mr-1">6.</span>의뢰인은 모든 타로술사들의 해석을 듣고,<br />누구에게 복채를 줄지 결정한다.</p>
          <p className="text-white"><span className="text-[#FF9900] mr-1">7.</span>복채까지 줬다면 의뢰인의 왼쪽 사람이<br />새로운 의뢰인이 된다.</p>
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
            <span className="text-white font-bold mr-1">-</span>
            필요한 경우, 타로술사는 인당 1장의 카드를<br />추가로 뽑아 3장의 카드 중 1장을 가려<br />새로운 카드로 대체할 수 있다.
          </p>
          <p className="text-white">
            <span className="text-white font-bold mr-1">-</span>
            이때, 추가로 뽑은 카드는 <span className="text-[#FF9900]">반드시 사용</span>해야 한다.
          </p>
          <p className="text-white">
            <span className="text-white font-bold mr-1">-</span>
            한번 대체된(덮인) 카드는 돌이킬 수 없다.<br />단, 다른 타로술사가 새로운 카드로 덮어<br />대체할 수는 있다.
          </p>
          <p className="text-white">
            <span className="text-white font-bold mr-1">-</span>
            타로술사는 카드의 순서를 마음대로 변경해<br />해석할 수 있다.
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
          <p className="text-white">모든 플레이어가 의뢰인이 되고 나면 라운드가 종료된다.</p>
          <p className="text-white">라운드는 <span className="text-[#FF9900]">3라운드</span>를 기본으로 한다.</p>
          <p className="text-white">
            라운드 종료 후 가진 복채만큼 주사위를 굴려, 주사위의 합이 가장 큰 사람이 승리한다.
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

  const touchStartY = useRef(0);
  const isSwiping = useRef(false);

  const handleInteraction = () => {
    if (isSwiping.current) return;

    const scrollContainer = document.getElementById('rulebook-scroll');
    if (scrollContainer) {
      const isScrollable = scrollContainer.scrollHeight > scrollContainer.clientHeight;
      const isScrolledToBottom = scrollContainer.scrollHeight - scrollContainer.scrollTop <= scrollContainer.clientHeight + 5;

      if (isScrollable && !isScrolledToBottom) {
        // Scroll down instead of moving to next slide
        scrollContainer.scrollBy({ top: 80, behavior: 'smooth' });
        return;
      }
    }
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

      {/* Center Square Frame (Matches Image) */}
      <div className="flex-1 flex flex-col items-center justify-center py-6">
        <div className="relative flex items-center justify-center">

          {/* Square Outline Box */}
          <div className="w-[200px] h-[200px] border border-white flex items-center justify-center p-4 text-center bg-black/50 select-none shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]">
            <span className="text-[15px] text-white">
              {slides[currentIndex].boxText}
            </span>
          </div>

        </div>
      </div>

      {/* Bottom Area: Title + Dialogue Frame */}
      <div className="w-full flex flex-col items-start gap-1">
        {/* Slide Title Indicator (Outside box, top left) */}
        <div className="text-[11px] text-white/90 uppercase pl-1 tracking-wider">
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
          className="w-full relative cursor-pointer border border-white p-0.5 bg-black hover:border-neutral-300"
        >
          <div className="border border-white p-4 h-auto min-h-[140px] max-h-[25vh] flex flex-col relative bg-black overflow-hidden">

            <div id="rulebook-scroll" className="flex-1 min-h-0 overflow-y-auto pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="w-full flex flex-col">
                {slides[currentIndex].content}
                {/* Spacer block to ensure the last line clears the gradient */}
                <div className="h-16 shrink-0 w-full" aria-hidden="true" />
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
  );
};
