const tasksModel = require('../model/tasksModel');

const create = async ({ status, content, date }) => {
  if (!status || !['pending', 'progress', 'ready'].includes(status)) return null;
  const response = await tasksModel.create({ status, content, date });
  return response;
};

module.exports = {
  create,
};
