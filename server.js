const express = require('express');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
const connectDB = require('./config/db');
require('dotenv').config();
const cors = require('cors');
// Allow all origins

const app = express();
app.use(cors()); 
// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Serve static files from 'uploads' directory
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/api/uploads', express.static(uploadsDir));

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

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// Handle favicon.ico requests
app.get('/favicon.ico', (req, res) => res.status(204));

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
