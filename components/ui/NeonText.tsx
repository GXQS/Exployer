'use client';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface NeonTextProps {
  children: ReactNode;
  color?: 'cyan' | 'pink' | 'purple' | 'white';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  className?: string;
  animate?: boolean;
}

export default function NeonText({ children, color = 'cyan', size = 'md', className, animate }: NeonTextProps) {
  const colors = {
    cyan: 'text-[#00ffe1] [text-shadow:0_0_10px_rgba(0,255,225,0.8),0_0_20px_rgba(0,255,225,0.4)]',
    pink: 'text-[#ff00d4] [text-shadow:0_0_10px_rgba(255,0,212,0.8),0_0_20px_rgba(255,0,212,0.4)]',
    purple: 'text-[#7a00ff] [text-shadow:0_0_10px_rgba(122,0,255,0.8),0_0_20px_rgba(122,0,255,0.4)]',
    white: 'text-white',
  };
  const sizes = {
    xs: 'text-xs', sm: 'text-sm', md: 'text-base', lg: 'text-lg',
    xl: 'text-xl', '2xl': 'text-2xl', '3xl': 'text-3xl',
  };
  return (
    <span className={cn(colors[color], sizes[size], animate && 'animate-pulse-neon', 'font-mono', className)}>
      {children}
    </span>
  );
}
