import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Main';
import Admin from './Admin';
import Exit from './Exit';
import Start from './Start';
import Token from './Token';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/exit" element={<Exit />} />
        <Route path="/start" element={<Start />} />
        <Route path="/token" element={<Token />} />
      </Routes>
    </Router>
  );
}

export default App;