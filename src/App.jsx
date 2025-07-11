//import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
//import ChatIcon from '@mui/icons-material/Chat';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import CoinDetail from './pages/CoinDetail';
import Watchlist from './pages/Watchlist';


import './App.css'; // Import global app styles

const App = () => {
  

  return (
    <Box className="app-container">
      <Sidebar />

      <Box component="main" className="main-content">
        <Header />

        <div className="page-container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/coin/:id" element={<CoinDetail />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Routes>
        </div>
      </Box>

      
       

      
    </Box>
  );
};

export default App;
