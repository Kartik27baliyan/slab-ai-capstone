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

// Import course routes
const courseRoutes = require('./controllers/coursesController');

// Course Management Routes
app.post('/api/courses', courseRoutes.createCourse);
app.get('/api/courses', courseRoutes.getCourses);
app.get('/api/courses/:id', courseRoutes.getCourse);
app.put('/api/courses/:id', courseRoutes.updateCourse);
app.get('/api/courses/analytics', courseRoutes.getCourseAnalytics);

// Import enrollment routes
const enrollmentRoutes = require('./controllers/enrollmentsController');

// Enrollment Management Routes
app.post('/api/enrollments', enrollmentRoutes.createEnrollment);
app.get('/api/enrollments/student/:studentId', enrollmentRoutes.getStudentEnrollments);
app.put('/api/enrollments/:enrollmentId/progress', enrollmentRoutes.updateProgress);
app.get('/api/enrollments/analytics', enrollmentRoutes.getEnrollmentAnalytics);
