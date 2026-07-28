import React from "react";
export const RulebookTab: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col w-full text-black bg-white select-none max-w-md mx-auto tracking-tight break-keep leading-[1.6]">
      {" "}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-8">
        {" "}
        <h1 className="text-[18px] font-light tracking-widest text-black mb-6 text-center uppercase">
          {" "}
          Rulebook{" "}
        </h1>{" "}
        
        {/* Game Introduction Video Placeholder */}
        <div className="w-full aspect-video bg-neutral-100 rounded-2xl flex flex-col items-center justify-center mb-10 text-neutral-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2 opacity-50">
            <circle cx="12" cy="12" r="10"></circle>
            <polygon points="10 8 16 12 10 16 10 8"></polygon>
          </svg>
          <span className="text-[12px] font-medium tracking-widest">게임 소개 영상</span>
        </div>

        <div className="space-y-12 pb-16">
          {" "}
          <section className="space-y-4">
            {" "}
            <h2 className="text-black text-[14px] font-medium tracking-widest pb-2">
              {" "}
              1. 게임 개요{" "}
            </h2>{" "}
            <h3 className="text-black text-[18px] mt-2">
              엉터리 타로술사의 탄생
            </h3>{" "}
            <p className="text-neutral-700 text-[13px] leading-relaxed">
              {" "}
              이 게임은 '엉터리 타로술사'가 되어 서로의 고민을 상담해 주는 파티
              게임입니다. 카드의 원래 의미는 중요하지 않습니다.{" "}
              <strong className="text-black">
                당신의 말이 곧 카드의 의미입니다.
              </strong>{" "}
              가장 그럴싸한 해석으로 의뢰인의 마음을 사로잡아, 많은 복채를
              획득해 최고의 타로술사가 되어보세요!{" "}
            </p>{" "}
            <p className="text-neutral-500 text-[11px]">
              {" "}
              * 4~6인 플레이를 권장합니다.{" "}
            </p>{" "}
          </section>{" "}
          <section className="space-y-4">
            {" "}
            <h2 className="text-black text-[14px] font-medium tracking-widest pb-2">
              {" "}
              2. 준비물{" "}
            </h2>{" "}
            <ul className="text-neutral-700 text-[13px] space-y-2 list-disc list-inside marker:text-black">
              {" "}
              <li>
                Tissue Office Fortune Pack 80장 (the Tissue카드 2장 포함)
              </li>{" "}
              <li>타로 치트키 QR Card 1장</li>{" "}
              <li>게임 코인 20개 + 주사위 1개</li>{" "}
            </ul>{" "}
          </section>{" "}
          <section className="space-y-4">
            {" "}
            <h2 className="text-black text-[14px] font-medium tracking-widest pb-2">
              {" "}
              3. 게임 준비{" "}
            </h2>{" "}
            <p className="text-neutral-700 text-[13px] leading-relaxed">
              {" "}
              타로카드, 복채, 주사위를 세팅한 후 의뢰인을 정합니다. 의뢰인이
              아닌 사람은 모두 타로술사가 됩니다.{" "}
            </p>{" "}
          </section>{" "}
          <section className="space-y-4">
            {" "}
            <h2 className="text-black text-[14px] font-medium tracking-widest pb-2">
              {" "}
              4. 진행 규칙{" "}
            </h2>{" "}
            <ol className="text-neutral-700 text-[13px] space-y-4">
              {" "}
              <li className="flex items-start">
                {" "}
                <span className="text-black mr-3 mt-0.5 font-bold">
                  1.
                </span>{" "}
                <span>의뢰인이 고민 혹은 질문을 말합니다.</span>{" "}
              </li>{" "}
              <li className="flex items-start">
                {" "}
                <span className="text-black mr-3 mt-0.5 font-bold">
                  2.
                </span>{" "}
                <span>
                  의뢰인 바로 왼쪽의 타로술사가 카드를 섞은 뒤 펼칩니다.
                </span>{" "}
              </li>{" "}
              <li className="flex items-start">
                {" "}
                <span className="text-black mr-3 mt-0.5 font-bold">
                  3.
                </span>{" "}
                <span>
                  의뢰인은 카드 3장을{" "}
                  <span className="text-black">주로 사용하는 손의 반대 손</span>
                  으로 뽑습니다.
                </span>{" "}
              </li>{" "}
              <li className="flex items-start">
                {" "}
                <span className="text-black mr-3 mt-0.5 font-bold">
                  4.
                </span>{" "}
                <span>
                  뽑힌 카드 3장을 의뢰인과 타로술사가 함께 확인합니다.
                </span>{" "}
              </li>{" "}
              <li className="flex items-start">
                {" "}
                <span className="text-black mr-3 mt-0.5 font-bold">
                  5.
                </span>{" "}
                <span>
                  먼저 준비된 타로술사가 고민에 대한 카드 해석을 진행합니다.
                </span>{" "}
              </li>{" "}
              <li className="flex items-start">
                {" "}
                <span className="text-black mr-3 mt-0.5 font-bold">
                  6.
                </span>{" "}
                <span>
                  의뢰인은 모든 타로술사들의 해석을 듣고, 누구에게 복채를 줄지
                  결정합니다.
                </span>{" "}
              </li>{" "}
              <li className="flex items-start">
                {" "}
                <span className="text-black mr-3 mt-0.5 font-bold">
                  7.
                </span>{" "}
                <span>
                  복채까지 줬다면 의뢰인의 왼쪽 사람이 새로운 의뢰인이 됩니다.
                </span>{" "}
              </li>{" "}
            </ol>{" "}
          </section>{" "}
          <section className="space-y-4">
            {" "}
            <h2 className="text-black text-[14px] font-medium tracking-widest pb-2">
              {" "}
              5. 세부 규칙 및 제약 사항{" "}
            </h2>{" "}
            <ul className="text-neutral-700 text-[13px] space-y-3">
              {" "}
              <li className="flex items-start">
                {" "}
                <span className="text-black mr-3 mt-0.5">•</span>{" "}
                <span>
                  필요한 경우, 타로술사는 인당 1장의 카드를 추가로 뽑아 3장의
                  카드 중 1장을 가려 새로운 카드로 대체할 수 있습니다.
                </span>{" "}
              </li>{" "}
              <li className="flex items-start">
                {" "}
                <span className="text-black mr-3 mt-0.5">•</span>{" "}
                <span>
                  이때, 추가로 뽑은 카드는{" "}
                  <span className="text-black">반드시 사용</span>해야 합니다.
                </span>{" "}
              </li>{" "}
              <li className="flex items-start">
                {" "}
                <span className="text-black mr-3 mt-0.5">•</span>{" "}
                <span>
                  한번 대체된(덮인) 카드는{" "}
                  <span className="text-black">돌이킬 수 없습니다.</span> 단,
                  다른 타로술사가 새로운 카드로 덮어 대체할 수는 있습니다.
                </span>{" "}
              </li>{" "}
              <li className="flex items-start">
                {" "}
                <span className="text-black mr-3 mt-0.5">•</span>{" "}
                <span>
                  타로술사는 카드의 순서를 마음대로 변경해 해석할 수 있습니다.
                </span>{" "}
              </li>{" "}
            </ul>{" "}
          </section>{" "}
          <section className="space-y-4">
            {" "}
            <h2 className="text-black text-[14px] font-medium tracking-widest pb-2">
              {" "}
              6. 종료 및 승점{" "}
            </h2>{" "}
            <p className="text-neutral-700 text-[13px] leading-relaxed">
              {" "}
              모든 플레이어가 의뢰인이 되고 나면 라운드가 종료됩니다. 라운드는{" "}
              <strong className="text-black">3라운드</strong>를 기본으로
              합니다.{" "}
            </p>{" "}
            <p className="text-neutral-700 text-[13px] leading-relaxed mt-2">
              {" "}
              라운드 종료 후 가진 복채만큼 주사위를 굴려,{" "}
              <strong className="text-black">주사위의 합이 가장 큰 사람</strong>
              이 승리합니다.{" "}
            </p>{" "}
          </section>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
