import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function Magnetic({ children, range = 0.35, speed = 1 }) {
  const containerRef = useRef(null);
  const isReduced = useReducedMotion();

  useEffect(() => {
    if (isReduced) return;

    const element = containerRef.current;
    if (!element) return;

    const onMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      // Move element slightly toward cursor
      gsap.to(element, {
        x: x * range,
        y: y * range,
        duration: 0.3 * speed,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const onMouseLeave = () => {
      // Return to center
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5 * speed,
        ease: 'elastic.out(1, 0.3)',
        overwrite: 'auto',
      });
    };

    element.addEventListener('mousemove', onMouseMove);
    element.addEventListener('mouseleave', onMouseLeave);

    return () => {
      element.removeEventListener('mousemove', onMouseMove);
      element.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [range, speed, isReduced]);

  return (
    <div ref={containerRef} className="inline-block magnetic">
      {children}
    </div>
  );
}
