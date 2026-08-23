import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Caught by ErrorBoundary:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-steel flex items-center justify-center px-6">
          <div className="text-center">
            <p className="font-display text-xl text-ink mb-2">Something went wrong</p>
            <p className="font-body text-sm text-slate mb-6">Please refresh the page.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-ink text-paper font-medium px-6 py-2.5 rounded-md hover:bg-blueprint transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary