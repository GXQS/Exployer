'use client';
import { ReactNode, useState, lazy, Suspense } from 'react';
import GlassCard from './GlassCard';
import { cn } from '@/lib/utils';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  headerRight?: ReactNode;
  /** Allow chart to be collapsed on mobile */
  collapsible?: boolean;
}

export default function ChartCard({
  title,
  subtitle,
  children,
  className,
  headerRight,
  collapsible = false,
}: ChartCardProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <GlassCard glow="primary" depth={1} className={cn('p-4', className)}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00ffe1]">
            {title}
          </span>
          {subtitle && (
            <div className="text-xs font-mono text-gray-600 mt-0.5">{subtitle}</div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {headerRight}
          {collapsible && (
            <button
              onClick={() => setCollapsed(c => !c)}
              className="text-gray-600 hover:text-gray-300 transition-colors text-xs font-mono px-2 py-1 rounded border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)]"
              aria-label={collapsed ? 'Expand chart' : 'Collapse chart'}
            >
              {collapsed ? '▼ show' : '▲ hide'}
            </button>
          )}
        </div>
      </div>
      {!collapsed && (
        <Suspense fallback={<div className="h-48 animate-pulse bg-[rgba(255,255,255,0.03)] rounded" />}>
          {children}
        </Suspense>
      )}
    </GlassCard>
  );
}
