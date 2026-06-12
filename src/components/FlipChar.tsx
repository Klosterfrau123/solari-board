'use client';

import { useEffect, useRef, useState } from 'react';

interface FlipCharProps {
  char: string;
}

export function FlipChar({ char }: FlipCharProps) {
  const value = (char || ' ').toUpperCase();
  const [current, setCurrent] = useState(value);
  const [next, setNext] = useState(value);
  const [phase, setPhase] = useState<'idle' | 'fold' | 'unfold'>('idle');
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (value === current) return;

    timers.current.forEach(clearTimeout);
    timers.current = [];

    setNext(value);
    setPhase('fold');

    const t1 = setTimeout(() => {
      setCurrent(value);
      setPhase('unfold');
    }, 140);

    const t2 = setTimeout(() => {
      setPhase('idle');
    }, 280);

    timers.current = [t1, t2];
    return () => timers.current.forEach(clearTimeout);
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span className="flip-char" aria-label={value}>
      {/* Top half — always shows current char top */}
      <span className="flip-half flip-top">
        <span className="flip-inner">{current}</span>
      </span>

      {/* Bottom half — always shows current char bottom */}
      <span className="flip-half flip-bottom">
        <span className="flip-inner">{current}</span>
      </span>

      {/* Folding flap: current char top folding down */}
      {phase === 'fold' && (
        <span className="flip-flap flip-flap-top">
          <span className="flip-inner">{current}</span>
        </span>
      )}

      {/* Unfolding flap: next char bottom unfolding up */}
      {phase === 'unfold' && (
        <span className="flip-flap flip-flap-bottom">
          <span className="flip-inner">{next}</span>
        </span>
      )}

      {/* Center divider */}
      <span className="flip-divider" />
    </span>
  );
}
