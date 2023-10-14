import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/accounts/signin", {  // Adjusted API endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
    
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);  // Adjusted to handle custom error message
            }
    
            const data = await response.json();
            localStorage.setItem("currentUser", JSON.stringify(data.user));
            alert(data.message);
            navigate("/Profile/ProfilePage");
        } catch (error) {
            alert(error.message);
        }
    };
    

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <input
                    type="text"
                    className="mt-2 block w-full p-3 rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    className="mt-2 block w-full p-3 rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button className="mt-2 w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none" onClick={handleSignIn}>
                    Sign In
                </button>
            </div>
        </div>
    );
}

export default SignInPage;
