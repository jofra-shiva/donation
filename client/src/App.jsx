import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Campaigns from './pages/Campaigns';
import CampaignDetails from './pages/CampaignDetails';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import { useAuth, AuthProvider } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return null;
    return user ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return null;
    return user && user.role === 'admin' ? children : <Navigate to="/" />;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="flex flex-col min-h-screen">
                    <Toaster position="top-center" />
                    <Navbar />
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/campaigns" element={<Campaigns />} />
                            <Route path="/campaigns/:id" element={<CampaignDetails />} />
                            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                            <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
