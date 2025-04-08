const express = require('express');
const CommonController = require('../controllers/common.controller'); // Path to the controller

const router = express.Router();

// Route for adding a company


router.post('/common/categoryList', CommonController.getCategories);
router.post('/common/subcategoryList', CommonController.getSubcategories);
router.post('/common/documentType', CommonController.getDocumentTypes);

module.exports = router;
