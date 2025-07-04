const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/items');
const upload = require('../controllers/uploads');

// @route   POST api/items
// @desc    Submit lost/found item
router.post('/items', upload.single('image'), itemsController.submitItem);

// @route   GET api/items
// @desc    Get all items
router.get('/items', itemsController.getItems);

module.exports = router;