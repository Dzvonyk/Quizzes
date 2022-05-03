import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import logo from './logo.svg';
import './App.css';
import HomePage from './pages/home.page';
import PlayPage from './pages/play.page';
import FinishPage from './pages/finish.page';
import { Box, Container } from '@mui/material';

const App = () => {
  return (
    <Router>
      <Container maxWidth="sm">
        <Box textAlign="center" mt={3}>
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/play" element={<PlayPage />}/>
            <Route path="/finish" element={<FinishPage />}/>
          </Routes>
        </Box>
      </Container>
    </Router>
  )
}

export default App  
