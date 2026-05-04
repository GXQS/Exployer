'use client';
import { ReactNode } from 'react';
import GlassCard from './GlassCard';
import { cn } from '@/lib/utils';

export interface ActivityItem {
  id: string;
  icon?: ReactNode;
  label: string;
  detail?: string;
  timestamp?: string;
  badge?: ReactNode;
  /** Highlight color for the left accent line */
  accentColor?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
}

interface ActivityFeedProps {
  items: ActivityItem[];
  className?: string;
  emptyMessage?: string;
}

const accentStyles: Record<NonNullable<ActivityItem['accentColor']>, string> = {
  primary:   'bg-[#00ffe1]',
  secondary: 'bg-[#7a00ff]',
  accent:    'bg-[#ff00d4]',
  success:   'bg-[#00ff88]',
  warning:   'bg-[#ffaa00]',
  danger:    'bg-[#ff3b3b]',
};

export default function ActivityFeed({ items, className, emptyMessage = 'No activity' }: ActivityFeedProps) {
  if (items.length === 0) {
    return (
      <div className={cn('text-center text-gray-600 font-mono text-xs py-8', className)}>
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={cn('space-y-1', className)}>
      {items.map(item => (
        <GlassCard key={item.id} glow="primary" depth={1} className="px-4 py-2.5 flex items-center gap-3 animate-block-flow">
          {/* Accent line */}
          <div className={cn('w-0.5 h-8 rounded-full shrink-0', accentStyles[item.accentColor ?? 'primary'])} />

          {/* Icon */}
          {item.icon && (
            <div className="text-sm shrink-0 text-gray-400">{item.icon}</div>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="text-xs font-mono text-gray-200 truncate">{item.label}</div>
            {item.detail && (
              <div className="text-[10px] font-mono text-gray-600 truncate">{item.detail}</div>
            )}
          </div>

          {/* Right side */}
          <div className="shrink-0 flex items-center gap-2">
            {item.badge}
            {item.timestamp && (
              <span className="text-[10px] font-mono text-gray-600">{item.timestamp}</span>
            )}
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
