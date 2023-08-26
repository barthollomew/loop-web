import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSignUp = () => {
        const usernameRegex = /^[a-zA-Z0-9]{5,20}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    
        if (!usernameRegex.test(username)) {
            alert("Invalid username. Usernames should be 5-20 characters long and contain only alphanumeric characters.");
            return;
        }
        if (!passwordRegex.test(password)) {
            alert("Invalid password. Passwords should be at least 8 characters long, contain an uppercase letter, lowercase letter, number, and special character.");
            return;
        }
        if (!emailRegex.test(email)) {
            alert("Invalid email format.");
            return;
        }
    
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        if (users.some(user => user.username === username)) {
            alert("Username already exists");
            return;
        }
    
        const newUser = { username, password, name: username, email: email };
        localStorage.setItem("users", JSON.stringify([...users, newUser]));
        localStorage.setItem("currentUser", JSON.stringify(newUser));
    
        alert("Successfully signed up!");
        navigate("/Profile/ProfilePage");
    };    

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create your account
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
                <input
                    type="email" 
                    className="mt-2 block w-full p-3 rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <button className="mt-2 w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none" onClick={handleSignUp}>
                    Sign Up
                </button>
            </div>
        </div>
    );
}

export default SignUpPage;
