const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const Lead = require('../models/Lead');

// Enroll a student in a course
exports.createEnrollment = async (req, res) => {
  try {
    const { leadId, courseId, paymentInfo } = req.body;
    
    // Verify lead exists and get student info
    const lead = await Lead.findById(leadId);
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
    }
    
    // Verify course exists and is published
    const course = await Course.findById(courseId);
    if (!course || course.status !== 'published') {
      return res.status(404).json({
        success: false,
        message: 'Course not available for enrollment'
      });
    }
    
    // For now, use lead email as student identifier
    // In production, we'd create a proper User record
    const studentId = leadId; // Temporary - will replace with actual User ID
    
    const enrollment = new Enrollment({
      studentId,
      courseId,
      leadId,
      payment: {
        amount: course.price,
        status: 'paid', // Temporary - integrate payment gateway later
        paidAt: new Date()
      }
    });
    
    await enrollment.save();
    
    // Update lead status to enrolled
    lead.status = 'enrolled';
    await lead.save();
    
    // Increment course enrollment count
    course.enrollmentCount += 1;
    await course.save();
    
    res.status(201).json({
      success: true,
      message: 'Successfully enrolled in course',
      data: enrollment
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Already enrolled in this course'
      });
    }
    res.status(400).json({
      success: false,
      message: 'Failed to enroll in course',
      error: error.message
    });
  }
};

// Get student enrollments
exports.getStudentEnrollments = async (req, res) => {
  try {
    const { studentId } = req.params;
    
    const enrollments = await Enrollment.find({ studentId })
      .populate('courseId', 'title description instructor imageUrl duration')
      .sort({ enrolledAt: -1 });
    
    res.json({
      success: true,
      data: enrollments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch enrollments',
      error: error.message
    });
  }
};

// Update course progress
exports.updateProgress = async (req, res) => {
  try {
    const { enrollmentId } = req.params;
    const { moduleId, score } = req.body;
    
    const enrollment = await Enrollment.findById(enrollmentId);
    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }
    
    // Check if module already completed
    const alreadyCompleted = enrollment.progress.completedModules.find(
      mod => mod.moduleId.toString() === moduleId
    );
    
    if (!alreadyCompleted) {
      enrollment.progress.completedModules.push({
        moduleId,
        completedAt: new Date(),
        score: score || null
      });
      
      // Calculate overall progress
      const course = await Course.findById(enrollment.courseId);
      const totalModules = course.modules.length;
      const completedCount = enrollment.progress.completedModules.length;
      enrollment.progress.overallProgress = Math.round((completedCount / totalModules) * 100);
      
      enrollment.progress.lastAccessed = new Date();
      await enrollment.save();
    }
    
    res.json({
      success: true,
      message: 'Progress updated successfully',
      data: enrollment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update progress',
      error: error.message
    });
  }
};

// Get enrollment analytics
exports.getEnrollmentAnalytics = async (req, res) => {
  try {
    const analytics = await Enrollment.aggregate([
      {
        $lookup: {
          from: 'courses',
          localField: 'courseId',
          foreignField: '_id',
          as: 'course'
        }
      },
      {
        $group: {
          _id: '$courseId',
          courseTitle: { $first: '$course.title' },
          totalEnrollments: { $sum: 1 },
          activeEnrollments: {
            $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] }
          },
          avgProgress: { $avg: '$progress.overallProgress' },
          completionRate: {
            $avg: { $cond: [{ $eq: ['$progress.overallProgress', 100] }, 1, 0] }
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
      message: 'Failed to fetch enrollment analytics',
      error: error.message
    });
  }
};
