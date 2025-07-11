import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import Contests from './components/Contests.jsx';
import Preferences from './components/preferences.jsx';

function App() {
  
  return (
      <Router>
        <Routes>
          <Route path='/' element={<Contests />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/preferences' element={<Preferences />} />
        </Routes>
      </Router>
  )
}

export default App
