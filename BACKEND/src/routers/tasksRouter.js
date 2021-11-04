const express = require('express');
const { create, getAll, deleteTask, update } = require('../controller/tasksController');

const router = express.Router();

router.post('/', create);
router.get('/', getAll);
router.delete('/', deleteTask);
router.put('/', update);

module.exports = router;
