import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Heart, Share2, Clock, Users, ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const CampaignDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [campaign, setCampaign] = useState(null);
    const [loading, setLoading] = useState(true);
    const [amount, setAmount] = useState('');
    const [donating, setDonating] = useState(false);

    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/campaigns/${id}`);
                setCampaign(data.campaign);
            } catch (error) {
                toast.error('Campaign not found');
                navigate('/campaigns');
            } finally {
                setLoading(false);
            }
        };
        fetchCampaign();
    }, [id, navigate]);

    const handleDonate = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error('Please login to donate');
            return navigate('/login');
        }
        if (!amount || amount <= 0) return toast.error('Please enter a valid amount');

        setDonating(true);
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` }
            };
            await axios.post('http://localhost:5000/api/donations', {
                campaignId: id,
                amount: Number(amount),
                paymentMethod: 'Card'
            }, config);
            
            toast.success('Thank you for your donation!');
            setAmount('');
            // Refresh campaign data
            const { data } = await axios.get(`http://localhost:5000/api/campaigns/${id}`);
            setCampaign(data.campaign);
        } catch (error) {
            toast.error('Donation failed');
        } finally {
            setDonating(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
        </div>
    );

    const progress = (campaign.raisedAmount / campaign.goalAmount) * 100;

    return (
        <div className="pt-32 pb-20 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <button onClick={() => navigate(-1)} className="flex items-center text-slate-500 hover:text-indigo-600 mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" /> Back
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Details */}
                    <div className="lg:col-span-2">
                        <div className="rounded-3xl overflow-hidden mb-10 bg-slate-100 aspect-video">
                            <img src={campaign.images[0]} alt={campaign.title} className="w-full h-full object-cover" />
                        </div>

                        <div className="flex items-center space-x-4 mb-6">
                            <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-sm font-bold">
                                {campaign.category}
                            </span>
                            <div className="flex items-center text-slate-500 text-sm">
                                <Clock className="w-4 h-4 mr-1" />
                                <span>Ends on {new Date(campaign.deadline).toLocaleDateString()}</span>
                            </div>
                        </div>

                        <h1 className="text-4xl font-black text-slate-900 mb-6">{campaign.title}</h1>
                        
                        <div className="flex items-center space-x-4 p-6 rounded-2xl bg-slate-50 mb-10 border border-slate-100">
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200">
                                <img src={campaign.createdBy?.avatar} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 font-medium">Campaign Organizer</p>
                                <p className="text-slate-900 font-bold">{campaign.createdBy?.name}</p>
                            </div>
                        </div>

                        <div className="prose prose-slate max-w-none">
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">About this campaign</h3>
                            <p className="text-slate-600 leading-loose whitespace-pre-line">
                                {campaign.description}
                            </p>
                        </div>

                        {/* Recent Donors */}
                        <div className="mt-16">
                            <h3 className="text-2xl font-bold text-slate-900 mb-8">Recent Donors ({campaign.donorCount})</h3>
                            <div className="space-y-6">
                                {campaign.donors?.slice(0, 5).map((d, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                                                <Users className="w-5 h-5 text-slate-400" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">{d.user?.name || 'Anonymous'}</p>
                                                <p className="text-xs text-slate-500">{new Date(d.date).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <p className="font-black text-indigo-600">${d.amount}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Donation Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 p-8 rounded-3xl bg-white border border-slate-200 shadow-2xl shadow-slate-200/50">
                            <div className="mb-8">
                                <div className="flex justify-between items-end mb-4">
                                    <h4 className="text-3xl font-black text-slate-900">${campaign.raisedAmount.toLocaleString()}</h4>
                                    <span className="text-slate-400 text-sm font-medium mb-1">of ${campaign.goalAmount.toLocaleString()}</span>
                                </div>
                                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-indigo-600 rounded-full transition-all duration-1000" 
                                        style={{ width: `${Math.min(progress, 100)}%` }} 
                                    />
                                </div>
                                <div className="flex justify-between mt-4">
                                    <div className="flex items-center text-slate-500 font-medium">
                                        <Users className="w-4 h-4 mr-2" />
                                        <span>{campaign.donorCount} donors</span>
                                    </div>
                                    <div className="text-slate-500 font-medium">{Math.round(progress)}% reached</div>
                                </div>
                            </div>

                            <form onSubmit={handleDonate} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-3 text-center">Enter Donation Amount</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-black text-slate-400">$</span>
                                        <input
                                            type="number"
                                            className="w-full pl-10 pr-4 py-4 text-2xl font-black bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-indigo-600 transition-all text-center"
                                            placeholder="0.00"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-3">
                                    {[10, 50, 100].map(val => (
                                        <button
                                            key={val}
                                            type="button"
                                            onClick={() => setAmount(val.toString())}
                                            className="py-3 border-2 border-slate-100 rounded-xl font-bold text-slate-600 hover:border-indigo-600 hover:text-indigo-600 transition-all"
                                        >
                                            ${val}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    type="submit"
                                    disabled={donating}
                                    className="w-full btn-primary py-5 text-lg flex items-center justify-center"
                                >
                                    {donating ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                                        <>
                                            <Heart className="w-5 h-5 mr-2 fill-current" /> Donate Now
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="mt-8 pt-8 border-t border-slate-100 space-y-4">
                                <div className="flex items-center text-xs text-slate-500">
                                    <ShieldCheck className="w-4 h-4 text-emerald-500 mr-2" />
                                    <span>Secure & encrypted payment</span>
                                </div>
                                <button className="w-full flex items-center justify-center space-x-2 py-3 text-slate-500 font-bold hover:text-indigo-600 transition-colors">
                                    <Share2 className="w-5 h-5" />
                                    <span>Share this cause</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampaignDetails;
