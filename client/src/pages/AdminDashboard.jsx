import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { 
    Users, 
    Target, 
    DollarSign, 
    CheckCircle, 
    AlertCircle, 
    BarChart3,
    MoreVertical,
    Eye
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const [statsRes, usersRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/admin/stats', config),
                    axios.get('http://localhost:5000/api/admin/users', config)
                ]);
                setStats(statsRes.data.stats);
                setUsers(usersRes.data.users);
            } catch (error) {
                toast.error('Failed to fetch admin data');
            } finally {
                setLoading(false);
            }
        };
        fetchAdminData();
    }, [user]);

    if (loading) return <div className="pt-32 text-center text-slate-500 font-bold">Initializing Admin Panel...</div>;

    return (
        <div className="pt-24 min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900">Admin Command Center</h1>
                        <p className="text-slate-500">Monitor platform health and manage operations.</p>
                    </div>
                    <div className="flex space-x-3">
                        <button className="btn-secondary py-2 px-4 text-sm font-bold flex items-center">
                            <BarChart3 className="w-4 h-4 mr-2" /> Download Report
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
                        { label: 'Total Campaigns', value: stats.totalCampaigns, icon: Target, color: 'text-indigo-600', bg: 'bg-indigo-100' },
                        { label: 'Funds Raised', value: `$${stats.totalRaised.toLocaleString()}`, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-100' },
                        { label: 'Active Campaigns', value: stats.activeCampaigns, icon: CheckCircle, color: 'text-amber-600', bg: 'bg-amber-100' },
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                            <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <h4 className="text-slate-500 text-sm font-medium mb-1">{stat.label}</h4>
                            <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* User Management */}
                    <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-slate-900">Registered Users</h3>
                            <div className="relative">
                                <input type="text" placeholder="Search..." className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
                                    <tr>
                                        <th className="px-8 py-4">User</th>
                                        <th className="px-8 py-4">Role</th>
                                        <th className="px-8 py-4">Donated</th>
                                        <th className="px-8 py-4">Joined</th>
                                        <th className="px-8 py-4"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {users.map((u) => (
                                        <tr key={u._id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden">
                                                        <img src={u.avatar} alt="" className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-slate-900 text-sm">{u.name}</span>
                                                        <span className="text-xs text-slate-500">{u.email}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                                                    u.role === 'admin' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-600'
                                                }`}>
                                                    {u.role}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-sm font-bold text-slate-700">
                                                ${u.totalDonated.toLocaleString()}
                                            </td>
                                            <td className="px-8 py-5 text-xs text-slate-500 font-medium">
                                                {new Date(u.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                                                    <MoreVertical className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pending Reports / Recent Actions */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                                <AlertCircle className="w-5 h-5 mr-2 text-rose-500" /> Critical Reports
                            </h3>
                            <div className="space-y-4">
                                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100">
                                    <p className="text-sm font-bold text-rose-900 mb-1">Campaign Flagged</p>
                                    <p className="text-xs text-rose-700 leading-relaxed mb-3">"Medical aid for children" has been flagged for suspicious documentation.</p>
                                    <button className="text-xs font-black text-rose-900 flex items-center">
                                        <Eye className="w-3 h-3 mr-1" /> Review Now
                                    </button>
                                </div>
                                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100">
                                    <p className="text-sm font-bold text-amber-900 mb-1">Payout Pending</p>
                                    <p className="text-xs text-amber-700 leading-relaxed mb-3">Goal reached for "Animal Shelter Reconstruction". Awaiting fund transfer approval.</p>
                                    <button className="text-xs font-black text-amber-900 flex items-center">
                                        <CheckCircle className="w-3 h-3 mr-1" /> Approve Payout
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-indigo-600 p-8 rounded-3xl text-white shadow-xl shadow-indigo-200">
                            <h3 className="text-xl font-bold mb-4">Admin Tip</h3>
                            <p className="text-indigo-100 text-sm leading-relaxed">
                                Regularly verify large campaigns to maintain trust. Your moderation is the key to our platform's success.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
