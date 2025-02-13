const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();
const fs = require('fs');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Ensure `uploads` directory exists
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Connect to MongoDB
connectDB();

// Import Routes
const slider1Routes = require('./routes/slider1Routes');
const slider2Routes = require('./routes/slider2Routes');
const slider3Routes = require('./routes/slider3Routes');

// Use Routes
app.use('/api/slider1', slider1Routes);
app.use('/api/slider2', slider2Routes);
app.use('/api/slider3', slider3Routes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
