'use client';
import Link from 'next/link';
import { lazy, Suspense } from 'react';
import useSWR from 'swr';
import CommandDashboard from '@/components/explorer/CommandDashboard';
import BlockStream from '@/components/explorer/BlockStream';
import TransactionList from '@/components/explorer/TransactionList';
import ChartCard from '@/components/ui/ChartCard';
import LiveIndicator from '@/components/ui/LiveIndicator';

// Lazy-load chart to avoid blocking initial render
const TpsChart = lazy(() => import('@/components/charts/TpsChart'));

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function HomePage() {
  // Track whether the blocks/transactions feed is actually live
  const { data: txData, error: txError } = useSWR('/api/blocks?count=5', fetcher, { refreshInterval: 3000 });
  const txLive = !txError && !!txData;

  return (
    <div className="p-4 md:p-6 space-y-6">
      <CommandDashboard />

      {/* Charts row — collapsible on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="TPS Realtime"
          subtitle="last 60s"
          collapsible
        >
          <Suspense fallback={<div className="h-48 animate-pulse bg-[rgba(255,255,255,0.03)] rounded" />}>
            <TpsChart />
          </Suspense>
        </ChartCard>

        <ChartCard
          title="Live Blocks"
          headerRight={
            <Link href="/blocks" className="text-[10px] font-mono text-gray-600 hover:text-[#00ffe1] transition-colors">
              View all →
            </Link>
          }
          collapsible
        >
          <BlockStream limit={8} compact />
        </ChartCard>
      </div>

      {/* Recent Transactions */}
      <ChartCard
        title="Recent Transactions"
        headerRight={<LiveIndicator live={txLive} label="LIVE" />}
      >
        <TransactionList limit={8} />
      </ChartCard>
    </div>
  );
}
