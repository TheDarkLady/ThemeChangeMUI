import React, { useEffect } from 'react';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import { darkTheme, lightTheme } from './Themes/theme';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Landing from './pages/landing';
import Contact from './pages/Contact';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // 
  const toogleTheme = () => {
    let newTheme = !darkMode
    setDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  }

  useEffect(() => {
    let theme = localStorage.getItem('theme');
    console.log("theme", theme);
    theme === 'dark' ? setDarkMode(true) : setDarkMode(false);
  }, [])

  return (
    <>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <Router>
          <nav>
            <ul>
              <li><Link to="/">Home</Link> </li>
              <li><Link to="/about">About</Link> </li>
              <li><Link to="/landing">Landing</Link> </li>
              <li><Link to="/contact">Contact</Link> </li>
              <div sx={{ padding: '1rem' }}>
                <IconButton onClick={toogleTheme} >
                  {darkMode ? '🌙' : '☀️'}
                </IconButton>
              </div>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Router>
      </ThemeProvider >
    </>

  )
}

export default App
