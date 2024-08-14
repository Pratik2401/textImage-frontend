import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TextArea from './components/TextArea';
import MessagePage from './components/MessagePage'; // Import the new component
import { Analytics } from "@vercel/analytics/react"
function App() {
  return (
    <>
    <Analytics/>
    <Router>
      <Routes>
        <Route path="/" element={<TextArea />} />
        <Route path="/:id" element={<MessagePage />} /> 
      </Routes>
    </Router>
    </>
  );
}

export default App;
