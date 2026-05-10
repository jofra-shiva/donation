# KindHeart - Modern MERN Donation Platform

KindHeart is a professional crowdfunding platform designed for NGOs and charities. It features a clean, responsive UI with secure authentication and campaign management.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS, Framer Motion, Axios, Lucide React
- **Backend**: Node.js, Express.js, JWT, Bcrypt
- **Database**: MongoDB
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Key Features
- 🔐 **Secure Auth**: JWT-based authentication with password hashing.
- 📊 **Dashboards**: Dedicated panels for Users (impact tracking) and Admins (analytics).
- 🏥 **Campaigns**: Browse, filter, and search through various causes.
- 💰 **Donations**: Real-time progress updates and transaction history.
- 📱 **Responsive**: Fully optimized for mobile, tablet, and desktop.
- ✨ **Modern UI**: Glassmorphism, smooth transitions, and premium typography.

## Getting Started

### 1. Prerequisites
- Node.js (v14+)
- MongoDB (Running locally or Atlas)

### 2. Setup Server
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory (template provided).

### 3. Seed Data (Optional)
To populate the database with sample campaigns and users:
```bash
cd server
npm run seed
```

### 4. Setup Client
```bash
cd client
npm install
```

### 5. Run the Application
Start the Backend:
```bash
cd server
npm run dev
```

Start the Frontend:
```bash
cd client
npm run dev
```

## Admin Credentials (if seeded)
- **Email**: `admin@kindheart.org`
- **Password**: `password123`

## User Credentials (if seeded)
- **Email**: `john@example.com`
- **Password**: `password123`

---
Built with ❤️ for a better world.
