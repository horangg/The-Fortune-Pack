import React from "react";

// A retro-style hand-drawn puppy/monkey with floppy ears and a bowtie
export const RetroGuideAvatar: React.FC<{ className?: string }> = ({
  className = "w-24 h-24",
}) => {
  return (
    <svg viewBox="0 0 120 120" className={`${className} bg-black`}>
      {/* Outer black fill background */}
      <rect width="120" height="120" fill="black" />

      {/* floppy ears (left and right) */}
      <rect
        x="20"
        y="40"
        width="16"
        height="36"
        fill="black"
        stroke="white"
        strokeWidth="2.5"
        rx="6"
      />
      <rect
        x="84"
        y="40"
        width="16"
        height="36"
        fill="black"
        stroke="white"
        strokeWidth="2.5"
        rx="6"
      />

      {/* head circle */}
      <circle
        cx="60"
        cy="55"
        r="32"
        fill="black"
        stroke="white"
        strokeWidth="3"
      />

      {/* eyes (big animated retro eyes) */}
      <ellipse cx="48" cy="48" rx="5" ry="8" fill="white" />
      <ellipse cx="72" cy="48" rx="5" ry="8" fill="white" />
      <circle cx="49" cy="46" r="2.5" fill="black" />
      <circle cx="73" cy="46" r="2.5" fill="black" />

      {/* nose */}
      <polygon
        points="56,58 64,58 60,63"
        fill="white"
        stroke="white"
        strokeWidth="1"
      />

      {/* happy mouth & cheeks */}
      <path
        d="M 46 64 Q 60 76 74 64"
        fill="none"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M 40 62 L 44 64" stroke="white" strokeWidth="2" />
      <path d="M 80 62 L 76 64" stroke="white" strokeWidth="2" />

      {/* Bowtie */}
      <polygon points="46,88 56,92 46,96" fill="white" />
      <polygon points="74,88 64,92 74,96" fill="white" />
      <rect x="56" y="90" width="8" height="4" fill="white" />
    </svg>
  );
};

// The short hair girl character as seen in the bottom-right portrait box of the screenshot
export const RetroUserAvatar: React.FC<{ className?: string }> = ({
  className = "w-10 h-10",
}) => {
  return (
    <svg
      viewBox="0 0 40 40"
      className={`${className} bg-black border border-white`}
    >
      <rect width="40" height="40" fill="black" />

      {/* Hair outline (short bob with bangs) */}
      <path
        d="M 8 16 L 8 28 L 11 28 L 11 20 L 29 20 L 29 28 L 32 28 L 32 16 Z"
        fill="white"
      />
      <path d="M 10 10 L 30 10 L 34 16 L 6 16 Z" fill="white" />

      {/* Face skin area */}
      <rect x="12" y="16" width="16" height="14" fill="black" />

      {/* Bangs tips */}
      <path
        d="M 10 16 L 14 19 L 18 16 L 22 19 L 26 16 L 30 19"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
      />

      {/* Eyes */}
      <rect x="14" y="21" width="3" height="3" fill="white" />
      <rect x="23" y="21" width="3" height="3" fill="white" />
      <rect x="15" y="22" width="1" height="1" fill="black" />
      <rect x="24" y="22" width="1" height="1" fill="black" />

      {/* Blush lines */}
      <line x1="12" y1="25" x2="14" y2="25" stroke="white" strokeWidth="1" />
      <line x1="26" y1="25" x2="28" y2="25" stroke="white" strokeWidth="1" />

      {/* Mouth */}
      <path
        d="M 18 27 Q 20 29 22 27"
        fill="none"
        stroke="white"
        strokeWidth="1"
      />

      {/* Small Collar */}
      <polygon points="16,34 20,38 24,34 20,32" fill="white" />
    </svg>
  );
};

// Hand-drawn Tarot Card Back Illustration (Dither/Retro style)
export const RetroCardBack: React.FC<{ className?: string }> = ({
  className = "w-32 h-48",
}) => {
  return (
    <div
      className={`${className} bg-black border-2 border-white relative p-2 overflow-hidden flex flex-col justify-between items-center select-none`}
    >
      {/* Inner thin border */}
      <div className="absolute inset-1 border border-white/40 rounded pointer-events-none" />

      {/* Corners details */}
      <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/60" />
      <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/60" />
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/60" />
      <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/60" />

      <span className="text-[7px] text-white uppercase">TISSUE</span>

      {/* Centered Sun/Star Retro Geometry */}
      <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center relative">
        <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center">
          {/* Starburst spokes */}
          <div className="absolute w-8 h-[2px] bg-white" />
          <div className="absolute h-8 w-[2px] bg-white" />
          <div className="absolute w-6 h-[2px] bg-white rotate-45" />
          <div className="absolute h-6 w-[2px] bg-white rotate-45" />
          <div className="w-4 h-4 bg-black rounded-full border border-white z-10" />
        </div>
      </div>

      <span className="text-[7px] text-white uppercase">OFFICE</span>
    </div>
  );
};
