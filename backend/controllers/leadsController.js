const Lead = require('../models/Lead');

// Create a new lead (from landing pages/campaigns)
exports.createLead = async (req, res) => {
  try {
    const lead = new Lead(req.body);
    await lead.save();
    
    res.status(201).json({
      success: true,
      message: 'Lead captured successfully',
      data: lead
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to capture lead',
      error: error.message
    });
  }
};

// Get all leads (for admin dashboard)
exports.getLeads = async (req, res) => {
  try {
    const { status, course, page = 1, limit = 10 } = req.query;
    
    let filter = {};
    if (status) filter.status = status;
    if (course) filter.courseInterest = course;
    
    const leads = await Lead.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Lead.countDocuments(filter);
    
    res.json({
      success: true,
      data: leads,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch leads',
      error: error.message
    });
  }
};

// Update lead status (for sales team)
exports.updateLeadStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    
    const lead = await Lead.findByIdAndUpdate(
      id,
      { status, notes },
      { new: true, runValidators: true }
    );
    
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Lead status updated',
      data: lead
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update lead',
      error: error.message
    });
  }
};

// Get lead analytics (for campaign tracking)
exports.getLeadAnalytics = async (req, res) => {
  try {
    const analytics = await Lead.aggregate([
      {
        $group: {
          _id: '$source',
          count: { $sum: 1 },
          enrolled: {
            $sum: { $cond: [{ $eq: ['$status', 'enrolled'] }, 1, 0] }
          }
        }
      },
      {
        $project: {
          source: '$_id',
          count: 1,
          enrolled: 1,
          conversionRate: {
            $multiply: [
              { $divide: ['$enrolled', '$count'] },
              100
            ]
          }
        }
      }
    ]);
    
    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch analytics',
      error: error.message
    });
  }
};
