import React, { useState } from 'react';
import { UserRound, KeyRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props {
    setUser: (user: { username: string }) => void; // Function to set user in parent component
}

const Login: React.FC<Props> = ({ setUser }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        registerNumber: '',
        password: '',
        rememberMe: false
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // **No Authentication Check** - Directly set the user
        setUser({ username: formData.registerNumber });  // Set the user with registration number

        // Clear inputs after submission
        setFormData({
            registerNumber: '',
            password: '',
            rememberMe: false
        });

        // Navigate to the home page
        navigate('/home'); // Redirect to home page

    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    };

    return (
        <div className="min-h-[89.5vh]  flex flex-col items-center justify-center ">
            <div className="w-full max-w-[400px] bg-white rounded-3xl shadow-lg p-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-2">Student Login</h1>
                    <p className="text-gray-500 text-sm">Welcome back! (data not storing)</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="text-sm text-gray-600 mb-1 block">Register Number</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                <UserRound className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="registerNumber"
                                value={formData.registerNumber}
                                onChange={handleInputChange}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                                placeholder="Enter Register Number"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm text-gray-600 mb-1 block">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                <KeyRound className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                                placeholder="Enter Password"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="rememberMe"
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
                        />
                        <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-600">
                            Remember me
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#2c3a47] text-white py-3 rounded-xl hover:bg-[#34495e] transition-colors font-medium"
                    >
                        Login
                    </button>

                    <div className="text-center">
                        <button
                            type="button"
                            onClick={() => navigate('/signup')}
                            className="text-sm text-gray-600 hover:text-blue-500 transition-colors"
                        >
                            Don't have an account?
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default Login;
