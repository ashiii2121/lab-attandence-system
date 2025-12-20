import React from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
        this.setState({ errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    textAlign: 'center',
                    padding: '20px'
                }}>
                    <div style={{ maxWidth: '600px' }}>
                        <h1 style={{ fontSize: '4rem', marginBottom: '20px' }}>😕</h1>
                        <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Oops! Something went wrong</h2>
                        <p style={{ marginTop: '20px', opacity: 0.9, fontSize: '1.1rem' }}>
                            {this.state.error?.message || 'An unexpected error occurred'}
                        </p>
                        {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
                            <details style={{
                                marginTop: '20px',
                                textAlign: 'left',
                                background: 'rgba(0,0,0,0.2)',
                                padding: '15px',
                                borderRadius: '8px',
                                fontSize: '0.9rem'
                            }}>
                                <summary style={{ cursor: 'pointer', marginBottom: '10px' }}>
                                    Error Details (Development Mode)
                                </summary>
                                <pre style={{
                                    overflow: 'auto',
                                    whiteSpace: 'pre-wrap',
                                    wordBreak: 'break-word'
                                }}>
                                    {this.state.error?.stack}
                                </pre>
                            </details>
                        )}
                        <div style={{ marginTop: '30px', display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button
                                onClick={() => window.location.reload()}
                                style={{
                                    padding: '12px 30px',
                                    background: 'white',
                                    color: '#667eea',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    transition: 'transform 0.3s ease'
                                }}
                                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                            >
                                🔄 Reload Page
                            </button>
                            <Link
                                to="/"
                                style={{
                                    display: 'inline-block',
                                    padding: '12px 30px',
                                    background: 'rgba(255,255,255,0.2)',
                                    color: 'white',
                                    textDecoration: 'none',
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                ← Go Home
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
