require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const contactRoutes = require('./routes/contact');
const projectRoutes = require('./routes/projects');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000' }));
app.use(express.json());

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Soyal Portfolio API running' });
});

// MongoDB connection
const connectDB = async () => {
  try {
    if (process.env.MONGO_URI) {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('MongoDB connected');
    } else {
      console.log('No MONGO_URI set — running without DB (contact form will log only)');
    }
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
  }
};

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
