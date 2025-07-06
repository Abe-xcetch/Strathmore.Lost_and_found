require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet'); // Add at top with other requires
const compression = require('compression'); // Add at top

// Initialize app
const app = express();

// 1. Database connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// 2. Basic Middleware (applied in all environments)
app.use(cors({
    origin: process.env.NODE_ENV === 'development'
        ? ['https://strathfind.onrender.com']
        : 'http://localhost:63342',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// 3. Production-Specific Middleware (add here)
if (process.env.NODE_ENV === 'development') {
    app.use(helmet()); // Security headers
    app.use(compression()); // Gzip compression

    // Serve frontend static files (if you have a React/Vue/etc. frontend)
    app.use(express.static(path.join(__dirname, 'client/build')));

    // Handle React routing (return all requests to index.html)
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

// 4. Route Imports
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/authMiddleware');

// 5. Routes
app.use('/api/auth', authRoutes);
app.use('/api', authMiddleware, apiRoutes);

// 6. Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// 7. Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));