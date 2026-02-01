const express = require('express');
const router = express.Router();
const { createDrive, getDrives, getCompanyDrives, getDriveTest } = require('../controllers/drive.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/', protect, createDrive);
router.get('/', protect, getDrives);
router.get('/company', protect, getCompanyDrives);
router.get('/:id/test', protect, getDriveTest); // New route

module.exports = router;
