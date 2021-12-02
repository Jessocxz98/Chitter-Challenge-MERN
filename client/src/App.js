import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthForms } from "./authentication/auth_forms.js"
import { Home } from './peeps/home'
import { Navbar } from './navbar/navbar.js';

const App = () => {
  return (
    <div className="area">
      <Navbar />
    <Router>
      <Routes>
        <Route path='/signup-or-login' element={<AuthForms />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
