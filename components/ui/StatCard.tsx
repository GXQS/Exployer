'use client';
import GlassCard from './GlassCard';
import AnimatedNumber from './AnimatedNumber';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  icon?: ReactNode;
  color?: 'cyan' | 'pink' | 'purple';
  trend?: number;
  decimals?: number;
  formatFn?: (v: number) => string;
  subValue?: string;
}

export default function StatCard({
  label, value, suffix, prefix, icon, color = 'cyan',
  trend, decimals = 0, formatFn, subValue
}: StatCardProps) {
  const colors = {
    cyan: { text: 'text-[#00ffe1]', glow: 'cyan' as const, border: 'border-[rgba(0,255,225,0.2)]' },
    pink: { text: 'text-[#ff00d4]', glow: 'pink' as const, border: 'border-[rgba(255,0,212,0.2)]' },
    purple: { text: 'text-[#7a00ff]', glow: 'purple' as const, border: 'border-[rgba(122,0,255,0.2)]' },
  };
  const c = colors[color];

  return (
    <GlassCard glow={c.glow} className="p-4">
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">{label}</span>
        {icon && <div className={cn('text-sm', c.text)}>{icon}</div>}
      </div>
      <div className={cn('text-2xl font-bold font-mono', c.text)}>
        <AnimatedNumber
          value={value}
          decimals={decimals}
          suffix={suffix}
          prefix={prefix}
          formatFn={formatFn}
        />
      </div>
      <div className="flex items-center gap-2 mt-1">
        {trend !== undefined && (
          <span className={cn(
            'text-xs font-mono',
            trend > 0 ? 'text-[#00ff88]' : trend < 0 ? 'text-[#ff0044]' : 'text-gray-500'
          )}>
            {trend > 0 ? '▲' : trend < 0 ? '▼' : '—'} {Math.abs(trend).toFixed(1)}%
          </span>
        )}
        {subValue && <span className="text-xs text-gray-600 font-mono">{subValue}</span>}
      </div>
    </GlassCard>
  );
}
