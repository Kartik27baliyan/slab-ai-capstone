const Course = require('../models/Course');

// Create a new course (Admin only)
exports.createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    
    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: course
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create course',
      error: error.message
    });
  }
};

// Get all published courses (for students)
exports.getCourses = async (req, res) => {
  try {
    const { category, level, page = 1, limit = 10, search } = req.query;
    
    let filter = { status: 'published' };
    if (category) filter.category = category;
    if (level) filter.level = level;
    
    if (search) {
      filter.$text = { $search: search };
    }
    
    const courses = await Course.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-modules.content'); // Don't send full content in listing
    
    const total = await Course.countDocuments(filter);
    
    res.json({
      success: true,
      data: courses,
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
      message: 'Failed to fetch courses',
      error: error.message
    });
  }
};

// Get single course details
exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch course',
      error: error.message
    });
  }
};

// Update course (Admin only)
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Course updated successfully',
      data: course
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update course',
      error: error.message
    });
  }
};

// Get course analytics (Admin)
exports.getCourseAnalytics = async (req, res) => {
  try {
    const analytics = await Course.aggregate([
      {
        $group: {
          _id: '$category',
          totalCourses: { $sum: 1 },
          totalEnrollments: { $sum: '$enrollmentCount' },
          avgRating: { $avg: '$rating.average' }
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
