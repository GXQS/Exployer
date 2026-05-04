'use client';
import AnomalyFeed from '@/components/ai/AnomalyFeed';
import PredictionPanel from '@/components/ai/PredictionPanel';
import AlertCenter from '@/components/ai/AlertCenter';
import ChainHealthScore from '@/components/ai/ChainHealthScore';
import AgentActivityFeed from '@/components/ai/AgentActivityFeed';
import GlassCard from '@/components/ui/GlassCard';
import NeonText from '@/components/ui/NeonText';
import LiveIndicator from '@/components/ui/LiveIndicator';

export default function AiDashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <NeonText size="2xl" color="pink" className="font-bold block">AI INTELLIGENCE CENTER</NeonText>
          <div className="text-gray-600 font-mono text-xs mt-1">Machine learning anomaly detection and prediction</div>
        </div>
        <LiveIndicator live label="AI ACTIVE" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chain Health */}
        <GlassCard className="p-4">
          <NeonText color="cyan" size="sm" className="font-bold uppercase tracking-wider mb-4 block">
            Chain Health Score
          </NeonText>
          <ChainHealthScore />
        </GlassCard>

        {/* Predictions */}
        <GlassCard className="p-4">
          <NeonText color="purple" size="sm" className="font-bold uppercase tracking-wider mb-4 block">
            Predictive Analytics
          </NeonText>
          <PredictionPanel />
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Anomaly Feed */}
        <GlassCard className="p-4">
          <NeonText color="pink" size="sm" className="font-bold uppercase tracking-wider mb-4 block">
            Anomaly Detection Feed
          </NeonText>
          <AnomalyFeed />
        </GlassCard>

        {/* Alert Center */}
        <GlassCard className="p-4">
          <NeonText color="cyan" size="sm" className="font-bold uppercase tracking-wider mb-4 block">
            Alert Center
          </NeonText>
          <AlertCenter />
        </GlassCard>
      </div>

      {/* Agent Activity */}
      <GlassCard className="p-4">
        <NeonText color="purple" size="sm" className="font-bold uppercase tracking-wider mb-4 block">
          Agent Activity Feed
        </NeonText>
        <AgentActivityFeed />
      </GlassCard>
    </div>
  );
}
