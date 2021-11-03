const tasksModel = require('../model/tasksModel');

const create = async ({ status, content, date }) => {
  const response = await tasksModel.create({ status, content, date });
  return response;
};

module.exports = {
  create,
};
