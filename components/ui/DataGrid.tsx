'use client';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => ReactNode;
  width?: string;
  align?: 'left' | 'right' | 'center';
}

interface DataGridProps<T> {
  data: T[];
  columns: Column<T>[];
  keyField: keyof T;
  onRowClick?: (row: T) => void;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
  maxHeight?: string;
}

export default function DataGrid<T extends Record<string, unknown>>({
  data, columns, keyField, onRowClick, loading, emptyMessage = 'No data', className, maxHeight
}: DataGridProps<T>) {
  return (
    <div className={cn('overflow-auto', maxHeight && `max-h-[${maxHeight}]`, className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-[rgba(0,255,225,0.1)]">
            {columns.map(col => (
              <th
                key={String(col.key)}
                className={cn(
                  'px-4 py-2 text-xs font-mono font-medium text-gray-500 uppercase tracking-wider',
                  col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left',
                  col.width
                )}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="border-b border-[rgba(255,255,255,0.03)]">
                {columns.map(col => (
                  <td key={String(col.key)} className="px-4 py-3">
                    <div className="h-4 bg-[rgba(255,255,255,0.05)] rounded animate-pulse" />
                  </td>
                ))}
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-gray-600 font-mono text-sm">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map(row => (
              <tr
                key={String(row[keyField])}
                onClick={() => onRowClick?.(row)}
                className={cn(
                  'border-b border-[rgba(255,255,255,0.03)]',
                  'hover:bg-[rgba(0,255,225,0.03)] transition-colors',
                  onRowClick && 'cursor-pointer'
                )}
              >
                {columns.map(col => (
                  <td
                    key={String(col.key)}
                    className={cn(
                      'px-4 py-3 text-sm font-mono text-gray-300',
                      col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                    )}
                  >
                    {col.render ? col.render(row) : String(row[col.key as keyof T] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
