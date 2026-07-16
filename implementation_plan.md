# Update Tarot Application UI to Match Design Specs

This plan outlines the steps to align the Reading Book (`SearcherTab.tsx`) and Spread Guide (`SpreadGuideTab.tsx`) UI with the provided reference images. All text will strictly adhere to the previously unified typography: Noto Sans KR, Regular, 10pt (13.33px) and the color palette of #ffffff and #ffb900.

## User Review Required

- **Card Styling in Detail View**: The current `SearcherTab` card image box has rounded corners (`rounded-3xl`). The reference images show sharp, rectangular borders (`rounded-none`). We will remove the border radius.
- **Action Buttons in Detail View**: The current action buttons ("돌아가기", "공유하기") have circular borders around their icons. The reference image shows plain icons with text underneath. We will remove the circular borders.
- **Bottom Navigation**: The bottom tabs (룰북, 리딩북, 스프레드) currently use Lucide icons. The reference image shows simple squares (hollow for inactive `border border-white`, solid white for active `bg-white`).
- **Spread Layouts**: We will recreate the exact card positions for the 1-card, 3-card, and 5-card spreads, including the specific V-shape for "양자택일" and the Cross-shape for "연애운".

## Proposed Changes

### [SearcherTab.tsx]
#### [MODIFY] src/components/SearcherTab.tsx
- Update the code input boxes to be sharp squares with full borders instead of just an underline.
- Update the detail view card image to be a sharp rectangle with no inner rounded borders.
- Remove the circular wrapper around the action icons (Rotate, Send).
- Update the title and card name texts to not use italic or serif-like fonts (ensure Noto Sans KR defaults).

### [SpreadGuideTab.tsx]
#### [MODIFY] src/components/SpreadGuideTab.tsx
- Update the top navigation buttons (1 Card, 3 Card, 5 Card) to match the reference (square boxes with card icons inside, sharp borders).
- Implement sub-tabs for 3 Card ("미래", "연애운") and 5 Card ("양자택일", "연애운") with sharp border styling.
- Create the precise layouts:
  - 1 Card: single centered card.
  - 3 Card: 3 horizontal cards with specific labels.
  - 5 Card (양자택일): Inverted V shape layout.
  - 5 Card (연애운): Cross shape layout.
- Update the bottom dialogue box to have a double border and the downward triangle `▽`.

### [App.tsx / main Layout]
#### [MODIFY] src/App.tsx (or where bottom navigation is defined)
- Ensure the bottom navigation bar uses the hollow/solid square icons as shown in the design.

## Verification Plan
1. Launch the app using `npm run dev`.
2. Navigate to "리딩북" and verify the input screen matches Image 1 (sharp input boxes, double border dialogue).
3. Enter a valid code and verify the detail view matches Image 1 (sharp card, orange keywords/text, no border around icons).
4. Navigate to "스프레드" and verify the tabs and layouts for 1, 3, and 5 cards perfectly align with Image 2.
