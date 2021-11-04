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
});
