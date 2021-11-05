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

const deleteTask = async (req, res, next) => {
  const { id } = req.body;
  if (await tasksServices.deleteTask(id)) return res.status(200).end();

  next({ code: 404, message: 'not found' });
};

const update = async (req, res, next) => {
  const { _id: id, status, content, date } = req.body;
  if (await tasksServices.update({ id, status, content, date })) return res.status(200).end();

  next({ code: 404, message: 'not found' });
};

module.exports = {
  create,
  getAll,
  deleteTask,
  update,
};
