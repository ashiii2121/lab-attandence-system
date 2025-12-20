import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './token.css'; // Assuming token.css is available

const Token = () => {
  const [token, setToken] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get('token');

    if (tokenFromUrl && !isNaN(tokenFromUrl)) {
      setToken(tokenFromUrl);

      const timer = setTimeout(() => {
        navigate('/');
      }, 4000);

      return () => clearTimeout(timer);
    } else {
      // Invalid token, redirect immediately
      navigate('/');
    }
  }, [location, navigate]);

  return (
    <div className="sliding-background">
      <div className="container">
        <div id="lab">
          <h2>LAB ATTENDANCE SYSTEM</h2>
          <p>Designed By LIVEWIRE Kasaragod | 2025</p>
          <div id="token">
            {token && <h4 className="count">{token}</h4>}
          </div>
          <div className="buttons-section">
            <div className="image-below-buttons">
            </div>
            <footer>Need any help? Reach out to the lab admin</footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Token;