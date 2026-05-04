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
  /** KPI cards use primary or secondary only */
  color?: 'primary' | 'secondary';
  trend?: number;
  decimals?: number;
  formatFn?: (v: number) => string;
  subValue?: string;
}

export default function StatCard({
  label, value, suffix, prefix, icon, color = 'primary',
  trend, decimals = 0, formatFn, subValue
}: StatCardProps) {
  const styles = {
    primary:   { text: 'text-[#00ffe1]', glow: 'primary' as const },
    secondary: { text: 'text-[#7a00ff]', glow: 'secondary' as const },
  };
  const s = styles[color];

  return (
    <GlassCard glow={s.glow} depth={1} className="p-4 h-[110px] flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">{label}</span>
        {icon && <div className={cn('text-sm', s.text)}>{icon}</div>}
      </div>
      <div className={cn('text-2xl font-bold font-mono leading-none', s.text)}>
        <AnimatedNumber
          value={value}
          decimals={decimals}
          suffix={suffix}
          prefix={prefix}
          formatFn={formatFn}
        />
      </div>
      <div className="flex items-center gap-2 h-4">
        {trend !== undefined && (
          <span className={cn(
            'text-xs font-mono',
            trend > 0 ? 'text-[#00ff88]' : trend < 0 ? 'text-[#ff3b3b]' : 'text-gray-500'
          )}>
            {trend > 0 ? '▲' : trend < 0 ? '▼' : '—'} {Math.abs(trend).toFixed(1)}%
          </span>
        )}
        {subValue && <span className="text-xs text-gray-600 font-mono">{subValue}</span>}
      </div>
    </GlassCard>
  );
}
