'use client';
import { useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import NeonText from '@/components/ui/NeonText';
import NeonButton from '@/components/ui/NeonButton';
import GlowBadge from '@/components/ui/GlowBadge';
import { formatHash } from '@/lib/utils';

interface DeployResult {
  hash: string;
  contractAddress: string;
  blockHeight: number;
}

export default function DeployPage() {
  const [bytecode, setBytecode] = useState('0x608060405234801561001057600080fd5b50...');
  const [abi, setAbi] = useState('[{"type":"constructor","inputs":[],"stateMutability":"nonpayable"}]');
  const [deploying, setDeploying] = useState(false);
  const [result, setResult] = useState<DeployResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDeploy = async () => {
    setDeploying(true);
    setError(null);
    setResult(null);
    try {
      const parsed = JSON.parse(abi);
      const res = await fetch('/api/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ abi: parsed, bytecode }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Deploy failed');
      setResult(data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setDeploying(false);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <div>
        <NeonText size="2xl" color="purple" className="font-bold block">CONTRACT DEPLOY</NeonText>
        <div className="text-gray-600 font-mono text-xs mt-1">Deploy smart contracts to GXQS mainnet</div>
      </div>

      <GlassCard className="p-6 space-y-4">
        <div>
          <label className="text-xs font-mono text-gray-500 uppercase block mb-2">Contract ABI</label>
          <textarea
            value={abi}
            onChange={e => setAbi(e.target.value)}
            rows={4}
            className="w-full bg-[rgba(0,0,0,0.4)] border border-[rgba(0,255,225,0.2)] rounded-lg px-3 py-2 text-sm font-mono text-gray-300 focus:outline-none focus:border-[rgba(0,255,225,0.5)] resize-none"
          />
        </div>
        <div>
          <label className="text-xs font-mono text-gray-500 uppercase block mb-2">Bytecode</label>
          <textarea
            value={bytecode}
            onChange={e => setBytecode(e.target.value)}
            rows={3}
            className="w-full bg-[rgba(0,0,0,0.4)] border border-[rgba(0,255,225,0.2)] rounded-lg px-3 py-2 text-sm font-mono text-gray-300 focus:outline-none focus:border-[rgba(0,255,225,0.5)] resize-none"
          />
        </div>
        <NeonButton
          variant="cyan"
          size="lg"
          className="w-full"
          onClick={handleDeploy}
          disabled={deploying}
        >
          {deploying ? '⏳ DEPLOYING...' : '⊕ DEPLOY CONTRACT'}
        </NeonButton>
      </GlassCard>

      {error && (
        <GlassCard glow="pink" className="p-4">
          <div className="text-[#ff0044] font-mono text-sm">Error: {error}</div>
        </GlassCard>
      )}

      {result && (
        <GlassCard glow="cyan" className="p-6 space-y-3">
          <div className="flex items-center gap-2">
            <GlowBadge label="DEPLOYED" color="green" />
            <NeonText color="cyan" size="sm" className="font-bold">Contract Deployed Successfully</NeonText>
          </div>
          {[
            { label: 'TX Hash', value: formatHash(result.hash, 16) },
            { label: 'Contract', value: formatHash(result.contractAddress, 16) },
            { label: 'Block', value: `#${result.blockHeight}` },
          ].map(row => (
            <div key={row.label} className="flex items-center gap-3">
              <span className="text-xs font-mono text-gray-600 w-20">{row.label}</span>
              <span className="text-sm font-mono text-[#00ffe1]">{row.value}</span>
            </div>
          ))}
        </GlassCard>
      )}
    </div>
  );
}
