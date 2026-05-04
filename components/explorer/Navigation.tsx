'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'COMMAND', icon: '◈' },
  { href: '/blocks', label: 'BLOCKS', icon: '⬡' },
  { href: '/mempool', label: 'MEMPOOL', icon: '≋' },
  { href: '/validators', label: 'VALIDATORS', icon: '⬟' },
  { href: '/deploy', label: 'DEPLOY', icon: '⊕' },
  { href: '/ai-dashboard', label: 'AI INTEL', icon: '◎' },
  { href: '/ai-control', label: 'AI CTRL', icon: '⊛' },
  { href: '/global-intelligence', label: 'GLOBAL', icon: '◉' },
  { href: '/economic-intelligence', label: 'ECON', icon: '◇' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed left-0 top-0 bottom-0 w-16 bg-[rgba(5,1,10,0.95)] border-r border-[rgba(0,255,225,0.1)] flex flex-col items-center py-4 z-50 backdrop-blur-md">
      {/* Logo */}
      <div className="mb-6 flex flex-col items-center">
        <div className="w-10 h-10 rounded-lg bg-[rgba(0,255,225,0.1)] border border-[rgba(0,255,225,0.3)] flex items-center justify-center">
          <span className="text-[#00ffe1] text-lg font-bold font-mono">G</span>
        </div>
      </div>

      {/* Nav items */}
      <div className="flex flex-col gap-1 flex-1">
        {navItems.map(item => {
          const active = pathname === item.href || (item.href !== '/' && pathname === item.href) ||
            (item.href !== '/' && item.href.length > 1 && pathname.startsWith(item.href + '/'));
          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={cn(
                'w-12 h-12 rounded-lg flex flex-col items-center justify-center gap-0.5',
                'transition-all duration-200 group relative',
                active
                  ? 'bg-[rgba(0,255,225,0.1)] border border-[rgba(0,255,225,0.3)] text-[#00ffe1]'
                  : 'text-gray-600 hover:text-gray-300 hover:bg-[rgba(255,255,255,0.05)]'
              )}
            >
              <span className="text-base leading-none">{item.icon}</span>
              <span className="text-[8px] font-mono leading-none">{item.label.slice(0, 4)}</span>
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-[#00ffe1] rounded-r shadow-[0_0_8px_#00ffe1]" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Status dot */}
      <div className="flex flex-col items-center gap-1">
        <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-blink shadow-[0_0_8px_rgba(0,255,136,0.8)]" />
        <span className="text-[8px] font-mono text-gray-600">LIVE</span>
      </div>
    </nav>
  );
}
