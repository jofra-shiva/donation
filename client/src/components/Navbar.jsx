import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Heart, User, LogOut, LayoutDashboard, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass-morphism py-3' : 'bg-transparent py-5'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="bg-indigo-600 p-2 rounded-lg transition-transform group-hover:rotate-12">
                            <Heart className="w-6 h-6 text-white fill-white" />
                        </div>
                        <span className="text-2xl font-bold text-slate-800 tracking-tight">KindHeart</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Home</Link>
                        <Link to="/campaigns" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Campaigns</Link>
                        <Link to="/about" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">About Us</Link>
                        
                        <div className="relative group">
                            <button className="p-2 text-slate-600 hover:text-indigo-600 transition-colors">
                                <Search className="w-5 h-5" />
                            </button>
                        </div>

                        {user ? (
                            <div className="flex items-center space-x-4">
                                <Link to={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'} className="flex items-center space-x-2 text-slate-700 bg-slate-100 px-4 py-2 rounded-xl hover:bg-slate-200 transition-all">
                                    <User className="w-4 h-4" />
                                    <span className="font-medium">{user.name.split(' ')[0]}</span>
                                </Link>
                                <button onClick={handleLogout} className="p-2 text-slate-500 hover:text-red-600 transition-colors">
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="text-slate-600 font-medium hover:text-indigo-600 transition-colors">Login</Link>
                                <Link to="/register" className="btn-primary py-2 px-5 text-sm">Join Us</Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-600">
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden glass-morphism absolute top-full left-0 w-full p-4 space-y-4 animate-fade-in">
                    <Link to="/" className="block py-2 text-slate-600 font-medium" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link to="/campaigns" className="block py-2 text-slate-600 font-medium" onClick={() => setIsOpen(false)}>Campaigns</Link>
                    <Link to="/about" className="block py-2 text-slate-600 font-medium" onClick={() => setIsOpen(false)}>About Us</Link>
                    <hr className="border-slate-200" />
                    {user ? (
                        <>
                            <Link to="/dashboard" className="block py-2 text-slate-600 font-medium" onClick={() => setIsOpen(false)}>Dashboard</Link>
                            <button onClick={handleLogout} className="w-full text-left py-2 text-red-600 font-medium">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="block py-2 text-slate-600 font-medium" onClick={() => setIsOpen(false)}>Login</Link>
                            <Link to="/register" className="block w-full btn-primary text-center" onClick={() => setIsOpen(false)}>Join Us</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
