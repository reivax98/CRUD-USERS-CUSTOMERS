import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Customers from './components/Customers';
import Login from './components/Login';
import useToken from './useToken';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return (
      <div>
        <Header />
        <Login setToken={setToken} />
        <Footer />
      </div>
    );
  }
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Customers />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
