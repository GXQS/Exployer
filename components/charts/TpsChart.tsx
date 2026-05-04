'use client';
import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { formatTimestamp } from '@/lib/utils';

interface DataPoint {
  time: string;
  tps: number;
}

export default function TpsChart() {
  const [data, setData] = useState<DataPoint[]>(() =>
    Array.from({ length: 30 }, (_, i) => ({
      time: formatTimestamp(Date.now() - (29 - i) * 2000),
      tps: 1500 + Math.floor(Math.random() * 3000),
    }))
  );

  useEffect(() => {
    const timer = setInterval(async () => {
      try {
        const stats = await fetch('/api/stats').then(r => r.json());
        setData(prev => [...prev.slice(-29), {
          time: formatTimestamp(Date.now()),
          tps: stats.tps ?? 0,
        }]);
      } catch {}
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="tpsGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00ffe1" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#00ffe1" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="time"
          tick={{ fill: '#4b5563', fontSize: 10, fontFamily: 'monospace' }}
          tickLine={false}
          axisLine={false}
          interval={9}
        />
        <YAxis
          tick={{ fill: '#4b5563', fontSize: 10, fontFamily: 'monospace' }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(5,1,10,0.9)',
            border: '1px solid rgba(0,255,225,0.3)',
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '12px',
          }}
          labelStyle={{ color: '#6b7280' }}
          itemStyle={{ color: '#00ffe1' }}
        />
        <Area
          type="monotone"
          dataKey="tps"
          stroke="#00ffe1"
          strokeWidth={2}
          fill="url(#tpsGradient)"
          dot={false}
          activeDot={{ r: 4, fill: '#00ffe1', stroke: 'none' }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
