'use client';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type GlowColor =
  | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger'
  // Legacy aliases kept for backward compatibility
  | 'cyan' | 'pink' | 'purple'
  | 'none';

/** Depth level for glassmorphism layering */
type DepthLevel = 1 | 2 | 3;

interface GlassCardProps {
  children?: ReactNode;
  className?: string;
  /** Color used for hover/active glow. No glow by default in base state. */
  glow?: GlowColor;
  /** Glassmorphism depth: 1=base, 2=elevated, 3=active. Defaults to 1. */
  depth?: DepthLevel;
  /** When true, shows strong active glow instead of hover glow. */
  active?: boolean;
  onClick?: () => void;
}

// Normalize legacy color names to design tokens
function normalizeGlow(color: GlowColor): Exclude<GlowColor, 'cyan' | 'pink' | 'purple'> {
  if (color === 'cyan') return 'primary';
  if (color === 'pink') return 'accent';
  if (color === 'purple') return 'secondary';
  return color;
}

const glowHoverClass: Record<string, string> = {
  primary:   'glow-hover-primary',
  secondary: 'glow-hover-secondary',
  accent:    'glow-hover-accent',
  success:   'glow-hover-success',
  warning:   'glow-hover-warning',
  danger:    'glow-hover-danger',
  none:      '',
};

const glowActiveClass: Record<string, string> = {
  primary:   'glow-active-primary',
  secondary: 'glow-active-secondary',
  accent:    'glow-active-accent',
  success:   'glow-active-success',
  warning:   'glow-active-warning',
  danger:    'glow-active-danger',
  none:      '',
};

const depthClass: Record<DepthLevel, string> = {
  1: 'glass-l1',
  2: 'glass-l2',
  3: 'glass-l3',
};

export default function GlassCard({
  children,
  className,
  glow = 'none',
  depth = 1,
  active = false,
  onClick,
}: GlassCardProps) {
  const resolvedGlow = normalizeGlow(glow);
  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-xl transition-all duration-300',
        depthClass[depth],
        active ? glowActiveClass[resolvedGlow] : glowHoverClass[resolvedGlow],
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}
