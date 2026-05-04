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

// Consume design tokens from tailwind.config.js — no hard-coded hex values
const colorStyles: Record<BadgeColor, string> = {
  primary:   'bg-primary/10   border-primary/40   text-primary',
  secondary: 'bg-secondary/10 border-secondary/40 text-secondary',
  accent:    'bg-accent/10    border-accent/40    text-accent',
  success:   'bg-success/10   border-success/40   text-success',
  warning:   'bg-warning/10   border-warning/40   text-warning',
  danger:    'bg-danger/10    border-danger/40    text-danger',
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
