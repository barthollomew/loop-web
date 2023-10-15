import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        let newErrors = {};
        if (!username.trim()) newErrors.username = "Username is required";
        if (!password.trim()) newErrors.password = "Password is required";
        if (!email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
        
        setErrors(newErrors);
        // Only proceed to handleSignUp if there are no errors
        return Object.keys(newErrors).length === 0;
    }

    const handleSignUp = async () => {
        if (!validate()) return;
        
        try {
            const response = await fetch("http://localhost:3002/api/accounts/signup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, email }),
            });
    
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
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
                {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                <input
                    type="password"
                    className="mt-2 block w-full p-3 rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                <input
                    type="email" 
                    className="mt-2 block w-full p-3 rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                <button className="mt-2 w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none" onClick={handleSignUp}>
                    Sign Up
                </button>
            </div>
        </div>
    );
}

export default SignUpPage;
