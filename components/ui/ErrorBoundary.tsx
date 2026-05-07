'use client';
import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: '' };

  static getDerivedStateFromError(error: unknown): State {
    return {
      hasError: true,
      message: error instanceof Error ? error.message : 'An unexpected error occurred.',
    };
  }

  override componentDidCatch(error: unknown, info: { componentStack: string }) {
    // Surface error details to the console for observability
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  override render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
          <div className="text-[#ff0044] font-mono text-sm uppercase tracking-widest">
            ⚠ Component Error
          </div>
          <p className="text-gray-500 font-mono text-xs max-w-md">
            {this.state.message}
          </p>
          <button
            className="px-4 py-2 text-xs font-mono border border-[#00ffe1]/30 text-[#00ffe1] hover:border-[#00ffe1] transition-colors"
            onClick={() => this.setState({ hasError: false, message: '' })}
          >
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
