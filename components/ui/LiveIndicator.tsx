'use client';
import { cn } from '@/lib/utils';

interface LiveIndicatorProps {
  live?: boolean;
  label?: string;
  className?: string;
}

export default function LiveIndicator({ live = true, label = 'LIVE', className }: LiveIndicatorProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className={cn(
        'w-2 h-2 rounded-full',
        live
          ? 'bg-[#00ff88] shadow-[0_0_8px_rgba(0,255,136,0.8)] animate-blink'
          : 'bg-[#ff0044] shadow-[0_0_8px_rgba(255,0,68,0.8)]'
      )} />
      <span className={cn(
        'text-xs font-mono font-medium',
        live ? 'text-[#00ff88]' : 'text-[#ff0044]'
      )}>
        {label}
      </span>
    </div>
  );
}
