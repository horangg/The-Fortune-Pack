import React, { useState, useEffect, createContext, useContext } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

export const TypewriterContext = createContext({ skip: false });

export const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 50, delay = 0, className = '' }) => {
  const [displayedText, setDisplayedText] = useState('');
  const { skip } = useContext(TypewriterContext);

  useEffect(() => {
    if (skip) {
      setDisplayedText(text);
      return;
    }

    let index = 0;
    setDisplayedText('');
    
    let timer: NodeJS.Timeout;
    const startTyping = () => {
      const startTime = Date.now();
      timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const charsToShow = Math.floor(elapsed / speed) + 1;
        setDisplayedText(text.substring(0, charsToShow));
        if (charsToShow >= text.length) {
          clearInterval(timer);
        }
      }, Math.min(speed, 16)); // update at 60fps or the speed itself
    };

    const delayTimer = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(delayTimer);
      clearInterval(timer);
    };
  }, [text, speed, delay, skip]);

  return (
    <span className={`whitespace-pre-line ${className}`}>
      {displayedText}
    </span>
  );
};
