import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Users, Target, ArrowRight, ShieldCheck, Zap, Globe } from 'lucide-react';
import axios from 'axios';

const stats = [
    { label: 'Total Donations', value: '$1.2M+', icon: Heart, color: 'bg-rose-100 text-rose-600' },
    { label: 'People Helped', value: '50k+', icon: Users, color: 'bg-blue-100 text-blue-600' },
    { label: 'Active Campaigns', value: '120+', icon: Target, color: 'bg-amber-100 text-amber-600' },
    { label: 'Global Reach', value: '25+', icon: Globe, color: 'bg-indigo-100 text-indigo-600' },
];

const Home = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/campaigns?sort=latest&limit=3');
                setCampaigns(data.campaigns);
            } catch (error) {
                console.error('Error fetching campaigns:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCampaigns();
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/40 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-200/30 rounded-full blur-[100px]" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold mb-6">
                            <Zap className="w-4 h-4 mr-2" /> Small Acts, Big Impact
                        </span>
                        <h1 className="text-5xl lg:text-7xl font-black text-slate-900 mb-8 leading-tight">
                            Together We Can <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-rose-500">Make a Difference</span>
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Join thousands of donors making a global impact. Start your own campaign or support causes that matter to you.
                        </p>
                        <div className="flex flex-col sm:row justify-center gap-4">
                            <Link to="/campaigns" className="btn-primary flex items-center justify-center">
                                Donate Now <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                            <Link to="/register" className="btn-secondary flex items-center justify-center">
                                Start Campaign
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50 text-center hover:shadow-xl transition-all duration-300"
                            >
                                <div className={`w-14 h-14 rounded-2xl ${stat.color} flex items-center justify-center mx-auto mb-4`}>
                                    <stat.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</h3>
                                <p className="text-slate-500 font-medium">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Campaigns */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-4xl font-bold text-slate-900 mb-4">Urgent Campaigns</h2>
                            <p className="text-slate-600">Support these causes that need your immediate attention.</p>
                        </div>
                        <Link to="/campaigns" className="hidden sm:flex items-center text-indigo-600 font-semibold hover:translate-x-2 transition-transform">
                            View All <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {loading ? (
                            [1, 2, 3].map(n => (
                                <div key={n} className="h-[450px] bg-white rounded-3xl animate-pulse" />
                            ))
                        ) : campaigns.length > 0 ? (
                            campaigns.map((campaign) => (
                                <div key={campaign._id} className="bg-white rounded-3xl overflow-hidden card-hover border border-slate-100 flex flex-col h-full">
                                    <div className="relative h-56">
                                        <img src={campaign.images[0]} alt={campaign.title} className="w-full h-full object-cover" />
                                        <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-indigo-600 text-xs font-bold rounded-full">
                                            {campaign.category}
                                        </span>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-1">{campaign.title}</h3>
                                        <p className="text-slate-500 text-sm mb-6 line-clamp-2">{campaign.description}</p>
                                        
                                        <div className="mt-auto">
                                            <div className="flex justify-between text-sm mb-2">
                                                <span className="font-semibold text-slate-700">${campaign.raisedAmount.toLocaleString()} raised</span>
                                                <span className="text-slate-400">of ${campaign.goalAmount.toLocaleString()}</span>
                                            </div>
                                            <div className="w-full h-2 bg-slate-100 rounded-full mb-6 overflow-hidden">
                                                <div 
                                                    className="h-full bg-indigo-600 rounded-full" 
                                                    style={{ width: `${Math.min((campaign.raisedAmount / campaign.goalAmount) * 100, 100)}%` }} 
                                                />
                                            </div>
                                            <Link to={`/campaigns/${campaign._id}`} className="w-full btn-secondary text-center py-2 text-sm">
                                                Help Now
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center">
                                <p className="text-slate-500 italic">No campaigns found. Start one today!</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Trust KindHeart?</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">We ensure transparency, security, and maximum impact for every penny you donate.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { title: '100% Transparency', desc: 'Track every dollar from your wallet to the person in need.', icon: ShieldCheck },
                            { title: 'Secure Payments', desc: 'Industry-standard encryption and verified payment gateways.', icon: Zap },
                            { title: 'Tax Benefits', desc: 'Receive official donation receipts for tax deductions.', icon: Heart },
                        ].map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center">
                                <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center mb-6">
                                    <item.icon className="w-10 h-10 text-indigo-600" />
                                </div>
                                <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                                <p className="text-slate-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <h2 className="text-4xl font-bold text-center mb-16">Voices of Kindness</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: 'Sarah Johnson', role: 'Donor', text: 'KindHeart made it so easy for me to support local education. The transparency is unmatched.' },
                            { name: 'David Chen', role: 'NGO Partner', text: 'The platform helped us reach thousands of donors during the disaster relief campaign.' },
                            { name: 'Maria Rodriguez', role: 'Volunteer', text: 'I love being part of this community. Every small donation really does count.' },
                        ].map((t, idx) => (
                            <div key={idx} className="p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10">
                                <div className="flex text-amber-400 mb-4">
                                    {[1, 2, 3, 4, 5].map(s => <Heart key={s} className="w-4 h-4 fill-current mr-1" />)}
                                </div>
                                <p className="text-lg italic mb-6">"{t.text}"</p>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 rounded-full bg-slate-700 mr-4" />
                                    <div>
                                        <h5 className="font-bold">{t.name}</h5>
                                        <p className="text-slate-400 text-sm">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
