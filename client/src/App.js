import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginForm from './pages/login';
import Home from './pages/home';
import WorldwideNews from './pages/worldwide-news';
import Identify from './pages/identify';
import EscrowAgreementPage from './pages/escrow/EscrowAgreementPage';
import ProductList from './pages/find-buyers';
import RegisterForm from './pages/register';
import Lessons from './pages/lessions'; // Make sure to import the correct component
import LoginPage from './pages/login';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/worldwide-news" element={<WorldwideNews />} />
          <Route path="/identify" element={<Identify />} />
          <Route path="/escrow" element={<EscrowAgreementPage />} />
          <Route path="/find-buyers" element={<ProductList />} />
          <Route path="/lessions" element={<Lessons />} /> 
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
