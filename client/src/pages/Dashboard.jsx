import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { 
    LayoutDashboard, 
    Heart, 
    History, 
    Settings, 
    User, 
    PlusCircle, 
    TrendingUp,
    CreditCard
} from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const { user } = useAuth();
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const { data } = await axios.get('http://localhost:5000/api/donations/my', config);
                setDonations(data.donations);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, [user]);

    return (
        <div className="pt-24 min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
                            <div className="w-24 h-24 rounded-full bg-slate-200 mx-auto mb-4 overflow-hidden ring-4 ring-indigo-50">
                                <img src={user?.avatar} alt="" className="w-full h-full object-cover" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">{user?.name}</h3>
                            <p className="text-slate-500 text-sm mb-6">{user?.email}</p>
                            <button className="w-full btn-secondary py-2 text-sm">Edit Profile</button>
                        </div>

                        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                            <div className="p-4 space-y-2">
                                {[
                                    { name: 'Overview', icon: LayoutDashboard, active: true },
                                    { name: 'Donation History', icon: History },
                                    { name: 'My Campaigns', icon: Heart },
                                    { name: 'Security', icon: Settings },
                                ].map((item) => (
                                    <button
                                        key={item.name}
                                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all ${
                                            item.active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-600 hover:bg-slate-50'
                                        }`}
                                    >
                                        <item.icon className="w-5 h-5" />
                                        <span className="font-semibold">{item.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-indigo-50 rounded-2xl">
                                        <TrendingUp className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">+12%</span>
                                </div>
                                <h4 className="text-slate-500 text-sm font-medium mb-1">Total Donated</h4>
                                <p className="text-3xl font-black text-slate-900">${user?.totalDonated || 0}</p>
                            </div>

                            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-rose-50 rounded-2xl">
                                        <Heart className="w-6 h-6 text-rose-600" />
                                    </div>
                                </div>
                                <h4 className="text-slate-500 text-sm font-medium mb-1">Campaigns Helped</h4>
                                <p className="text-3xl font-black text-slate-900">{donations.length}</p>
                            </div>

                            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-amber-50 rounded-2xl">
                                        <CreditCard className="w-6 h-6 text-amber-600" />
                                    </div>
                                </div>
                                <h4 className="text-slate-500 text-sm font-medium mb-1">Impact Points</h4>
                                <p className="text-3xl font-black text-slate-900">{(user?.totalDonated || 0) * 10}</p>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center">
                                <h3 className="text-xl font-bold text-slate-900">Recent Donations</h3>
                                <button className="text-indigo-600 font-bold text-sm">View All</button>
                            </div>
                            <div className="p-0">
                                {loading ? (
                                    <div className="p-20 text-center text-slate-400">Loading activity...</div>
                                ) : donations.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                                                    <th className="px-8 py-4 font-bold">Campaign</th>
                                                    <th className="px-8 py-4 font-bold">Date</th>
                                                    <th className="px-8 py-4 font-bold">Amount</th>
                                                    <th className="px-8 py-4 font-bold">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100">
                                                {donations.map((donation) => (
                                                    <tr key={donation._id} className="hover:bg-slate-50 transition-colors">
                                                        <td className="px-8 py-5">
                                                            <div className="flex items-center space-x-3">
                                                                <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden">
                                                                    <img src={donation.campaign?.images[0]} alt="" className="w-full h-full object-cover" />
                                                                </div>
                                                                <span className="font-bold text-slate-900">{donation.campaign?.title}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-5 text-slate-500 text-sm">
                                                            {new Date(donation.createdAt).toLocaleDateString()}
                                                        </td>
                                                        <td className="px-8 py-5 font-black text-slate-900">
                                                            ${donation.amount}
                                                        </td>
                                                        <td className="px-8 py-5">
                                                            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold uppercase">
                                                                Completed
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="p-20 text-center">
                                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Heart className="w-10 h-10 text-slate-200" />
                                        </div>
                                        <p className="text-slate-500">You haven't made any donations yet.</p>
                                        <button onClick={() => navigate('/campaigns')} className="mt-4 text-indigo-600 font-bold hover:underline">Start making an impact</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
