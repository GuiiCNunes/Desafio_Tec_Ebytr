const tasksServices = require('../service/tasksService');

const create = async (req, res, next) => {
  const { status, content, date } = req.body;

  if (!status || !content || !date) return next({ code: 400, message: 'empty data' });

  const task = await tasksServices
    .create({ status, content, date });

  res.status(201).json(task);
};

const getAll = async (_req, res, _next) => {
  const tasks = await tasksServices
    .getAll();

  res.status(200).json(tasks);
};

module.exports = {
  create,
  getAll,
};
