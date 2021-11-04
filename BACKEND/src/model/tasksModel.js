const { ObjectId } = require('mongodb');

const mongoConnection = require('./connection');

const create = ({ status, content, date }) => mongoConnection.getConnection()
  .then((db) => db.collection('tasks').insertOne({ status, content, date }))
  .then(({ insertedId: _id }) => ({ _id, status, content, date }));

const getAll = () => mongoConnection.getConnection()
  .then((db) => db.collection('tasks').find().toArray());

const getTaskById = (id) => mongoConnection.getConnection()
.then((db) => db.collection('tasks').findOne({ _id: ObjectId(id) }));

const deleteTask = (id) => mongoConnection.getConnection()
.then((db) => db.collection('tasks').deleteOne(
  { _id: ObjectId(id) },
));

const update = ({ id, status, content, date }) => mongoConnection.getConnection()
  .then((db) => db.collection('tasks').updateOne(
    { _id: ObjectId(id) },
    { $set: { status, content, date } },
  ));

module.exports = {
  create,
  getAll,
  getTaskById,
  deleteTask,
  update,
};
