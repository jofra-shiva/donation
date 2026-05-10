import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Globe, MessageSquare, Share2, Info } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="bg-indigo-600 p-2 rounded-lg">
                                <Heart className="w-6 h-6 text-white fill-white" />
                            </div>
                            <span className="text-2xl font-bold text-white tracking-tight">KindHeart</span>
                        </Link>
                        <p className="text-slate-400 leading-relaxed">
                            Empowering communities and changing lives through collective kindness. Together, we can build a better world for everyone.
                        </p>
                        <div className="flex space-x-4">
                            {[Globe, MessageSquare, Share2, Info].map((Icon, idx) => (
                                <a key={idx} href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-300">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            {['About Us', 'All Campaigns', 'How it Works', 'Success Stories', 'Volunteer'].map((link) => (
                                <li key={link}>
                                    <Link to="#" className="hover:text-indigo-400 transition-colors">{link}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Categories</h4>
                        <ul className="space-y-4">
                            {['Medical', 'Education', 'Disaster Relief', 'Food Support', 'Animal Rescue'].map((cat) => (
                                <li key={cat}>
                                    <Link to={`/campaigns?category=${cat}`} className="hover:text-indigo-400 transition-colors">{cat}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Contact Info</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-indigo-500 mt-1" />
                                <span>123 Kindness St, Heart City, HC 12345</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-indigo-500" />
                                <span>+1 (234) 567-890</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 text-indigo-500" />
                                <span>contact@kindheart.org</span>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div className="pt-8 border-t border-slate-800 flex flex-col md:row justify-between items-center space-y-4 md:space-y-0 text-sm">
                    <p>© 2026 KindHeart. All rights reserved.</p>
                    <div className="flex space-x-8">
                        <Link to="#" className="hover:text-white">Privacy Policy</Link>
                        <Link to="#" className="hover:text-white">Terms of Service</Link>
                        <Link to="#" className="hover:text-white">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
