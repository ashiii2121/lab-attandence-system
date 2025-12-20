import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import Main from './Main';
import Admin from './Admin';
import Exit from './Exit';
import Start from './Start';
import Token from './Token';
import NotFound from './NotFound';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/exit" element={<Exit />} />
          <Route path="/start" element={<Start />} />
          <Route path="/token" element={<Token />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;