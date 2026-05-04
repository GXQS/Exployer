'use client';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedNumberProps {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  formatFn?: (v: number) => string;
  duration?: number;
}

export default function AnimatedNumber({
  value,
  decimals = 0,
  suffix = '',
  prefix = '',
  className,
  formatFn,
  duration = 500,
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const prevRef = useRef(value);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const start = prevRef.current;
    const end = value;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(start + (end - start) * eased);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        prevRef.current = end;
      }
    };

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [value, duration]);

  const formatted = formatFn
    ? formatFn(displayValue)
    : displayValue.toFixed(decimals);

  return (
    <span className={cn('tabular-nums', className)}>
      {prefix}{formatted}{suffix}
    </span>
  );
}
