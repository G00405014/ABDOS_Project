const express = require('express');
const ReportController = require('../controllers/reportController');
const router = express.Router();
const reportController = new ReportController();

router.post('/generate', reportController.generateAndSendReport.bind(reportController));

module.exports = router; 