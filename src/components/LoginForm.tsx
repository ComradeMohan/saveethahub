// src/components/LoginForm.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth'; // Import the custom hook

interface Props {
    setUser: (user: { username: string; email?: string }) => void; // Update user type to include email
}

const LoginForm: React.FC<Props> = ({ setUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { signInWithGoogle } = useAuth(); // Use the custom hook

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Directly set the user without verification (for manual login)
        setUser({ username });
        setUsername('');
        setPassword('');
        navigate('/'); // Redirect to home page
    };

    const handleGoogleSignIn = async () => {
        try {
            const userDetails = await signInWithGoogle();
            setUser(userDetails); // Set user details after successful sign-in
            navigate('/'); // Redirect to home page after sign-in
        } catch (error) {
            console.error("Google Sign-In failed:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="backdrop-blur p-6 rounded shadow-md w-full max-w-sm">
            <h1 className='text-4xl text-white text-center'>Login</h1>
            <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-white">Username:</label>
                <input 
                    type="text" 
                    id="username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                    className="bg-transparent text-white mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-white">Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    className="bg-transparent text-white mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
            </div>
            <button type="submit" className="w-full bg-gradient-to-br from-[#0d9488] to-[#1a365d] text-white py-2 rounded hover:bg-blue-700">
                Login
            </button>
            <div className="mt-4">
                <button type="button" onClick={handleGoogleSignIn} className="w-full flex items-center justify-center bg-white border border-gray-300 rounded-md py-2 hover:shadow-lg transition-shadow">
                    <img src="https://img.icons8.com/?size=256&id=JvOSspDsPpwP&format=png" alt="Google Icon" className="h-5 mr-2" />
                    Sign in with Google
                </button>
            </div>
        </form>
    );
};

export default LoginForm;
