import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
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
            <div>
                <h1 style={{
                    fontSize: '10rem',
                    margin: 0,
                    fontWeight: 'bold',
                    textShadow: '4px 4px 8px rgba(0,0,0,0.3)'
                }}>
                    404
                </h1>
                <h2 style={{
                    fontSize: '2.5rem',
                    marginTop: '20px',
                    marginBottom: '10px'
                }}>
                    Page Not Found
                </h2>
                <p style={{
                    marginTop: '20px',
                    fontSize: '1.2rem',
                    opacity: 0.9,
                    maxWidth: '500px',
                    margin: '20px auto'
                }}>
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <div style={{ marginTop: '40px' }}>
                    <Link
                        to="/"
                        style={{
                            display: 'inline-block',
                            padding: '15px 40px',
                            background: 'white',
                            color: '#667eea',
                            textDecoration: 'none',
                            borderRadius: '8px',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                        }}
                        onMouseOver={(e) => {
                            e.target.style.transform = 'translateY(-3px)';
                            e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
                        }}
                    >
                        ← Back to Home
                    </Link>
                </div>
                <div style={{ marginTop: '40px', opacity: 0.7 }}>
                    <p>Lost? Here are some helpful links:</p>
                    <div style={{
                        display: 'flex',
                        gap: '20px',
                        justifyContent: 'center',
                        marginTop: '15px',
                        flexWrap: 'wrap'
                    }}>
                        <Link to="/start" style={{ color: 'white', textDecoration: 'underline' }}>
                            Start Session
                        </Link>
                        <Link to="/exit" style={{ color: 'white', textDecoration: 'underline' }}>
                            Exit Session
                        </Link>
                        <Link to="/admin" style={{ color: 'white', textDecoration: 'underline' }}>
                            Admin Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
