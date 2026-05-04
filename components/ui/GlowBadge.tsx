'use client';
import { cn } from '@/lib/utils';

interface GlowBadgeProps {
  label: string;
  color?: 'cyan' | 'pink' | 'purple' | 'green' | 'red' | 'orange';
  size?: 'sm' | 'md';
}

export default function GlowBadge({ label, color = 'cyan', size = 'md' }: GlowBadgeProps) {
  const colors = {
    cyan: 'bg-[rgba(0,255,225,0.1)] border-[rgba(0,255,225,0.4)] text-[#00ffe1]',
    pink: 'bg-[rgba(255,0,212,0.1)] border-[rgba(255,0,212,0.4)] text-[#ff00d4]',
    purple: 'bg-[rgba(122,0,255,0.1)] border-[rgba(122,0,255,0.4)] text-[#7a00ff]',
    green: 'bg-[rgba(0,255,136,0.1)] border-[rgba(0,255,136,0.4)] text-[#00ff88]',
    red: 'bg-[rgba(255,59,59,0.1)] border-[rgba(255,59,59,0.4)] text-[#ff3b3b]',
    orange: 'bg-[rgba(255,170,0,0.1)] border-[rgba(255,170,0,0.4)] text-[#ffaa00]',
  };
  const sizes = { sm: 'px-2 py-0.5 text-xs', md: 'px-3 py-1 text-xs' };
  return (
    <span className={cn('border rounded font-mono font-medium', colors[color], sizes[size])}>
      {label}
    </span>
  );
}
