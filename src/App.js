// App.js
import React from 'react';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <NavBar />
      <h1>Welcome to My App!</h1>
      <p>This is a simple React app with user authentication and a landing page.</p>
      <Footer />
    </div>
  );
}

export default App;
