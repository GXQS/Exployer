'use client';
import useSWR from 'swr';
import GlassCard from '@/components/ui/GlassCard';
import GlowBadge from '@/components/ui/GlowBadge';
import NeonButton from '@/components/ui/NeonButton';
import { timeAgo } from '@/lib/utils';
import type { Alert } from '@/ai/alerts';
import { cn } from '@/lib/utils';

const fetcher = (url: string) => fetch(url).then(r => r.json());

const severityColor = {
  CRITICAL: 'red' as const,
  HIGH: 'orange' as const,
  MEDIUM: 'orange' as const,
  LOW: 'cyan' as const,
};

export default function AlertCenter() {
  const { data, mutate } = useSWR<{ alerts: Alert[] }>(
    '/api/ai/alerts',
    fetcher,
    { refreshInterval: 3000 }
  );

  const alerts = data?.alerts ?? [];

  const acknowledge = async (id: string) => {
    await fetch('/api/ai/alerts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    mutate();
  };

  return (
    <div className="space-y-2 max-h-96 overflow-auto">
      {alerts.length === 0 ? (
        <GlassCard className="p-4 text-center">
          <div className="text-[#00ff88] font-mono text-sm">No active alerts</div>
        </GlassCard>
      ) : (
        alerts.map(alert => (
          <GlassCard
            key={alert.id}
            className={cn(
              'p-3',
              alert.acknowledged && 'opacity-50'
            )}
          >
            <div className="flex items-start gap-3">
              <GlowBadge label={alert.severity} color={severityColor[alert.severity]} size="sm" />
              <div className="flex-1 min-w-0">
                <div className="text-gray-200 font-mono text-sm">{alert.message}</div>
                <div className="text-gray-600 font-mono text-xs mt-1">
                  {alert.source} · {timeAgo(alert.timestamp)}
                </div>
              </div>
              {!alert.acknowledged && (
                <NeonButton size="sm" variant="ghost" onClick={() => acknowledge(alert.id)}>
                  ACK
                </NeonButton>
              )}
            </div>
          </GlassCard>
        ))
      )}
    </div>
  );
}
