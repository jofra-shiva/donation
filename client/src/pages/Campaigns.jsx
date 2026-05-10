import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Search, Filter, ArrowRight, Heart } from 'lucide-react';

const categories = ['All', 'Medical', 'Education', 'Disaster Relief', 'Food Support', 'Animal Rescue'];

const Campaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState('');
    
    const activeCategory = searchParams.get('category') || 'All';

    useEffect(() => {
        const fetchCampaigns = async () => {
            setLoading(true);
            try {
                let url = 'http://localhost:5000/api/campaigns';
                const category = searchParams.get('category');
                if (category && category !== 'All') {
                    url += `?category=${category}`;
                }
                const { data } = await axios.get(url);
                setCampaigns(data.campaigns);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCampaigns();
    }, [searchParams]);

    const handleSearch = (e) => {
        e.preventDefault();
        // Implement frontend filtering or API search
        const filtered = campaigns.filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()));
        setCampaigns(filtered);
    };

    return (
        <div className="pt-32 pb-20 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-black text-slate-900 mb-4">Explore Campaigns</h1>
                    <p className="text-slate-600">Find and support causes that resonate with you.</p>
                </div>

                {/* Filters */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
                    <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSearchParams(cat === 'All' ? {} : { category: cat })}
                                className={`px-6 py-2 rounded-full font-medium transition-all ${
                                    activeCategory === cat 
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSearch} className="relative w-full lg:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search campaigns..."
                            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </form>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        [1, 2, 3, 4, 5, 6].map(n => (
                            <div key={n} className="h-[450px] bg-white rounded-3xl animate-pulse" />
                        ))
                    ) : campaigns.length > 0 ? (
                        campaigns.map((campaign) => (
                            <div key={campaign._id} className="bg-white rounded-3xl overflow-hidden card-hover border border-slate-100 flex flex-col h-full">
                                <div className="relative h-56">
                                    <img src={campaign.images[0]} alt={campaign.title} className="w-full h-full object-cover" />
                                    <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-indigo-600 text-xs font-bold rounded-full shadow-sm">
                                        {campaign.category}
                                    </span>
                                    <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm text-rose-500 rounded-full shadow-sm hover:bg-rose-500 hover:text-white transition-colors">
                                        <Heart className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center space-x-2 mb-3">
                                        <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden">
                                            <img src={campaign.createdBy?.avatar} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <span className="text-xs font-medium text-slate-500">by {campaign.createdBy?.name}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-1">{campaign.title}</h3>
                                    <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">{campaign.description}</p>
                                    
                                    <div className="mt-auto">
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="font-bold text-indigo-600">${campaign.raisedAmount.toLocaleString()}</span>
                                            <span className="text-slate-400">raised of ${campaign.goalAmount.toLocaleString()}</span>
                                        </div>
                                        <div className="w-full h-2 bg-slate-100 rounded-full mb-6 overflow-hidden">
                                            <div 
                                                className="h-full bg-indigo-600 rounded-full transition-all duration-1000" 
                                                style={{ width: `${Math.min((campaign.raisedAmount / campaign.goalAmount) * 100, 100)}%` }} 
                                            />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="text-xs text-slate-500 font-medium">
                                                <span className="text-slate-900 font-bold">{campaign.donorCount}</span> Donors
                                            </div>
                                            <Link to={`/campaigns/${campaign._id}`} className="text-indigo-600 font-bold text-sm flex items-center hover:translate-x-1 transition-transform">
                                                View Details <ArrowRight className="w-4 h-4 ml-1" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-32 text-center bg-white rounded-3xl border border-dashed border-slate-300">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-10 h-10 text-slate-300" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">No campaigns found</h3>
                            <p className="text-slate-500">Try adjusting your filters or search terms.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Campaigns;
