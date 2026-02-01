const asyncHandler = require('express-async-handler');
const Drive = require('../model/drive.model');
const Application = require('../model/application.model');

// @desc    Create a new drive
// @route   POST /api/drives
// @access  Private (Company)
const createDrive = asyncHandler(async (req, res) => {
    const { title, description, batchYear, cgpaCutoff, skills, salary, deadline, testDate } = req.body;

    if (!title || !description || !batchYear || !cgpaCutoff || !salary || !deadline) {
        res.status(400);
        throw new Error('Please fill all required fields');
    }

    const drive = await Drive.create({
        companyId: req.user._id,
        companyName: req.user.name,
        title,
        description,
        batchYear,
        cgpaCutoff,
        skills: skills ? skills.split(',').map(s => s.trim()) : [],
        salary,
        deadline,
        testDate
    });

    res.status(201).json(drive);
});

// @desc    Get all active drives (for students)
// @route   GET /api/drives
// @access  Private (Student)
const getDrives = asyncHandler(async (req, res) => {
    // Filter by active status and deadline > now
    const drives = await Drive.find({ 
        status: 'active',
        deadline: { $gte: new Date() } 
    }).sort({ createdAt: -1 });

    res.json(drives);
});

// @desc    Get drives for logged in company
// @route   GET /api/drives/company
// @access  Private (Company)
const getCompanyDrives = asyncHandler(async (req, res) => {
    const drives = await Drive.find({ companyId: req.user._id }).sort({ createdAt: -1 });
    
    // Enrich with applicant count
    const enrichedDrives = await Promise.all(drives.map(async (drive) => {
        const applicantCount = await Application.countDocuments({ driveId: drive._id });
        return { ...drive.toObject(), applicantCount };
    }));

    res.json(enrichedDrives);
});

module.exports = { createDrive, getDrives, getCompanyDrives };
