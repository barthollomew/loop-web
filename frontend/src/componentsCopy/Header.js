// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-blue-500 p-4 text-white">
            <h1 className="text-xl">MovieApp</h1>
            <nav>
                <Link to="/signin" className="mr-4">Sign In</Link>
                <Link to="/signup">Sign Up</Link>
            </nav>
        </header>
    );
};

export default Header;
