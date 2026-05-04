'use client';
import { cn } from '@/lib/utils';

type BadgeColor = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';

interface NeonBadgeProps {
  label: string;
  color?: BadgeColor;
  size?: 'sm' | 'md';
  /** Pulse animation for critical alerts */
  pulse?: boolean;
}

const colorStyles: Record<BadgeColor, string> = {
  primary:   'bg-[rgba(0,255,225,0.1)]   border-[rgba(0,255,225,0.4)]   text-[#00ffe1]',
  secondary: 'bg-[rgba(122,0,255,0.1)]   border-[rgba(122,0,255,0.4)]   text-[#7a00ff]',
  accent:    'bg-[rgba(255,0,212,0.1)]   border-[rgba(255,0,212,0.4)]   text-[#ff00d4]',
  success:   'bg-[rgba(0,255,136,0.1)]   border-[rgba(0,255,136,0.4)]   text-[#00ff88]',
  warning:   'bg-[rgba(255,170,0,0.1)]   border-[rgba(255,170,0,0.4)]   text-[#ffaa00]',
  danger:    'bg-[rgba(255,59,59,0.1)]   border-[rgba(255,59,59,0.4)]   text-[#ff3b3b]',
};

const pulseStyles: Record<BadgeColor, string> = {
  primary:   'animate-glow-pulse',
  secondary: '',
  accent:    '',
  success:   '',
  warning:   'animate-glow-pulse-warning',
  danger:    'animate-glow-pulse-danger',
};

const sizeStyles = { sm: 'px-2 py-0.5 text-[10px]', md: 'px-3 py-1 text-xs' };

export default function NeonBadge({ label, color = 'primary', size = 'md', pulse = false }: NeonBadgeProps) {
  return (
    <span className={cn(
      'border rounded font-mono font-medium inline-flex items-center',
      colorStyles[color],
      sizeStyles[size],
      pulse && pulseStyles[color]
    )}>
      {label}
    </span>
  );
}
