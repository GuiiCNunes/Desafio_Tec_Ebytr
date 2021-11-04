const tasksModel = require('../model/tasksModel');

const create = async ({ status, content, date }) => {
  if (!status || !['pending', 'progress', 'ready'].includes(status)) return null;
  const response = await tasksModel.create({ status, content, date });
  return response;
};

const getAll = async () => {
  const response = await tasksModel.getAll();
  return response;
};

const getTaskById = async (id) => {
  const response = await tasksModel.getTaskById(id);
  return response;
};

module.exports = {
  create,
  getAll,
  getTaskById,
};
