import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A'
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer Glowing Circle */}
      <div
        className={`fixed w-8 h-8 rounded-full border border-purple-400/50 transition-transform duration-100 ease-out -translate-x-1/2 -translate-y-1/2 ${isPointer ? 'scale-150 bg-purple-500/20 border-purple-400' : 'scale-100 bg-transparent'
          }`}
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`
        }}
      />
      {/* Inner Dot */}
      <div
        className="fixed w-1.5 h-1.5 rounded-full bg-purple-400 -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`
        }}
      />
    </div>
  );
};
