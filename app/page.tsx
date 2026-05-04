'use client';
import CommandDashboard from '@/components/explorer/CommandDashboard';
import BlockStream from '@/components/explorer/BlockStream';
import TransactionList from '@/components/explorer/TransactionList';
import GlassCard from '@/components/ui/GlassCard';
import NeonText from '@/components/ui/NeonText';
import TpsChart from '@/components/charts/TpsChart';

export default function HomePage() {
  return (
    <div className="p-6 space-y-6">
      <CommandDashboard />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* TPS Chart */}
        <GlassCard className="p-4">
          <div className="flex items-center justify-between mb-4">
            <NeonText color="cyan" size="sm" className="font-bold uppercase tracking-wider">
              TPS Realtime
            </NeonText>
            <span className="text-xs font-mono text-gray-600">last 60s</span>
          </div>
          <TpsChart />
        </GlassCard>

        {/* Block Stream Preview */}
        <GlassCard className="p-4">
          <div className="flex items-center justify-between mb-4">
            <NeonText color="pink" size="sm" className="font-bold uppercase tracking-wider">
              Live Blocks
            </NeonText>
            <a href="/blocks" className="text-xs font-mono text-gray-600 hover:text-[#00ffe1] transition-colors">
              View all →
            </a>
          </div>
          <BlockStream limit={8} compact />
        </GlassCard>
      </div>

      {/* Recent Transactions */}
      <GlassCard className="p-4">
        <div className="flex items-center justify-between mb-4">
          <NeonText color="purple" size="sm" className="font-bold uppercase tracking-wider">
            Recent Transactions
          </NeonText>
          <span className="text-xs font-mono text-gray-600">live feed</span>
        </div>
        <TransactionList limit={8} />
      </GlassCard>
    </div>
  );
}
