const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // We'll create User model next
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  leadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lead',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'dropped', 'suspended'],
    default: 'active'
  },
  progress: {
    completedModules: [{
      moduleId: mongoose.Schema.Types.ObjectId,
      completedAt: Date,
      score: Number // for quizzes
    }],
    overallProgress: {
      type: Number, // percentage
      default: 0
    },
    lastAccessed: Date,
    totalTimeSpent: Number // in minutes
  },
  payment: {
    amount: Number,
    currency: {
      type: String,
      default: 'USD'
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending'
    },
    transactionId: String,
    paidAt: Date
  },
  enrolledAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Ensure one enrollment per student per course
enrollmentSchema.index({ studentId: 1, courseId: 1 }, { unique: true });

// For progress tracking queries
enrollmentSchema.index({ courseId: 1, status: 1 });
enrollmentSchema.index({ 'progress.overallProgress': 1 });

module.exports = mongoose.model('Enrollment', enrollmentSchema);
