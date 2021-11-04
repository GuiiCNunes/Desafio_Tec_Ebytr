const express = require('express');
const routerTasks = require('../routers/tasksRouter');

const app = express();

app.use(express.json());

app.use('/tasks', routerTasks);

module.exports = app;
