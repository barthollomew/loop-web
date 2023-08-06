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
      <h1>Test!</h1>
      <Footer />
    </div>
  );
}

export default App;
