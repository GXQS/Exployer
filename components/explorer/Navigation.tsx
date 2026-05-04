'use client';
import Link from 'next/link';
import { useState } from 'react';
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

// Primary items shown directly in bottom bar; overflow shown in expandable tray
const primaryMobileItems = navItems.slice(0, 4);
const overflowMobileItems = navItems.slice(4);

function NavItem({
  item,
  pathname,
  mobile = false,
  onNavigate,
}: {
  item: typeof navItems[0];
  pathname: string;
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const active = pathname === item.href ||
    (item.href !== '/' && item.href.length > 1 && pathname.startsWith(item.href + '/'));

  if (mobile) {
    return (
      <Link
        href={item.href}
        aria-label={item.label}
        title={item.label}
        onClick={onNavigate}
        className={cn(
          'flex-1 flex flex-col items-center justify-center gap-0.5 py-2 relative',
          'transition-all duration-200',
          active ? 'text-[#00ffe1]' : 'text-gray-600 hover:text-gray-300'
        )}
      >
        <span className="text-base leading-none">{item.icon}</span>
        <span className="text-[10px] font-mono leading-none sr-only sm:not-sr-only">{item.label.slice(0, 4)}</span>
        {active && (
          <div className="absolute bottom-0 w-8 h-0.5 bg-[#00ffe1] rounded-t shadow-[0_0_8px_#00ffe1]" />
        )}
      </Link>
    );
  }

  return (
    <Link
      key={item.href}
      href={item.href}
      title={item.label}
      className={cn(
        'w-12 h-12 rounded-lg flex flex-col items-center justify-center gap-0.5',
        'transition-all duration-200 group relative',
        active
          ? 'bg-[rgba(0,255,225,0.08)] border border-[rgba(0,255,225,0.25)] text-[#00ffe1]'
          : 'text-gray-600 hover:text-gray-300 hover:bg-[rgba(255,255,255,0.05)]'
      )}
    >
      <span className="text-base leading-none">{item.icon}</span>
      <span className="text-[10px] font-mono leading-none">{item.label.slice(0, 4)}</span>
      {active && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-[#00ffe1] rounded-r shadow-[0_0_8px_#00ffe1]" />
      )}
    </Link>
  );
}

export default function Navigation() {
  const pathname = usePathname();
  const [showMore, setShowMore] = useState(false);

  // Show More button as active when current path is in the overflow set
  const moreActive = overflowMobileItems.some(
    item => pathname === item.href || (item.href.length > 1 && pathname.startsWith(item.href + '/'))
  );

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden md:flex fixed left-0 top-0 bottom-0 w-16 bg-[rgba(5,1,10,0.95)] border-r border-[rgba(0,255,225,0.1)] flex-col items-center py-4 z-50 backdrop-blur-md">
        {/* Logo */}
        <div className="mb-6 flex flex-col items-center">
          <div className="w-10 h-10 rounded-lg bg-[rgba(0,255,225,0.08)] border border-[rgba(0,255,225,0.25)] flex items-center justify-center">
            <span className="text-[#00ffe1] text-lg font-bold font-mono">G</span>
          </div>
        </div>

        {/* Nav items */}
        <div className="flex flex-col gap-1 flex-1 overflow-y-auto w-full items-center">
          {navItems.map(item => (
            <NavItem key={item.href} item={item} pathname={pathname} />
          ))}
        </div>

        {/* Status dot */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-blink shadow-[0_0_8px_rgba(0,255,136,0.8)]" />
          <span className="text-[10px] font-mono text-gray-600">LIVE</span>
        </div>
      </nav>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[rgba(5,1,10,0.97)] border-t border-[rgba(0,255,225,0.15)] backdrop-blur-md">
        {/* Overflow tray — shown when "More" is tapped */}
        {showMore && (
          <div className="border-b border-[rgba(0,255,225,0.1)] px-2 pt-2 pb-1 grid grid-cols-5 gap-1">
            {overflowMobileItems.map(item => (
              <NavItem
                key={item.href}
                item={item}
                pathname={pathname}
                mobile
                onNavigate={() => setShowMore(false)}
              />
            ))}
          </div>
        )}

        {/* Primary nav row */}
        <div className="flex items-stretch relative">
          {primaryMobileItems.map(item => (
            <NavItem key={item.href} item={item} pathname={pathname} mobile />
          ))}

          {/* More button */}
          <button
            onClick={() => setShowMore(m => !m)}
            aria-label="More navigation items"
            aria-expanded={showMore}
            className={cn(
              'flex-1 flex flex-col items-center justify-center gap-0.5 py-2 relative transition-all duration-200',
              (showMore || moreActive) ? 'text-[#00ffe1]' : 'text-gray-600 hover:text-gray-300'
            )}
          >
            <span className="text-base leading-none">⋯</span>
            <span className="text-[10px] font-mono leading-none sr-only sm:not-sr-only">MORE</span>
            {(showMore || moreActive) && (
              <div className="absolute bottom-0 w-8 h-0.5 bg-[#00ffe1] rounded-t shadow-[0_0_8px_#00ffe1]" />
            )}
          </button>
        </div>
      </nav>
    </>
  );
}
