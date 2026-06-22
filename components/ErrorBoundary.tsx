"use client"

import { Component } from "react"

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center text-zinc-400">
          <p>Something went wrong. Please refresh the page.</p>
        </div>
      )
    }
    return this.props.children
  }
}
