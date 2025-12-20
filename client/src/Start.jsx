import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './start.css'; // Assuming start.css is available

const Start = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/create', { name, notes });
      if (response.data && response.data.token) {
        navigate(`/token?token=${response.data.token}`);
      } else {
        alert('Could not get token. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      if (error.response) {
        // Show more details from server if available
        const serverMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          JSON.stringify(error.response.data) ||
          'An unknown server error occurred.';
        alert(`Error: ${serverMessage}`);
      } else if (error.request) {
        alert('Error: Cannot connect to the server. Please ensure the server is running.');
      } else {
        alert(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
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
                id="name-input"
                placeholder="Enter Your Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                required
              />
              <input
                type="text"
                id="notes-input"
                placeholder="Enter any notes (optional)"
                name="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                disabled={loading}
              />
              <button id="start" className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
                {!loading && <i className="fa-solid fa-arrow-right"></i>}
              </button>
            </form>
            <a href="/" className="btn btn-secondary">
              Go Back
              <i className="fa-solid fa-arrow-left"></i>
            </a>
          </div>
          <div className="image-below-buttons">
          </div>
          <footer>Need any help? Reach out to the lab admin</footer>
        </div>
      </div>
    </div>
  );
};

export default Start;