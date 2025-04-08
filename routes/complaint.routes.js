const express = require('express');
const ComplaintController = require('../controllers/complaint.controller'); // Path to the controller

const router = express.Router();

// Route for adding a company


router.post('/complaint/raiseComplaint', ComplaintController.raiseComplaint);
router.post('/complaint/GetComplaintList', ComplaintController.getAllComplaints);
router.post('/complaint/closeComplaint', ComplaintController.closeComplaint);

module.exports = router;
