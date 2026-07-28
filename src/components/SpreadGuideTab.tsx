import React, { useState } from "react";
import { TAROT_CARDS } from "../data/tarotData";
import { TarotCard } from "../types";
interface PositionDef {
  id: number;
  name: string;
  meaning: string;
}
interface ReadingStep {
  text: string;
  highlightPositionId?: number;
  stepLabel?: string;
  subText?: string;
}
type SpreadId =
  | "one-card"
  | "past-present-future"
  | "yesno"
  | "celtic-cross"
  | "choices"
  | "love"
  | "yearly"
  | "monthly"
  | "weekly";
interface SpreadDef {
  id: SpreadId;
  name: string;
  displayName: string;
  layout:
    | "1-card"
    | "3-card"
    | "4-card"
    | "5-card"
    | "celtic-cross"
    | "love-cross"
    | "yearly-layout"
    | "monthly-layout"
    | "weekly-layout"
    | "placeholder";
  description: string;
  readingSteps: ReadingStep[];
  positions: PositionDef[];
}
const SPREADS: SpreadDef[] = [
  {
    id: "one-card",
    name: "원 카드 리딩",
    displayName: "원\n카드",
    layout: "1-card",
    description:
      "데일리 리딩이나 빠르고 직관적인 조언이 필요할 때 사용합니다.\n예/아니오 보다는 구체적인 질문에 적합합니다.",
    readingSteps: [
      {
        stepLabel: "Step 1",
        text: "알고 싶은 상황이나 질문에 집중하며 카드를 섞습니다.",
      },
      {
        stepLabel: "Step 2",
        text: "카드를 뒷면이 보이게 부채꼴로 넓게 펼친 후, 주로 사용하지 않는 손으로 카드를 뽑습니다.",
      },
      {
        stepLabel: "Step 3",
        text: "카드를 뒤집을 때는 반드시 왼쪽에서 오른쪽 방향으로 뒤집습니다.",
        highlightPositionId: 1,
      },
    ],
    positions: [
      {
        id: 1,
        name: "결과",
        meaning: "질문에 대한 직접적인 답변이나 조언을 상징합니다.",
      },
    ],
  },
  {
    id: "past-present-future",
    name: "과거, 현재, 미래",
    displayName: "과거\n현재\n미래",
    layout: "3-card",
    description:
      "미니 리딩이나 전반적인 상황 흐름을\n빠르게 파악하고 싶을 때 적합합니다.",
    readingSteps: [
      {
        stepLabel: "Step 1",
        text: "알고 싶은 상황이나 질문에 집중하며 카드를 섞습니다.",
      },
      {
        stepLabel: "Step 2",
        text: "카드를 뒷면이 보이게 부채꼴로 넓게 펼친 후, 주로 사용하지 않는 손으로 카드를 뽑습니다.",
      },
      {
        stepLabel: "Step 3",
        text: "가로로 세 장의 카드를 순서대로 놓습니다. 카드를 뒤집을 때는 반드시 왼쪽에서 오른쪽 방향으로 뒤집습니다.",
      },
      {
        stepLabel: "Step 3",
        text: "과거. 최근에 일어났던 일이나 발생한 사건, 배경을 상징합니다.",
        highlightPositionId: 1,
      },
      {
        stepLabel: "Step 3",
        text: "현재. 질문자가 현재 처한 상황이나 느끼고 있는 상태를 보여줍니다.",
        highlightPositionId: 2,
      },
      {
        stepLabel: "Step 3",
        text: "미래. 앞으로 가까운 미래에 전개될 상황이나 다가올 주요 영향력을 나타냅니다.",
        highlightPositionId: 3,
      },
      {
        stepLabel: "Step 4",
        text: "(조언을 더 얻고 싶다면 각 카드 아래에 추가 카드를 한 장씩 더 배치해 총 6장으로 리딩할 수도 있습니다.)",
      },
    ],
    positions: [
      {
        id: 1,
        name: "과거",
        meaning: "최근에 일어났던 일이나 발생한 사건, 배경을 상징합니다.",
      },
      {
        id: 2,
        name: "현재",
        meaning: "질문자가 현재 처한 상황이나 느끼고 있는 상태를 보여줍니다.",
      },
      {
        id: 3,
        name: "미래",
        meaning:
          "앞으로 가까운 미래에 전개될 상황이나 다가올 주요 영향력을 나타냅니다.",
      },
    ],
  },
  {
    id: "yesno",
    name: "Yes or No",
    displayName: "Yes\nNo",
    layout: "3-card",
    description: "빠르게 명확한 결정을\n내리고 싶을 때 적합합니다.",
    readingSteps: [
      {
        stepLabel: "Step 1",
        text: "알고 싶은 상황이나 질문에 집중하며 카드를 섞습니다.",
      },
      {
        stepLabel: "Step 2",
        text: "카드를 뒷면이 보이게 부채꼴로 넓게 펼친 후, 주로 사용하지 않는 손으로 카드를 뽑습니다.",
      },
      {
        stepLabel: "Step 3",
        text: "질문을 마음 속으로 생각하며 세 장의 카드를 뽑아 순서대로 놓습니다. 카드를 뒤집을 때는 반드시 왼쪽에서 오른쪽 방향으로 뒤집습니다.",
      },
      {
        stepLabel: "Step 4",
        text: "뽑힌 카드의 긍정/부정/중립 여부를 확인합니다.",
        subText: "*숫자코드를 입력해 확인하세요.",
      },
      {
        stepLabel: "Step 5",
        text: "3장이 모두 Yes면 확실한 긍정,\n2장이 Yes면 긍정적이나 시간이 걸릴 수 있음,\nNo가 많다면 부정적인 결론에 가깝습니다.\n*역방향은 무조건 No로 해석합니다.",
      },
    ],
    positions: [
      { id: 1, name: "?", meaning: "" },
      { id: 2, name: "?", meaning: "" },
      { id: 3, name: "?", meaning: "" },
    ],
  },
  {
    id: "celtic-cross",
    name: "켈틱 크로스 (The Celtic Cross)",
    displayName: "자세한\n해석",
    layout: "celtic-cross",
    description:
      "질문에 대해 상세히 분석하거나,\n전반적인 흐름과 장애물을 짚어보고 싶을 때 적합합니다.",
    readingSteps: [
      {
        stepLabel: "Step 1",
        text: "알고 싶은 상황이나 질문에 집중하며 카드를 섞습니다.",
      },
      {
        stepLabel: "Step 2",
        text: "카드를 뒷면이 보이게 부채꼴로 넓게 펼친 후, 주로 사용하지 않는 손으로 카드를 뽑습니다.",
      },
      {
        stepLabel: "Step 3",
        text: "총 10장의 카드를 순서대로 십자가와 우측 세로 기둥 모양으로 배치합니다. 카드를 뒤집을 때는 반드시 왼쪽에서 오른쪽 방향으로 뒤집습니다.",
      },
      { stepLabel: "Step 3", text: "1 현재", highlightPositionId: 1 },
      { stepLabel: "Step 3", text: "2 장애물, 과제", highlightPositionId: 2 },
      { stepLabel: "Step 3", text: "3 무의식", highlightPositionId: 3 },
      { stepLabel: "Step 3", text: "4 과거", highlightPositionId: 4 },
      { stepLabel: "Step 3", text: "5 목표, 가능성", highlightPositionId: 5 },
      { stepLabel: "Step 3", text: "6 가까운 미래", highlightPositionId: 6 },
      { stepLabel: "Step 3", text: "7 태도", highlightPositionId: 7 },
      { stepLabel: "Step 3", text: "8 외부 영향", highlightPositionId: 8 },
      { stepLabel: "Step 3", text: "9 희망/두려움", highlightPositionId: 9 },
      { stepLabel: "Step 3", text: "10 결과", highlightPositionId: 10 },
    ],
    positions: [
      { id: 1, name: "1", meaning: "메인 이슈와 그를 둘러싼 전반적인 상황" },
      {
        id: 2,
        name: "2",
        meaning:
          "목표를 달성하는 과정에서 가로막고 있는 주요 장애물, 도전 과제, 혹은 보완해야 할 요소",
      },
      {
        id: 3,
        name: "3",
        meaning:
          "질문자가 처한 현재의 구체적인 상황이나 마음가짐, 혹은 이 리딩을 하게 만든 무의식적 배경",
      },
      {
        id: 4,
        name: "4",
        meaning:
          "현재의 이슈와 직접적으로 연결된 최근의 사건이나 핵심적인 과거의 흐름",
      },
      {
        id: 5,
        name: "5",
        meaning:
          "주어진 상황에서 도달할 수 있는 환경적인 최선이나 최고의 목표, 혹은 다가올 중간 단계의 흐름",
      },
      {
        id: 6,
        name: "6",
        meaning: "곧 맞이하게 될 다가오는 변화, 가까운 미래",
      },
      {
        id: 7,
        name: "7",
        meaning:
          "이 상황을 대하는 질문자 본인의 내면적 태도, 마음가짐, 정신 상태, 혹은 본인의 강점과 약점",
      },
      { id: 8, name: "8", meaning: "외부 환경이 메인 이슈에 미치는 영향력" },
      {
        id: 9,
        name: "9",
        meaning:
          "내면의 긍정적인 기대와 변화에 대한 자신감, 혹은 스스로를 제약하고 주저하게 만드는 심리적 요인",
      },
      {
        id: 10,
        name: "10",
        meaning:
          "현재의 흐름이 이어졌을 때 맞이하게 될 가장 유력한 최종 결과물",
      },
    ],
  },
  {
    id: "choices",
    name: "양자택일",
    displayName: "양자\n택일",
    layout: "5-card",
    description: "두 가지 선택지 사이에서\n고민하는 상황에 적합합니다.",
    readingSteps: [
      { text: "알고 싶은 상황이나 질문에 집중하며 카드를 섞습니다." },
      {
        text: "카드를 뒷면이 보이게 부채꼴로 넓게 펼친 후, 주로 사용하지 않는 손으로 카드를 뽑습니다.",
      },
      {
        text: "총 5장의 카드를 순서대로 배치합니다. 카드를 뒤집을 때는 반드시 왼쪽에서 오른쪽 방향으로 뒤집습니다.",
      },
    ],
    positions: [
      {
        id: 1,
        name: "1번 카드",
        meaning: "총 5장의 카드를 순서대로 배치합니다.",
      },
      {
        id: 2,
        name: "2번 카드",
        meaning: "총 5장의 카드를 순서대로 배치합니다.",
      },
      {
        id: 3,
        name: "3번 카드",
        meaning: "총 5장의 카드를 순서대로 배치합니다.",
      },
      {
        id: 4,
        name: "4번 카드",
        meaning: "총 5장의 카드를 순서대로 배치합니다.",
      },
      {
        id: 5,
        name: "5번 카드",
        meaning: "총 5장의 카드를 순서대로 배치합니다.",
      },
    ],
  },
  {
    id: "love",
    name: "연애운",
    displayName: "연애운",
    layout: "love-cross",
    description:
      "상대방의 마음을 읽거나\n관계의 흐름을 파악하고자 할 때 적합합니다.",
    readingSteps: [
      { text: "알고 싶은 상황이나 질문에 집중하며 카드를 섞습니다." },
      {
        text: "카드를 뒷면이 보이게 부채꼴로 넓게 펼친 후, 주로 사용하지 않는 손으로 카드를 뽑습니다.",
      },
      {
        text: "5장의 카드를 뽑아 구도에 맞게 배치합니다. 카드를 뒤집을 때는 반드시 왼쪽에서 오른쪽 방향으로 뒤집습니다.",
      },
    ],
    positions: [
      {
        id: 1,
        name: "1번 카드",
        meaning: "5장의 카드를 뽑아 구도에 맞게 배치합니다.",
      },
      {
        id: 2,
        name: "2번 카드",
        meaning: "5장의 카드를 뽑아 구도에 맞게 배치합니다.",
      },
      {
        id: 3,
        name: "3번 카드",
        meaning: "5장의 카드를 뽑아 구도에 맞게 배치합니다.",
      },
      {
        id: 4,
        name: "4번 카드",
        meaning: "5장의 카드를 뽑아 구도에 맞게 배치합니다.",
      },
      {
        id: 5,
        name: "5번 카드",
        meaning: "5장의 카드를 뽑아 구도에 맞게 배치합니다.",
      },
    ],
  },
  {
    id: "yearly",
    name: "1년 운세",
    displayName: "1년\n운세",
    layout: "yearly-layout",
    description:
      "앞으로 다가올 1년 동안의\n흐름을 파악하고 싶을 때 적합합니다.",
    readingSteps: [
      { text: "알고 싶은 상황이나 질문에 집중하며 카드를 섞습니다." },
      {
        text: "카드를 뒷면이 보이게 부채꼴로 넓게 펼친 후, 주로 사용하지 않는 손으로 카드를 뽑습니다.",
      },
      {
        text: "리딩의 기준이 되는 시그니피케이터 카드를 가장 먼저 중앙에 놓습니다.",
        highlightPositionId: 1,
      },
      {
        text: "현재 월 부터 시작하여 시계 방향으로 순서대로 카드를 놓습니다. 각 카드는 해당 월의 운세와 영향을 나타냅니다. 카드를 뒤집을 때는 반드시 왼쪽에서 오른쪽 방향으로 뒤집습니다.",
      },
    ],
    positions: [
      {
        id: 1,
        name: "중앙",
        meaning:
          "리딩의 기준이 되는 시그니피케이터 카드를 가장 먼저 중앙에 놓습니다.",
      },
      {
        id: 2,
        name: "현재 월",
        meaning: "각 카드는 해당 월의 운세와 영향을 나타냅니다.",
      },
      {
        id: 3,
        name: "1개월 후",
        meaning: "각 카드는 해당 월의 운세와 영향을 나타냅니다.",
      },
      {
        id: 4,
        name: "2개월 후",
        meaning: "각 카드는 해당 월의 운세와 영향을 나타냅니다.",
      },
      {
        id: 5,
        name: "3개월 후",
        meaning: "각 카드는 해당 월의 운세와 영향을 나타냅니다.",
      },
      {
        id: 6,
        name: "4개월 후",
        meaning: "각 카드는 해당 월의 운세와 영향을 나타냅니다.",
      },
      {
        id: 7,
        name: "5개월 후",
        meaning: "각 카드는 해당 월의 운세와 영향을 나타냅니다.",
      },
      {
        id: 8,
        name: "6개월 후",
        meaning: "각 카드는 해당 월의 운세와 영향을 나타냅니다.",
      },
      {
        id: 9,
        name: "7개월 후",
        meaning: "각 카드는 해당 월의 운세와 영향을 나타냅니다.",
      },
      {
        id: 10,
        name: "8개월 후",
        meaning: "각 카드는 해당 월의 운세와 영향을 나타냅니다.",
      },
      {
        id: 11,
        name: "9개월 후",
        meaning: "각 카드는 해당 월의 운세와 영향을 나타냅니다.",
      },
      {
        id: 12,
        name: "10개월 후",
        meaning: "각 카드는 해당 월의 운세와 영향을 나타냅니다.",
      },
      {
        id: 13,
        name: "11개월 후",
        meaning: "각 카드는 해당 월의 운세와 영향을 나타냅니다.",
      },
    ],
  },
  {
    id: "monthly",
    name: "1달 운세",
    displayName: "1달\n운세",
    layout: "monthly-layout",
    description:
      "향후 4주일 동안 나에게 미칠\n영향력과 흐름을 확인하고 싶을 때 적합합니다.",
    readingSteps: [
      { text: "알고 싶은 상황이나 질문에 집중하며 카드를 섞습니다." },
      {
        text: "카드를 뒷면이 보이게 부채꼴로 넓게 펼친 후, 주로 사용하지 않는 손으로 카드를 뽑습니다.",
      },
      {
        text: "1주마다 2장의 카드를 배치하여 총 8장의 카드로 4주간의 운세를 리딩합니다. 카드를 뒤집을 때는 반드시 왼쪽에서 오른쪽 방향으로 뒤집습니다.",
      },
    ],
    positions: [
      {
        id: 1,
        name: "1주차",
        meaning:
          "1주마다 2장의 카드를 배치하여 총 8장의 카드로 4주간의 운세를 리딩합니다.",
      },
      {
        id: 2,
        name: "1주차",
        meaning:
          "1주마다 2장의 카드를 배치하여 총 8장의 카드로 4주간의 운세를 리딩합니다.",
      },
      {
        id: 3,
        name: "2주차",
        meaning:
          "1주마다 2장의 카드를 배치하여 총 8장의 카드로 4주간의 운세를 리딩합니다.",
      },
      {
        id: 4,
        name: "2주차",
        meaning:
          "1주마다 2장의 카드를 배치하여 총 8장의 카드로 4주간의 운세를 리딩합니다.",
      },
      {
        id: 5,
        name: "3주차",
        meaning:
          "1주마다 2장의 카드를 배치하여 총 8장의 카드로 4주간의 운세를 리딩합니다.",
      },
      {
        id: 6,
        name: "3주차",
        meaning:
          "1주마다 2장의 카드를 배치하여 총 8장의 카드로 4주간의 운세를 리딩합니다.",
      },
      {
        id: 7,
        name: "4주차",
        meaning:
          "1주마다 2장의 카드를 배치하여 총 8장의 카드로 4주간의 운세를 리딩합니다.",
      },
      {
        id: 8,
        name: "4주차",
        meaning:
          "1주마다 2장의 카드를 배치하여 총 8장의 카드로 4주간의 운세를 리딩합니다.",
      },
    ],
  },
  {
    id: "weekly",
    name: "1주일 운세",
    displayName: "1주일\n운세",
    layout: "weekly-layout",
    description: "한 주 동안 매일의 운세를\n살펴보고자 할 때 적합합니다.",
    readingSteps: [
      {
        stepLabel: "Step 1",
        text: "알고 싶은 상황이나 질문에 집중하며 카드를 섞습니다.",
      },
      {
        stepLabel: "Step 2",
        text: "카드를 뒷면이 보이게 부채꼴로 넓게 펼친 후, 주로 사용하지 않는 손으로 카드를 뽑습니다.",
      },
      {
        stepLabel: "Step 3",
        text: "Significator 카드를 뽑아 중앙에 위치합니다.",
        highlightPositionId: 1,
      },
      {
        stepLabel: "Step 4",
        text: "그 주변으로 각 요일에 해당하는 카드를 아래의 정해진 번호 위치에 따라 배치합니다. 카드를 뒤집을 때는 반드시 왼쪽에서 오른쪽 방향으로 뒤집습니다.",
      },
      {
        stepLabel: "Step 4",
        text: "1번 카드 (월요일)",
        highlightPositionId: 2,
      },
      {
        stepLabel: "Step 4",
        text: "2번 카드 (수요일)",
        highlightPositionId: 3,
      },
      {
        stepLabel: "Step 4",
        text: "3번 카드 (금요일)",
        highlightPositionId: 4,
      },
      {
        stepLabel: "Step 4",
        text: "4번 카드 (일요일)",
        highlightPositionId: 5,
      },
      {
        stepLabel: "Step 4",
        text: "5번 카드 (화요일)",
        highlightPositionId: 6,
      },
      {
        stepLabel: "Step 4",
        text: "6번 카드 (목요일)",
        highlightPositionId: 7,
      },
      {
        stepLabel: "Step 4",
        text: "7번 카드 (토요일)",
        highlightPositionId: 8,
      },
    ],
    positions: [
      {
        id: 1,
        name: "Significator",
        meaning: "일주일 전반의 흐름을 나타냅니다.",
      },
      { id: 2, name: "월", meaning: "" },
      { id: 3, name: "수", meaning: "" },
      { id: 4, name: "금", meaning: "" },
      { id: 5, name: "일", meaning: "" },
      { id: 6, name: "화", meaning: "" },
      { id: 7, name: "목", meaning: "" },
      { id: 8, name: "토", meaning: "" },
    ],
  },
];
export const SpreadGuideTab: React.FC = () => {
  const [tabState, setTabState] = React.useState<"selection" | "reading">(
    "selection",
  );
  const [previewSpread, setPreviewSpread] = React.useState<SpreadDef | null>(
    null,
  );
  const [activeSpread, setActiveSpread] = React.useState<SpreadDef | null>(
    null,
  );
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0);
  const handlePreviewSpread = (spread: SpreadDef) => {
    setPreviewSpread(spread);
  };
  const handleStartReading = () => {
    if (previewSpread) {
      setActiveSpread(previewSpread);
      setCurrentStepIndex(0);
      setTabState("reading");
    }
  };
  const handleBackToSelection = () => {
    setTabState("selection");
    setActiveSpread(null);
  };
  const handleNextStep = () => {
    if (
      activeSpread &&
      currentStepIndex < activeSpread.readingSteps.length - 1
    ) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };
  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };
  const renderTableSelection = () => (
    <div className="flex-1 flex flex-col w-full h-full overflow-y-auto custom-scrollbar px-6 py-8">
      {" "}
      <h2 className="text-black text-[18px] font-light tracking-widest mb-8 text-center uppercase">
        SPREAD GUIDE
      </h2>{" "}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-md mx-auto mb-8">
        {" "}
        {SPREADS.map((spread) => (
          <button
            key={spread.id}
            onClick={() => handlePreviewSpread(spread)}
            className={`p-4 flex flex-col items-center justify-center transition-colors ${previewSpread?.id === spread.id ? "bg-black text-black " : " bg-white hover: text-black"}`}
          >
            {" "}
            <span className="text-[12px] text-center leading-relaxed whitespace-pre-line font-medium break-keep">
              {" "}
              {spread.displayName}{" "}
            </span>{" "}
          </button>
        ))}{" "}
      </div>{" "}
      {previewSpread && (
        <div className="w-full max-w-md mx-auto p-6 bg-white mt-auto">
          {" "}
          <h3 className="text-black text-[14px] font-bold mb-3">
            {previewSpread.name}
          </h3>{" "}
          <p className="text-neutral-700 text-[13px] leading-relaxed mb-6 break-keep">
            {previewSpread.description}
          </p>{" "}
          <button
            onClick={handleStartReading}
            className="w-full py-3 bg-black text-black font-bold text-[13px] tracking-widest hover:bg-[#e68a00] transition-colors"
          >
            {" "}
            운세 보기{" "}
          </button>{" "}
        </div>
      )}{" "}
    </div>
  );
  const renderReading = () => {
    if (!activeSpread) return null;
    const currentStep = activeSpread.readingSteps[currentStepIndex];
    return (
      <div className="flex-1 flex flex-col w-full h-full px-6 py-8 overflow-y-auto custom-scrollbar">
        {" "}
        <button
          onClick={handleBackToSelection}
          className="text-black text-[12px] font-bold tracking-widest mb-6 text-left hover:opacity-70 transition-opacity flex items-center gap-2"
        >
          {" "}
          <span>&lt;</span> 뒤로 가기{" "}
        </button>{" "}
        <h2 className="text-[18px] font-light tracking-widest text-black mb-4 uppercase">
          {activeSpread.name}
        </h2>{" "}
        <div className="h-[1px] w-full bg-neutral-100 mb-8"></div>{" "}
        <div className="flex-1 flex flex-col">
          {" "}
          <div className="mb-6">
            {" "}
            <span className="inline-block text-black text-[11px] font-bold tracking-widest mb-3 px-2 py-1">
              {" "}
              STEP {currentStepIndex + 1} /{" "}
              {activeSpread.readingSteps.length}{" "}
            </span>{" "}
            {currentStep.stepLabel && (
              <h3 className="text-black font-bold text-[15px] mb-3">
                {currentStep.stepLabel}
              </h3>
            )}{" "}
            <p className="text-neutral-700 text-[14px] leading-relaxed break-keep whitespace-pre-line">
              {" "}
              {currentStep.text}{" "}
            </p>{" "}
            {currentStep.subText && (
              <p className="text-neutral-500 text-[12px] leading-relaxed mt-3 break-keep">
                {" "}
                {currentStep.subText}{" "}
              </p>
            )}{" "}
          </div>{" "}
          <div className="mt-auto pt-6 flex flex-col gap-3">
            {" "}
            {activeSpread.positions && (
              <div className="bg-neutral-100/30 p-4 mb-4">
                {" "}
                <h4 className="text-black text-[11px] mb-2 font-bold tracking-widest">
                  배치 의미
                </h4>{" "}
                <div className="flex flex-col gap-2">
                  {" "}
                  {activeSpread.positions.map((pos) => (
                    <div key={pos.id} className="flex gap-2">
                      {" "}
                      <span className="text-black text-[12px] font-bold min-w-[20px]">
                        {pos.name}
                      </span>{" "}
                      <span className="text-neutral-600 text-[12px] break-keep">
                        {pos.meaning}
                      </span>{" "}
                    </div>
                  ))}{" "}
                </div>{" "}
              </div>
            )}{" "}
            <div className="flex justify-between items-center">
              {" "}
              <button
                onClick={handlePrevStep}
                className={`px-4 py-2 text-[13px] font-bold tracking-widest transition-colors ${currentStepIndex === 0 ? "opacity-0 pointer-events-none" : "text-neutral-600 hover:text-black"}`}
              >
                {" "}
                이전{" "}
              </button>{" "}
              <button
                onClick={
                  currentStepIndex === activeSpread.readingSteps.length - 1
                    ? handleBackToSelection
                    : handleNextStep
                }
                className="px-6 py-2 bg-white text-black font-bold text-[13px] tracking-widest hover:bg-neutral-200 transition-colors"
              >
                {" "}
                {currentStepIndex === activeSpread.readingSteps.length - 1
                  ? "완료"
                  : "다음"}{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    );
  };
  return (
    <div className="flex-1 w-full flex flex-col overflow-hidden bg-white font-sans">
      {" "}
      {tabState === "selection" ? renderTableSelection() : renderReading()}{" "}
    </div>
  );
};
