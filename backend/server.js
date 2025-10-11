const express = require('express');
const mongoose = require('mongoose');

// Connect to MongoDB (local Minikube)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://slab-ai-slab-ai-chart-mongodb:27017/slabdb';
mongoose.connect(MONGODB_URI)
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
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date() });
});