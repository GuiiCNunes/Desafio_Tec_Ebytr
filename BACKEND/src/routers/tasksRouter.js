const express = require('express');
const { create } = require('../controller/tasksController');

const router = express.Router();

router.post('/', create);

module.exports = router;
