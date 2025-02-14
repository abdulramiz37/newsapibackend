const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan'); // For logging HTTP requests
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// CORS Configuration
const allowedOrigins = [
  'https://zesty-biscuit-6e615b.netlify.app',
  'http://localhost:3000',
  process.env.FRONTEND_URL, // Allow requests from your frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      console.log('Origin:', origin); // Log the origin for debugging
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // Allow cookies and credentials
  })
);

// Middleware
app.use(express.json());
app.use(morgan('dev')); // Log HTTP requests in development mode

// Serve static files from the 'uploads' directory
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true }); // Create directory recursively if it doesn't exist
}

app.use('/api/uploads', (req, res, next) => {
  console.log('Request for static file:', req.url); // Log the requested file
  next();
}, express.static(uploadsDir));

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

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is healthy' });
});

// 404 Handler for Undefined Routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));