const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    driveId: { type: mongoose.Schema.Types.ObjectId, ref: 'Drive', required: true },
    status: { type: String, enum: ['applied', 'shortlisted', 'rejected', 'test_pending', 'hired'], default: 'applied' },
    appliedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Prevent duplicate applications
applicationSchema.index({ studentId: 1, driveId: 1 }, { unique: true });

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;
