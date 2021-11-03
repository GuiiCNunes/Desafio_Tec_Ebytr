const mongoConnection = require('./connection');

const create = ({ status, content, date }) => mongoConnection.getConnection()
  .then((db) => db.collection('tasks').insertOne({ status, content, date }))
  .then(({ insertedId: _id }) => ({ _id, status, content, date }));

module.exports = {
  create,
};
