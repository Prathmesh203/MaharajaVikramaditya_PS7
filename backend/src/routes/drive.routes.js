const express = require('express');
const router = express.Router();
const { createDrive, getDrives, getCompanyDrives } = require('../controllers/drive.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/', protect, createDrive);
router.get('/', protect, getDrives);
router.get('/company', protect, getCompanyDrives);

module.exports = router;
