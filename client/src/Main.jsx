import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './1.css'; // Assuming 1.css is in the same directory or accessible

const Main = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="sliding-background">
      <div className="container">
        <div id="lab">
          <h2>LAB ATTENDANCE SYSTEM</h2>
          <p>Designed By LIVEWIRE Kasaragod | 2025</p>
          <div id="time">{time}</div>
          <div className="buttons-section">
            <Link to="/start" className="button start-session">
              Start Session
              <div id="fa1"><i className="fa-solid fa-arrow-right"></i></div>
            </Link>
            <Link to="/exit" className="button exit-session">
              Exit Session
              <div id="fa2"><i className="fa-solid fa-person-running"></i></div>
            </Link>
          </div>
          <div className="image-below-buttons">
          </div>
          <footer>Need any help? Reach out to the lab admin</footer>
        </div>
      </div>
    </div>
  );
};

export default Main;