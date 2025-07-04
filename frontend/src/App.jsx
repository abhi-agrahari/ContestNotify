import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';

function App() {
  
  return (
      <Router>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<h2> Welcome to Home Page </h2>} />
        </Routes>
      </Router>
  )
}

export default App
