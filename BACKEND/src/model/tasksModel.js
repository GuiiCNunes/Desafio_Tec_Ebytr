const { ObjectId } = require('mongodb');

const mongoConnection = require('./connection');

const create = ({ status, content, date }) => mongoConnection.getConnection()
  .then((db) => db.collection('tasks').insertOne({ status, content, date }))
  .then(({ insertedId: _id }) => ({ _id, status, content, date }));

const getAll = () => mongoConnection.getConnection()
  .then((db) => db.collection('tasks').find().toArray());

const getTaskById = (id) => mongoConnection.getConnection()
.then((db) => db.collection('tasks').findOne({ _id: ObjectId(id) }));

module.exports = {
  create,
  getAll,
  getTaskById,
};
