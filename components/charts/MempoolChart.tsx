'use client';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface BucketData {
  range: string;
  count: number;
  priority: 'high' | 'medium' | 'low';
}

export default function MempoolChart() {
  const [data, setData] = useState<BucketData[]>([
    { range: '0-10', count: 45, priority: 'high' },
    { range: '11-25', count: 89, priority: 'high' },
    { range: '26-50', count: 67, priority: 'medium' },
    { range: '51-75', count: 34, priority: 'medium' },
    { range: '76-100', count: 23, priority: 'low' },
    { range: '100+', count: 12, priority: 'low' },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setData(prev => prev.map(d => ({
        ...d,
        count: Math.max(5, d.count + Math.floor(Math.random() * 20 - 10)),
      })));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const colors = { high: '#ff00d4', medium: '#ffaa00', low: '#7a00ff' };

  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
        <XAxis
          dataKey="range"
          tick={{ fill: '#4b5563', fontSize: 10, fontFamily: 'monospace' }}
          tickLine={false}
          axisLine={false}
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
          itemStyle={{ color: '#ff00d4' }}
          formatter={(v) => [`${v} txs`, 'Count']}
        />
        <Bar dataKey="count" radius={[2, 2, 0, 0]}>
          {data.map((entry, i) => (
            <Cell key={i} fill={colors[entry.priority]} fillOpacity={0.8} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
