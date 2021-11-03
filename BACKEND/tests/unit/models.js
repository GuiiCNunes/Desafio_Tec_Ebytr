const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient, ObjectId } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoConnection = require('../../src/model/connection');
const tasksModel = require('../../src/model/tasksModel');

describe('Model tests: ', () => {
  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient
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
    it('inserted', () => {
      const response = await tasksModel.create();
      expect(response).to.be.a('object');
    });
    it('has _id', () => {
      const response = await tasksModel.create();
      expect(response).to.have.a.property('_id');
    });
    it('has content', () => {
      const response = await tasksModel.create();
      expect(response).to.have.a.property('content');
    });
    it('has date', () => {
      const response = await tasksModel.create();
      expect(response).to.have.a.property('date');
    });
    it('has status', () => {
      const response = await tasksModel.create();
      expect(response).to.have.a.property('status');
    });
  })
});
