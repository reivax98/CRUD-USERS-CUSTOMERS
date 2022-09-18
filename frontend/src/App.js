import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Customers from './Customers';
import Login from './Login';
import useToken from './useToken';
import Header from './Header';
import Footer from './Footer';

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />
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
