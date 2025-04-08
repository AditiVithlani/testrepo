const express = require('express');
const CompanyController = require('../controllers/company.controller'); // Path to the controller

const router = express.Router();

// Route for adding a company


router.post('/company/register', CompanyController.addCompany);
router.post('/company/login', CompanyController.login);

module.exports = router;
