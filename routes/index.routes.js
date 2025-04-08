const express = require('express');
const router = express.Router();
const indexController = require('../controllers/test');
const authorization = require('../middlewares/authorization');

router.get('/:id', authorization, indexController.getUserById);
router.get('/', authorization, indexController.home);

module.exports = router;