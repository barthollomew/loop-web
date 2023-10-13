// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import MovieList from './components/MovieList';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <div className="content">
                    <Route path="/signin" component={SignIn} />
                    <Route path="/signup" component={SignUp} />
                    <Route exact path="/" component={MovieList} />
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
