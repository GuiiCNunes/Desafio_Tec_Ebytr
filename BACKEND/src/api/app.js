const express = require('express');
const { handleErrors } = require('../middlewares/handleErrors');
const routerTasks = require('../routers/tasksRouter');

const app = express();

app.use(express.json());

app.use('/tasks', routerTasks);

app.use(handleErrors);

module.exports = app;
