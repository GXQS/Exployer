'use client';
import BlockStream from '@/components/explorer/BlockStream';
import GlassCard from '@/components/ui/GlassCard';
import NeonText from '@/components/ui/NeonText';
import LiveIndicator from '@/components/ui/LiveIndicator';

export default function BlocksPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <NeonText size="2xl" color="cyan" className="font-bold block">BLOCK STREAM</NeonText>
          <div className="text-gray-600 font-mono text-xs mt-1">Live block production feed</div>
        </div>
        <LiveIndicator live label="LIVE STREAM" />
      </div>

      <GlassCard className="p-4">
        {/* Header row */}
        <div className="grid grid-cols-6 gap-2 px-3 pb-3 border-b border-[rgba(0,255,225,0.1)]">
          <div className="text-xs font-mono text-gray-600 uppercase">Height</div>
          <div className="col-span-2 text-xs font-mono text-gray-600 uppercase">Hash / Proposer</div>
          <div className="text-center text-xs font-mono text-gray-600 uppercase">TXs</div>
          <div className="text-center text-xs font-mono text-gray-600 uppercase">Size</div>
          <div className="text-right text-xs font-mono text-gray-600 uppercase">Status</div>
        </div>
        <div className="mt-3">
          <BlockStream limit={30} compact={false} />
        </div>
      </GlassCard>
    </div>
  );
}
