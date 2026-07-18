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
      id: 'overview',
      title: '게임 개요',
      boxText: '개요 및 목적',
      content: (
        <div className="space-y-2 text-center">
          <p className="text-[#FF9900]">엉터리 타로술사의 탄생</p>
          <p className="text-white leading-[1.6] text-[13px]">
            이 게임은 '엉터리 타로술사'가 되어 서로의 고민을 상담해 주는 파티 게임입니다. 카드의 정해진 의미를 억지로 외울 필요는 없습니다.
          </p>
          <p className="text-white leading-[1.6] text-[13px]">
            당신의 말이 곧 카드의 해석입니다.<br />가장 그럴싸한 해석으로 의뢰인의 마음을 사로잡아, 가장 많은 복채를 획득해 최고의 타로술사가 되어보세요!
          </p>
        </div>
      ),
    },
    {
      id: 'components',
      title: '구성물',
      boxText: '구성품',
      content: (
        <div className="space-y-3 text-center">
          <div className="space-y-1">
            <p className="text-white">Tissue Office Fortune Pack 80장(the Tissue카드 2장 포함)</p>
            <p className="text-white">타로 치트키 QR Card 1장</p>
            <p className="text-white">게임 코인 20개 + 주사위 1개</p>
          </div>
          <div className="pt-2 border-t border-white/10 text-white text-[12px] leading-[1.6]">
            타로카드, 복채, 주사위를 세팅한 후 의뢰인을 정한다. 의뢰인이 아닌 사람은 모두 타로술사다.
          </div>
        </div>
      ),
    },
    {
      id: 'step1',
      title: '진행 방식',
      boxText: '타로카드 펼치기',
      content: (
        <div className="space-y-2 text-left px-2">
          <div className="flex gap-2">
            <span className="text-[#FF9900]">1.</span>
            <p className="text-white">의뢰인이 고민 혹은 질문을 말한다.</p>
          </div>
          <div className="flex gap-2">
            <span className="text-[#FF9900]">2.</span>
            <p className="text-white">의뢰인 바로 왼편에 앉은 사람이 카드를 섞은 뒤 펼친다.</p>
          </div>
          <div className="flex gap-2">
            <span className="text-[#FF9900]">3.</span>
            <p className="text-white">의뢰인이 카드 3장을 주손이 아닌 손으로 뽑는다.</p>
          </div>
        </div>
      ),
    },
    {
      id: 'step2',
      title: '진행 방식',
      boxText: '타로 카드 해석',
      content: (
        <div className="space-y-3 text-left px-2">
          <div className="flex gap-2">
            <span className="text-[#FF9900]">4.</span>
            <p className="text-white">뽑힌 3장을 의뢰인과 타로술사가 함께 확인한다.</p>
          </div>
          <div className="flex gap-2">
            <span className="text-[#FF9900]">5.</span>
            <p className="text-white">먼저 준비된 타로술사가 고민에 대한 카드 해석을 진행한다.</p>
          </div>
        </div>
      ),
    },
    {
      id: 'step3',
      title: '진행 방식',
      boxText: '복채 전달 & 역할 교체',
      content: (
        <div className="space-y-3 text-left px-2">
          <div className="flex gap-2">
            <span className="text-[#FF9900]">6.</span>
            <p className="text-white">의뢰인은 모든 타로술사들의 해석을 듣고, 누구에게 복채를 줄지 결정한다. 결정은 오롯이 의뢰인의 몫이다.</p>
          </div>
          <div className="flex gap-2">
            <span className="text-[#FF9900]">7.</span>
            <p className="text-white">복채까지 줬다면 의뢰인의 왼쪽에 앉은 사람이 새로운 의뢰인이 된다.</p>
          </div>
        </div>
      ),
    },
    {
      id: 'rules',
      title: '규칙 및 제약',
      boxText: '규칙 및 제약 사항',
      content: (
        <div className="space-y-2 text-left text-[12px] leading-[1.6]">
          <p className="text-white">
            • 뽑힌 카드는 <span className="text-[#FF9900]">정방향으로만</span> 해석한다.
          </p>
          <p className="text-white">
            • 타로술사는 필요하다면 추가로 1장의 카드를 뽑아 이미 의뢰인이 뽑은 3장의 카드 중 1장을 가리고 새로운 카드로 대체할 수 있다.
          </p>
          <p className="text-white pl-2">
            - 이때 추가 카드를 덱에서 뽑으면 돌이킬 수는 없고, <span className="text-[#FF9900]">반드시 사용</span>해야 한다.
          </p>
          <p className="text-white pl-2">
            - 타로술사는 카드의 순서를 마음대로 변경해도 된다.
          </p>
          <p className="text-white pl-2">
            - 한번 새로운 카드로 대체된(덮인) 카드는 돌이킬 수 없다. 단, 다른 타로술사가 새로운 카드로 새롭게 대체할 수는 있다.
          </p>
        </div>
      ),
    },
    {
      id: 'end',
      title: '종료 및 승점',
      boxText: '종료 및 승점 계산',
      content: (
        <div className="space-y-2 text-center">
          <p className="text-white">모든 플레이어가 의뢰인이 되고 나면 라운드가 종료된다.</p>
          <p className="text-white">라운드는 <span className="text-[#FF9900]">3라운드</span>를 기본으로 한다.</p>
          <p className="text-white">
            라운드 종료 후 가진 복채만큼 주사위를 굴려, 주사위의 합이 가장 큰 사람이 승리한다.
          </p>
          <p className="pt-2 text-[#FF9900] text-[13px]">
            가장 많은 코인을 보유한 타로술사가 최종 승자가 됩니다!
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

        {/* Index Selector (Stage selector style) */}
        <div className="flex flex-wrap gap-1.5 justify-center">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(idx)}
              className={`px-2 py-1 text-[11px]  border transition-all cursor-pointer ${currentIndex === idx
                ? 'bg-white text-white border-white '
                : 'bg-black text-white border-neutral-800 hover:border-neutral-500 hover:text-white'
                }`}
            >
              {`0${idx + 1}`}
            </button>
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
          <div className="border border-white p-4 h-[160px] flex flex-col relative bg-black overflow-hidden">

            <div id="rulebook-scroll" className="flex-1 flex flex-col overflow-y-auto pr-2 pb-14 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="w-full flex flex-col min-h-full">
                {slides[currentIndex].content}
              </div>
            </div>

            {/* Gradient and Arrow at the bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black via-black/90 to-transparent flex items-end justify-center pb-2 pointer-events-none">
              <div className="animate-bounce">
                <img
                  src={`${import.meta.env.BASE_URL}icon/dowm.png`}
                  alt="Down"
                  className="w-4 h-4 object-contain opacity-80"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};
