import { Component, type ReactNode } from 'react'
import { AlertTriangle, RotateCcw } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback
      return (
        <div className="min-h-[50vh] flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center" style={{ background: '#C84B3112' }}>
              <AlertTriangle className="w-8 h-8" style={{ color: '#C84B31' }} />
            </div>
            <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>页面加载出错</h2>
            <p className="text-sm mb-6" style={{ color: 'var(--text-tertiary)' }}>
              {this.state.error?.message || '未知错误，请尝试刷新页面'}
            </p>
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-105"
              style={{ background: 'var(--accent-primary)', color: '#fff' }}
            >
              <RotateCcw className="w-4 h-4" />
              重新加载
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
