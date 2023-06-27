import React from "react";
import './App.css';
import Api from './api/Api';
import Login from './Components/Login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}


export default App;