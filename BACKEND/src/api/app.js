const express = require('express');
const cors = require('cors');
const { handleErrors } = require('../middlewares/handleErrors');
const routerTasks = require('../routers/tasksRouter');

const app = express();
app.use(cors());

app.use(express.json());

app.use('/tasks', routerTasks);

app.use(handleErrors);

module.exports = app;
