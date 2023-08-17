import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import SignInPage from './components/SignInForm/SignInForm';
import SignUpPage from './components/SignUpForm/SignUpForm';
import LandingPage from './components/LandingPage/LandingPage';
import ProfilePage from './components/Profile/ProfilePage/ProfilePage';
import Movies from './components/Movies/Movies';  

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <NavBar />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/signIn' element={<SignInPage />} />
          <Route path='/signUp' element={<SignUpPage />} />
          <Route path='/Profile/ProfilePage' element={<ProfilePage />} />
          <Route path='/movies' element={<Movies />} /> 
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
