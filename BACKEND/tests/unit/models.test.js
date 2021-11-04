const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient, ObjectId } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoConnection = require('../../src/model/connection');
const tasksModel = require('../../src/model/tasksModel');

const payloads = require('../payloadTasks');

describe('Model tests: ', () => {
  beforeEach(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();

    connectionMock = MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then((conn) => conn.db('Ebytr'));

    
    sinon.stub(mongoConnection, 'getConnection').resolves(connectionMock);
  });

  afterEach(() => {
    mongoConnection.getConnection.restore();
  });

  describe('Test if a task ', () => {
    it('inserted', async () => {
      const response = await tasksModel.create(payloads.taskToDb);
      expect(response).to.be.an('object');
    });
    it('has _id', async () => {
      const response = await tasksModel.create(payloads.taskToDb);
      expect(response).to.have.a.property('_id');
    });
    it('has content', async () => {
      const response = await tasksModel.create(payloads.taskToDb);
      expect(response).to.have.a.property('content');
    });
    it('has date', async () => {
      const response = await tasksModel.create(payloads.taskToDb);
      expect(response).to.have.a.property('date');
    });
    it('has status', async () => {
      const response = await tasksModel.create(payloads.taskToDb);
      expect(response).to.have.a.property('status');
    });
  });

  describe('Test get tasks ', () => {
    it('you get three tasks: ', async () => {
      await tasksModel.create(payloads.taskToDb);
      await tasksModel.create(payloads.taskToDb);
      await tasksModel.create(payloads.taskToDb);

      const response = await tasksModel.getAll();
    
      expect(response).to.be.an('array');
      expect(response.length).to.be.equal(3);
    });
    it('get task by id: ', async () => {
      const { _id: id } = await tasksModel.create(payloads.taskToDb);

      const response = await tasksModel.getTaskById(id);
    
      expect(ObjectId(response._id).toString()).to.have.be.equals(ObjectId(id).toString());
    });
  });

  describe('Test delete task ', () => {
    it('delete task by id: ', async () => {
      const { _id: id } = await tasksModel.create(payloads.taskToDb);

      const { result } = await tasksModel.deleteTask(id);
    
      expect(result.n).to.be.equals(1);
    });
  });

  describe('Test update task ', () => {
    it('task has updated', async() => {
      const oldTask = await tasksModel.create(payloads.taskToDb);
      const id = oldTask['_id'];
      expect(oldTask.content).to.be.equals(payloads.taskToDb.content);
      expect(oldTask.date).to.be.equals(payloads.taskToDb.date);
      expect(oldTask.status).to.be.equals(payloads.taskToDb.status);
      const { result } = await tasksModel.update({ id, ...payloads.newTaskToDb});
      const task = await tasksModel.getTaskById(id);
      expect(result.nModified).to.be.equals(1);
      expect(task.content).to.be.equals(payloads.newTaskToDb.content);
      expect(task.date).to.be.equals(payloads.newTaskToDb.date);
      expect(task.status).to.be.equals(payloads.newTaskToDb.status);
    });
  });
});
