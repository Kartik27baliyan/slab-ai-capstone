const express = require('express');
const mongoose = require('mongoose');

// Connect to MongoDB (local Minikube)
const mongoURI = 'mongodb://admin:admin123@localhost:27017/slabai';
mongoose.connect(mongoURI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const app = express();
app.get('/', (req, res) => res.send('🚀 Slab.ai Backend Running'));

const PORT = 3000;
app.listen(PORT, () => console.log(`🌐 Server running on http://localhost:${PORT}`));

// Enhanced health check
app.get('/api/healthcheck', (req, res) => {
  res.json({
    status: 'healthy',
    mongo: process.env.MONGODB_URI ? 'connected' : 'disconnected',
    timestamp: new Date()
  });
});
