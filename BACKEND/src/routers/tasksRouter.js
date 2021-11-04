const express = require('express');
const { create, getAll, deleteTask } = require('../controller/tasksController');

const router = express.Router();

router.post('/', create);
router.get('/', getAll);
router.delete('/', deleteTask);

module.exports = router;
