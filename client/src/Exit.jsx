import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './start.css'; // Assuming start.css is available

const Exit = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [token, setToken] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token.trim()) {
      alert("Please enter your token.");
      return;
    }
    try {
      const response = await axios.post('/api/exitpage', { token });
      if (response.data && response.data.success) {
        window.location.href = "/";
      } else {
        alert(response.data.message || 'Could not exit. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      if (error.response) {
        alert(`Error: ${error.response.data.message || 'An unknown server error occurred.'}`);
      } else if (error.request) {
        alert('Error: Cannot connect to the server. Please ensure the server is running.');
      } else {
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="sliding-background">
      <div className="container">
        <div id="lab">
          <h2>LAB ATTENDANCE SYSTEM</h2>
          <p>Designed By LIVEWIRE Kasaragod | 2025</p>
          <div id="time">{time}</div>
          <div className="buttons-section">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="input"
                placeholder="Enter Your Token Number"
                name="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
              <a href="/admin" className="btn btn-danger">Forget Token</a>
              <button className="btn btn-primary" type="submit">
                Exit
                <i className="fa-solid fa-arrow-right"></i>
              </button>
              <a href="/" className="btn btn-secondary">
                Go Back
                <i className="fa-solid fa-arrow-left"></i>
              </a>
            </form>
          </div>
          <div className="image-below-buttons">
          </div>
          <footer>Need any help? Reach out to the lab admin</footer>
        </div>
      </div>
    </div>
  );
};

export default Exit;