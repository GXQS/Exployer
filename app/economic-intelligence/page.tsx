'use client';
import { useEffect, useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import NeonText from '@/components/ui/NeonText';
import NeonButton from '@/components/ui/NeonButton';
import GlowBadge from '@/components/ui/GlowBadge';
import LiveIndicator from '@/components/ui/LiveIndicator';
import { formatNumber } from '@/lib/utils';
import { detectRegime, type RegimeData } from '@/economics/regime';
import { computeSignals, type EconomicSignals } from '@/economics/signals';
import { SCENARIOS, runSimulation, type SimulationResult } from '@/economics/simulation';
import type { ChainStats } from '@/lib/rpc';

const riskColors = { LOW: 'green' as const, MEDIUM: 'orange' as const, HIGH: 'orange' as const, CRITICAL: 'red' as const };

export default function EconomicIntelligencePage() {
  const [stats, setStats] = useState<ChainStats | null>(null);
  const [regime, setRegime] = useState<RegimeData | null>(null);
  const [signals, setSignals] = useState<EconomicSignals | null>(null);
  const [simulation, setSimulation] = useState<SimulationResult | null>(null);
  const [selectedScenario, setSelectedScenario] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const s = await fetch('/api/stats').then(r => r.json());
        setStats(s);
        setRegime(detectRegime({
          tps: s.tps,
          avgBlockTime: s.avgBlockTime,
          mempoolSize: s.mempoolSize,
          activeValidators: s.activeValidators,
          totalValidators: 20,
        }));
        setSignals(computeSignals({
          tps: s.tps,
          gasUsed: 12_000_000,
          gasLimit: 15_000_000,
          mempoolSize: s.mempoolSize,
          avgGasPrice: 25,
          maxGasPrice: 100,
        }));
      } catch {}
    };
    fetchData();
    const timer = setInterval(fetchData, 3000);
    return () => clearInterval(timer);
  }, []);

  const runScenario = () => {
    if (!stats) return;
    const result = runSimulation(SCENARIOS[selectedScenario], {
      tps: stats.tps,
      mempoolSize: stats.mempoolSize,
      avgBlockTime: stats.avgBlockTime,
      healthScore: 94,
    });
    setSimulation(result);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <NeonText size="2xl" color="cyan" className="font-bold block">ECONOMIC INTELLIGENCE</NeonText>
          <div className="text-gray-600 font-mono text-xs mt-1">Market regime detection and economic signals</div>
        </div>
        <LiveIndicator live label="LIVE ANALYSIS" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Regime Indicator */}
        <GlassCard className="p-6">
          <NeonText color="pink" size="sm" className="font-bold uppercase tracking-wider mb-4 block">
            Market Regime
          </NeonText>
          {regime ? (
            <div className="space-y-4">
              <div className="text-center py-6">
                <div
                  className="text-4xl font-bold font-mono mb-2"
                  style={{ color: regime.color, textShadow: `0 0 20px ${regime.color}` }}
                >
                  {regime.regime}
                </div>
                <div className="text-gray-500 font-mono text-sm">
                  Confidence: {(regime.confidence * 100).toFixed(0)}%
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {regime.indicators.map(ind => (
                  <GlowBadge key={ind} label={ind} color="purple" size="sm" />
                ))}
              </div>
            </div>
          ) : (
            <div className="animate-pulse h-32 bg-[rgba(255,255,255,0.03)] rounded" />
          )}
        </GlassCard>

        {/* Economic Signals */}
        <GlassCard className="p-6">
          <NeonText color="cyan" size="sm" className="font-bold uppercase tracking-wider mb-4 block">
            Economic Signals
          </NeonText>
          {signals ? (
            <div className="space-y-3">
              {[
                { label: 'TPS Velocity', value: signals.tpsVelocity.toFixed(2), unit: 'tx/s²', bar: Math.min(100, Math.abs(signals.tpsVelocity) * 10) },
                { label: 'Fee Pressure', value: signals.feePressureIndex.toFixed(1), unit: '%', bar: signals.feePressureIndex },
                { label: 'Congestion Index', value: signals.congestionIndex.toFixed(1), unit: '%', bar: signals.congestionIndex },
                { label: 'Gas Utilization', value: (signals.utilizationRate * 100).toFixed(1), unit: '%', bar: signals.utilizationRate * 100 },
                { label: 'Mempool Pressure', value: signals.mempoolPressure.toFixed(1), unit: '%', bar: signals.mempoolPressure },
              ].map(sig => (
                <div key={sig.label}>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-gray-500">{sig.label}</span>
                    <span className="text-[#00ffe1]">{sig.value} {sig.unit}</span>
                  </div>
                  <div className="h-1.5 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${sig.bar}%`,
                        backgroundColor: sig.bar > 80 ? '#ff0044' : sig.bar > 60 ? '#ffaa00' : '#00ffe1'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="animate-pulse h-40 bg-[rgba(255,255,255,0.03)] rounded" />
          )}
        </GlassCard>
      </div>

      {/* Simulation Console */}
      <GlassCard className="p-6">
        <NeonText color="purple" size="sm" className="font-bold uppercase tracking-wider mb-4 block">
          What-If Simulation Console
        </NeonText>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-mono text-gray-500 uppercase block mb-2">Select Scenario</label>
              <div className="space-y-2">
                {SCENARIOS.map((s, i) => (
                  <button
                    key={s.name}
                    onClick={() => setSelectedScenario(i)}
                    className={`w-full text-left px-4 py-3 rounded-lg border font-mono text-sm transition-all ${
                      selectedScenario === i
                        ? 'border-[rgba(0,255,225,0.4)] bg-[rgba(0,255,225,0.05)] text-[#00ffe1]'
                        : 'border-[rgba(255,255,255,0.05)] text-gray-400 hover:border-[rgba(255,255,255,0.1)]'
                    }`}
                  >
                    <div className="font-medium">{s.name}</div>
                    <div className="text-xs text-gray-600 mt-0.5">{s.description}</div>
                  </button>
                ))}
              </div>
            </div>
            <NeonButton variant="cyan" className="w-full" onClick={runScenario} disabled={!stats}>
              RUN SIMULATION
            </NeonButton>
          </div>

          {simulation && (
            <GlassCard className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <GlowBadge label={simulation.risk} color={riskColors[simulation.risk]} />
                <NeonText color="cyan" size="sm" className="font-bold">{simulation.scenario}</NeonText>
              </div>
              <div className="space-y-2">
                {[
                  { label: 'TPS Impact', value: simulation.tpsImpact, unit: ' tx/s' },
                  { label: 'Mempool Impact', value: simulation.mempoolImpact, unit: ' txs' },
                  { label: 'Block Time Impact', value: simulation.blockTimeImpact, unit: 's' },
                  { label: 'Health Score Impact', value: simulation.healthScoreImpact, unit: '' },
                ].map(row => (
                  <div key={row.label} className="flex justify-between text-xs font-mono">
                    <span className="text-gray-500">{row.label}</span>
                    <span className={row.value > 0 ? 'text-[#00ff88]' : 'text-[#ff0044]'}>
                      {row.value > 0 ? '+' : ''}{row.value.toFixed(1)}{row.unit}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.05)]">
                <div className="text-xs font-mono text-gray-500">RECOMMENDATION</div>
                <div className="text-sm font-mono text-gray-300 mt-1">{simulation.recommendation}</div>
              </div>
            </GlassCard>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
