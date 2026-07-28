export interface TarotCard {
  code: string; // 3-digit string, e.g., "421" or "893"
  name: string; // Korean name, e.g., "0 바보" or "에이스"
  englishName: string; // English name, e.g., "The Fool" or "Ace of Wands"
  type: 'major' | 'wands' | 'swords' | 'cups' | 'pentacles';
  keyword?: string; // 빠른 해석 키워드
  uprightMeaning: string; // 정방향 의미 (키워드 및 해석)
  reversedMeaning: string; // 역방향 의미 (Upside down)
  color: string; // Tailwind color theme gradient/border classes
  symbol: string; // SVG icon key or category
}

export interface RuleStep {
  id: number;
  title: string;
  description: string;
  details: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'gameplay' | 'cards';
}

export interface CardPosition {
  id: number;
  name: string; // e.g., "과거 (Past)", "현재 (Present)", "미래 (Future)"
  meaning: string; // Detailed meaning of what this card represents in the spread
  x: number; // Percent from left (for absolute positioning)
  y: number; // Percent from top (for absolute positioning)
}

export interface SpreadType {
  id: string;
  name: string;
  cardsCount: number;
  tagline: string;
  description: string;
  situations: string[];
  positions: CardPosition[];
}
