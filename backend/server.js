const express = require('express');
const mongoose = require('mongoose');

// Connect to MongoDB (local Minikube)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://slab-ai-slab-ai-chart-mongodb:27017/slabdb';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies

// Import routes
const leadRoutes = require('./controllers/leadsController');

// Routes
app.get('/', (req, res) => res.send('🚀 Slab.ai Backend Running'));

// Lead Management Routes
app.post('/api/leads', leadRoutes.createLead);
app.get('/api/leads', leadRoutes.getLeads);
app.put('/api/leads/:id/status', leadRoutes.updateLeadStatus);
app.get('/api/leads/analytics', leadRoutes.getLeadAnalytics);

// Health checks
app.get('/api/healthcheck', (req, res) => {
  res.json({
    status: 'healthy',
    mongo: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date()
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date() });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🌐 Server running on http://localhost:${PORT}`));
