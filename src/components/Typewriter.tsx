import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

export const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 50, delay = 0, className = '' }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    
    let timer: NodeJS.Timeout;
    const startTyping = () => {
      // Immediate first character if speed > 0, or just start interval
      timer = setInterval(() => {
        setDisplayedText(text.substring(0, index + 1));
        index++;
        if (index === text.length) {
          clearInterval(timer);
        }
      }, speed);
    };

    const delayTimer = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(delayTimer);
      clearInterval(timer);
    };
  }, [text, speed, delay]);

  return (
    <span className={`whitespace-pre-line ${className}`}>
      {displayedText}
    </span>
  );
};
