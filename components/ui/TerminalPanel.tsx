'use client';
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface LogEntry {
  timestamp: number;
  level: 'info' | 'warn' | 'error' | 'success';
  message: string;
  source?: string;
}

interface TerminalPanelProps {
  logs: LogEntry[];
  title?: string;
  className?: string;
  maxHeight?: string;
}

export default function TerminalPanel({
  logs, title = 'TERMINAL', className, maxHeight = '300px'
}: TerminalPanelProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const colors = {
    info: 'text-[#00ffe1]',
    warn: 'text-[#ffaa00]',
    error: 'text-[#ff3b3b]',
    success: 'text-[#00ff88]',
  };

  const prefixes = {
    info: '[INFO]',
    warn: '[WARN]',
    error: '[ERR!]',
    success: '[OK!]',
  };

  return (
    <div className={cn('rounded-xl border border-[rgba(0,255,225,0.15)] bg-[rgba(0,0,0,0.5)]', className)}>
      <div className="flex items-center gap-2 px-4 py-2 border-b border-[rgba(0,255,225,0.1)]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff3b3b]" />
          <div className="w-3 h-3 rounded-full bg-[#ffaa00]" />
          <div className="w-3 h-3 rounded-full bg-[#00ff88]" />
        </div>
        <span className="text-xs font-mono text-gray-500 ml-2">{title}</span>
      </div>
      <div className="p-4 overflow-auto font-mono text-xs space-y-1" style={{ maxHeight }}>
        {logs.map((log, i) => (
          <div key={i} className="flex gap-2">
            <span className="text-gray-600 shrink-0">
              {new Date(log.timestamp).toLocaleTimeString('en-US', { hour12: false })}
            </span>
            {log.source && (
              <span className="text-[#7a00ff] shrink-0">[{log.source}]</span>
            )}
            <span className={cn(colors[log.level], 'shrink-0')}>{prefixes[log.level]}</span>
            <span className="text-gray-300">{log.message}</span>
          </div>
        ))}
        <div ref={endRef} />
      </div>
    </div>
  );
}
