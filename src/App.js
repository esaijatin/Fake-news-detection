import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import NewsForm from './components/NewsForm';
import Result from './components/Result';
import DarkModeToggle from './components/DarkModeToggle';
import ProfilePage from './components/ProfilePage';  
import './App.css';

// Function to generate a random percentage between 65% and 95%
const getRandomPercentage = (min = 68, max = 88) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const App = () => {
  const [result, setResult] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fixedPercentages, setFixedPercentages] = useState({}); // Store fixed percentages for articles

  const analyzeNews = (newsContent) => {
    // Check if a fixed percentage is already stored for this news content
    if (fixedPercentages[newsContent]) {
      setResult(`${fixedPercentages[newsContent]}% likely to be true`);
      return; // Return early if a fixed percentage exists
    }

    // Generate a random percentage result for the given news content
    const percentageResult = getRandomPercentage();

    // Store the fixed percentage for this news content
    setFixedPercentages((prevPercentages) => ({
      ...prevPercentages,
      [newsContent]: percentageResult,
    }));

    setResult(`${percentageResult}% likely to be fake`);
  };
  return (
    <Router>
      <div className={isDarkMode ? 'App dark-mode' : 'App'}>
        <header className="App-header">
          <div className="toggle-container">
            <DarkModeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          </div>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/profile">About Us</Link></li>
              <li><Link to="/">Contact us</Link></li>
              <li><Link to="/">Community</Link></li>
            </ul>
          </nav>
          <h1>Fake News Detector</h1>
        </header>
        <Routes>
          <Route exact path="/" element={
            <main>
              <NewsForm onSubmit={analyzeNews} />
              <Result result={result} />
            </main>
          } />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        <div className="App-background"></div>
      </div>
    </Router>
  );
};

export default App;
