// src/components/SignIn.js
import React from 'react';

const SignIn = () => {
    return (
        <div className="p-4">
            <h2>Sign In</h2>
            <form>
                <div className="mb-4">
                    <label htmlFor="email" className="block">Email:</label>
                    <input type="email" id="email" className="border p-2" />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block">Password:</label>
                    <input type="password" id="password" className="border p-2" />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2">Sign In</button>
            </form>
        </div>
    );
};

export default SignIn;
