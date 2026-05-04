'use client';
import useSWR from 'swr';
import GlassCard from '@/components/ui/GlassCard';
import { formatNumber } from '@/lib/utils';
import type { Prediction } from '@/ai/predictor';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function PredictionPanel() {
  const { data } = useSWR<{ predictions: Prediction[] }>(
    '/api/ai/predict',
    fetcher,
    { refreshInterval: 5000 }
  );
  const predictions = data?.predictions ?? [];

  const trendIcon = (t: Prediction['trend']) =>
    t === 'up' ? '▲' : t === 'down' ? '▼' : '—';

  const trendColor = (t: Prediction['trend']) =>
    t === 'up' ? '#00ff88' : t === 'down' ? '#ff0044' : '#ffaa00';

  return (
    <div className="grid grid-cols-2 gap-3">
      {predictions.map(p => (
        <GlassCard key={p.metric} className="p-4">
          <div className="text-xs font-mono text-gray-500 uppercase mb-2">{p.metric}</div>
          <div className="flex items-end gap-2 mb-1">
            <span className="text-[#00ffe1] font-mono font-bold text-lg">
              {p.current.toFixed(p.unit === 's' ? 2 : 0)} {p.unit}
            </span>
            <span className="text-xs font-mono" style={{ color: trendColor(p.trend) }}>
              {trendIcon(p.trend)} {p.prediction.toFixed(p.unit === 's' ? 2 : 0)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-xs font-mono text-gray-600">in {p.horizon}</div>
            <div className="text-xs font-mono text-gray-500">
              {(p.confidence * 100).toFixed(0)}% conf
            </div>
          </div>
          <div className="mt-2 h-1 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#00ffe1] rounded-full"
              style={{ width: `${p.confidence * 100}%` }}
            />
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
