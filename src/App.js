import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import SignInPage from './components/SignInForm/SignInForm';
import LandingPage from './components/LandingPage/LandingPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <NavBar />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/signIn' element={<SignInPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
