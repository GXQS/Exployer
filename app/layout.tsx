import type { Metadata } from 'next';
import '../styles/globals.css';
import '../styles/cyber.css';
import Navigation from '@/components/explorer/Navigation';

export const metadata: Metadata = {
  title: 'GXQS Live Block Explorer',
  description: 'Enterprise-grade cyberpunk blockchain explorer for the GXQS network',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#05010a] text-gray-200 font-mono">
        <Navigation />
        {/* Desktop: offset for sidebar. Mobile: pad bottom for bottom nav. */}
        <main className="md:ml-16 min-h-screen pb-16 md:pb-0">
          {children}
        </main>
      </body>
    </html>
  );
}
