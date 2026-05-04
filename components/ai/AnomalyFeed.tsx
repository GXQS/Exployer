'use client';
import useSWR from 'swr';
import GlassCard from '@/components/ui/GlassCard';
import GlowBadge from '@/components/ui/GlowBadge';
import { timeAgo } from '@/lib/utils';
import type { Anomaly } from '@/ai/anomaly';

const fetcher = (url: string) => fetch(url).then(r => r.json());

const severityColor = {
  CRITICAL: 'red' as const,
  HIGH: 'orange' as const,
  MEDIUM: 'orange' as const,
  LOW: 'cyan' as const,
};

export default function AnomalyFeed() {
  const { data } = useSWR<{ anomalies: Anomaly[] }>(
    '/api/ai/anomaly',
    fetcher,
    { refreshInterval: 3000 }
  );
  const anomalies = data?.anomalies ?? [];

  return (
    <div className="space-y-2">
      {anomalies.length === 0 ? (
        <GlassCard className="p-4 text-center">
          <div className="text-[#00ff88] font-mono text-sm">✓ No anomalies detected</div>
          <div className="text-gray-600 font-mono text-xs mt-1">Chain metrics nominal</div>
        </GlassCard>
      ) : (
        anomalies.map(anomaly => (
          <GlassCard key={anomaly.id} glow={anomaly.severity === 'CRITICAL' ? 'pink' : 'none'} className="p-3">
            <div className="flex items-start gap-3">
              <div className="shrink-0 mt-0.5">
                <GlowBadge label={anomaly.severity} color={severityColor[anomaly.severity]} size="sm" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-gray-200 font-mono text-sm">{anomaly.message}</div>
                <div className="text-gray-600 font-mono text-xs mt-1">
                  Type: {anomaly.type} · Score: {anomaly.score}/100
                </div>
              </div>
              <div className="text-gray-600 font-mono text-xs shrink-0">{timeAgo(anomaly.timestamp)}</div>
            </div>
            <div className="mt-2 h-1 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${anomaly.score}%`,
                  backgroundColor: anomaly.severity === 'CRITICAL' ? '#ff0044' : anomaly.severity === 'HIGH' ? '#ff6600' : '#ffaa00'
                }}
              />
            </div>
          </GlassCard>
        ))
      )}
    </div>
  );
}
