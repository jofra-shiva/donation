import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Heart, Mail, Lock, User, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await register(name, email, password);
            toast.success('Registration successful!');
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-20 flex items-center justify-center bg-slate-50 px-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 text-white mb-6 shadow-lg shadow-indigo-200">
                        <Heart className="w-8 h-8 fill-current" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900">Create Account</h2>
                    <p className="text-slate-500 mt-2">Start your journey of making a difference</p>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    required
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                                <input
                                    type="email"
                                    required
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-slate-700 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                                <input
                                    type="password"
                                    required
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <p className="text-xs text-slate-400 mt-2">Must be at least 6 characters long.</p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary py-4 flex items-center justify-center"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-slate-100 text-center">
                        <p className="text-slate-500">
                            Already have an account?{' '}
                            <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-700">Sign In</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
