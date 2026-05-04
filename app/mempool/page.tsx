'use client';
import MempoolVisualizer from '@/components/explorer/MempoolVisualizer';
import GlassCard from '@/components/ui/GlassCard';
import NeonText from '@/components/ui/NeonText';
import LiveIndicator from '@/components/ui/LiveIndicator';
import MempoolChart from '@/components/charts/MempoolChart';

export default function MempoolPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <NeonText size="2xl" color="pink" className="font-bold block">MEMPOOL MONITOR</NeonText>
          <div className="text-gray-600 font-mono text-xs mt-1">Pending transaction pool analysis</div>
        </div>
        <LiveIndicator live label="LIVE" />
      </div>

      <GlassCard className="p-4">
        <NeonText color="cyan" size="sm" className="font-bold uppercase tracking-wider mb-4 block">
          Gas Price Distribution
        </NeonText>
        <MempoolChart />
      </GlassCard>

      <GlassCard className="p-4">
        <NeonText color="pink" size="sm" className="font-bold uppercase tracking-wider mb-4 block">
          Pending Transactions
        </NeonText>
        <MempoolVisualizer />
      </GlassCard>
    </div>
  );
}
