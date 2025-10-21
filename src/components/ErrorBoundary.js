import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleGoHome = () => {
    // Clear error state and navigate to home
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Beautiful error UI with green gradient background
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)',
          padding: '40px'
        }}>
          <div style={{
            maxWidth: '800px',
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '48px',
            padding: '80px 60px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            border: '3px solid rgba(255, 255, 255, 0.8)'
          }}>
            {/* Error Icon */}
            <div style={{
              fontSize: '120px',
              marginBottom: '30px'
            }}>
              ⚠️
            </div>

            {/* Oops! Title */}
            <h1 style={{
              fontSize: '96px',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '24px',
              letterSpacing: '-2px'
            }}>
              Oops!
            </h1>

            {/* Something went wrong message */}
            <p style={{
              fontSize: '52px',
              fontWeight: '400',
              color: '#6b7280',
              marginBottom: '60px',
              lineHeight: '1.4'
            }}>
              Something went wrong
            </p>

            {/* Error details (optional, for debugging) */}
            {this.state.error && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.1)',
                borderRadius: '24px',
                padding: '30px',
                marginBottom: '60px',
                textAlign: 'left'
              }}>
                <p style={{
                  fontSize: '32px',
                  fontWeight: '600',
                  color: '#ef4444',
                  marginBottom: '12px'
                }}>
                  Error Details:
                </p>
                <p style={{
                  fontSize: '28px',
                  color: '#7f1d1d',
                  fontFamily: 'monospace',
                  wordBreak: 'break-word'
                }}>
                  {this.state.error.toString()}
                </p>
              </div>
            )}

            {/* Go to Home button */}
            <button
              onClick={this.handleGoHome}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
                padding: '40px 80px',
                borderRadius: '36px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                fontSize: '56px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(16, 185, 129, 0.4)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(16, 185, 129, 0.5)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(16, 185, 129, 0.4)';
              }}
            >
              <span style={{
                fontSize: '48px'
              }}>
                🏠
              </span>
              Go to Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
