import React, { useEffect, useState, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function CustomCursor() {
  const isReduced = useReducedMotion();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const mainCursor = useRef(null);
  const cursorRing = useRef(null);

  useEffect(() => {
    // Check if it's a touch device
    const checkTouch = () => {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();

    if (isTouch || isReduced) return;

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const onMouseLeave = () => {
      setHidden(true);
    };

    const onMouseDown = () => {
      setClicked(true);
    };

    const onMouseUp = () => {
      setClicked(false);
    };

    // Attach listeners
    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Track custom hover targets
    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, input, textarea, [role="button"], .magnetic');
      if (target) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isTouch, isReduced]);

  if (isTouch || isReduced || hidden) return null;

  return (
    <>
      {/* Tiny center dot */}
      <div
        ref={mainCursor}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-brand-accent pointer-events-none z-[99999] mix-blend-difference"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${clicked ? 0.8 : 1})`,
        }}
      />
      {/* Trailing outer glow ring */}
      <div
        ref={cursorRing}
        className="fixed top-0 left-0 rounded-full border border-brand-primary pointer-events-none z-[99998] transition-all duration-300 ease-out"
        style={{
          width: hovered ? '56px' : '28px',
          height: hovered ? '56px' : '28px',
          backgroundColor: hovered ? 'rgba(110, 92, 255, 0.15)' : 'transparent',
          borderColor: hovered ? 'var(--color-brand-primary)' : 'rgba(110, 92, 255, 0.4)',
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${clicked ? 0.85 : 1})`,
        }}
      />
    </>
  );
}
