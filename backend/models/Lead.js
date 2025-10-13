const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  courseInterest: {
    type: String,
    required: [true, 'Course interest is required'],
    enum: ['web-development', 'data-science', 'ai-ml', 'cybersecurity', 'other']
  },
  source: {
    type: String,
    required: true,
    enum: ['google-ads', 'facebook', 'instagram', 'referral', 'organic', 'other']
  },
  campaign: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'qualified', 'enrolled', 'rejected'],
    default: 'new'
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Index for better query performance
leadSchema.index({ email: 1, createdAt: -1 });
leadSchema.index({ status: 1 });
leadSchema.index({ courseInterest: 1 });

module.exports = mongoose.model('Lead', leadSchema);
