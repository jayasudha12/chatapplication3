import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import Chat from './chat';
import Reset from './auth/Reset';
import Homepage from './auth/Homepage';
import About from './auth/About';
import Setting from './chat/sidebar/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/app" element={<Chat />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/settings" element={<Setting />} />
      </Routes>
    </Router>
  );
}

export default App;
