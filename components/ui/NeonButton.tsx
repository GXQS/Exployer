'use client';
import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes } from 'react';

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'cyan' | 'pink' | 'purple' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export default function NeonButton({
  children,
  className,
  variant = 'cyan',
  size = 'md',
  ...props
}: NeonButtonProps) {
  const variants = {
    cyan: 'border-[#00ffe1] text-[#00ffe1] hover:bg-[rgba(0,255,225,0.1)] hover:shadow-neon-cyan',
    pink: 'border-[#ff00d4] text-[#ff00d4] hover:bg-[rgba(255,0,212,0.1)] hover:shadow-neon-pink',
    purple: 'border-[#7a00ff] text-[#7a00ff] hover:bg-[rgba(122,0,255,0.1)] hover:shadow-neon-purple',
    ghost: 'border-[rgba(255,255,255,0.2)] text-gray-400 hover:border-[rgba(255,255,255,0.4)] hover:text-white',
    danger: 'border-[#ff0044] text-[#ff0044] hover:bg-[rgba(255,0,68,0.1)] shadow-[0_0_10px_rgba(255,0,68,0.3)]',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={cn(
        'border rounded-lg font-mono font-medium',
        'transition-all duration-200',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
