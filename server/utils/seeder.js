const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Campaign = require('../models/Campaign');

dotenv.config({ path: '../.env' });

const campaigns = [
    {
        title: 'Emergency Medical Aid for Sarah',
        description: 'Sarah is a 5-year-old girl diagnosed with a rare heart condition. She needs immediate surgery and ongoing care. Your contribution can save her life.',
        category: 'Medical',
        goalAmount: 25000,
        raisedAmount: 12500,
        images: ['https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800'],
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        status: 'active'
    },
    {
        title: 'Building Dreams: New School for Village',
        description: 'Help us build a secondary school for children in the remote village of Hope. We aim to provide quality education and facilities to 200+ students.',
        category: 'Education',
        goalAmount: 50000,
        raisedAmount: 8400,
        images: ['https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800'],
        deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        status: 'active'
    },
    {
        title: 'Clean Water Project: Africa',
        description: 'Thousands of families lack access to clean drinking water. We are installing 50 solar-powered wells to provide sustainable water sources.',
        category: 'Disaster Relief',
        goalAmount: 35000,
        raisedAmount: 15000,
        images: ['https://images.unsplash.com/photo-1541252260730-0412e8e2108e?w=800'],
        deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
        status: 'active'
    },
    {
        title: 'Animal Shelter Reconstruction',
        description: 'Our shelter was damaged in recent floods. We need to rebuild the kennels and medical area for 100+ rescued dogs and cats.',
        category: 'Animal Rescue',
        goalAmount: 15000,
        raisedAmount: 3200,
        images: ['https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800'],
        deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
        status: 'active'
    }
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/donation_platform');
        
        // Clear existing data
        await User.deleteMany();
        await Campaign.deleteMany();

        // Create an Admin
        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@kindheart.org',
            password: 'password123',
            role: 'admin',
            avatar: 'https://i.pravatar.cc/150?u=admin'
        });

        // Create a Regular User
        const user = await User.create({
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
            role: 'user',
            avatar: 'https://i.pravatar.cc/150?u=john'
        });

        // Add Campaigns
        const campaignsWithCreator = campaigns.map(c => ({
            ...c,
            createdBy: admin._id
        }));

        await Campaign.insertMany(campaignsWithCreator);

        console.log('Data Seeded Successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
