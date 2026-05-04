'use client';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface GlassCardProps {
  children?: ReactNode;
  className?: string;
  glow?: 'cyan' | 'pink' | 'purple' | 'none';
  onClick?: () => void;
}

export default function GlassCard({ children, className, glow = 'none', onClick }: GlassCardProps) {
  const glowClasses = {
    cyan: 'shadow-neon-cyan border-[rgba(0,255,225,0.3)]',
    pink: 'shadow-neon-pink border-[rgba(255,0,212,0.3)]',
    purple: 'shadow-neon-purple border-[rgba(122,0,255,0.3)]',
    none: 'border-[rgba(0,255,225,0.1)]',
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-xl border backdrop-blur-md',
        'bg-[rgba(255,255,255,0.03)]',
        'transition-all duration-300',
        onClick && 'cursor-pointer hover:border-[rgba(0,255,225,0.4)]',
        glowClasses[glow],
        className
      )}
    >
      {children}
    </div>
  );
}
