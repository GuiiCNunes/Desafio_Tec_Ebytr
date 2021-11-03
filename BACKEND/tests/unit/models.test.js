const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoConnection = require('../../src/model/connection');
const tasksModel = require('../../src/model/tasksModel');

const payloads = require('../payloadTasks');

describe('Model tests: ', () => {
  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();

    let connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then((conn) => conn.db('Ebytr'));

    
    sinon.stub(mongoConnection, 'getConnection').resolves(connectionMock);
  });

  after(() => {
    mongoConnection.getConnection.restore();
  });

  describe('Test if a task ', () => {
    let response;

    before( async () => {
      response = await tasksModel.create(payloads.taskToDb);
    });
    it('inserted', async () => {
      expect(response).to.be.a('object');
    });
    it('has _id', async () => {
      expect(response).to.have.a.property('_id');
    });
    it('has content', async () => {
      expect(response).to.have.a.property('content');
    });
    it('has date', async () => {
      expect(response).to.have.a.property('date');
    });
    it('has status', async () => {
      expect(response).to.have.a.property('status');
    });
  })
});
