const chai = require('chai');
const chaiHttp = require('chai-http');

const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const server = require('../src/api/app');
const payloads = require('./payloadTasks');
const mongoConnection = require('../src/model/connection');

chai.use(chaiHttp);

const { expect } = chai;

describe('Integration tests: ', () => {
  before(async () => {
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

  after(() => {
    mongoConnection.getConnection.restore();
  });

  describe('when a task created', () => {
    let response = {};

    before(async () => {
      response = await chai.request(server)
        .post('/tasks')
        .send(payloads.taskReturnedForDb);
    });

    it('return http code 201', () => {
      expect(response).to.have.status(201);
    });

    it('return an object', () => {
      expect(response.body).to.be.a('object');
    });

    it('the object has a property content', () => {
      expect(response.body).to.have.property('content');
    });
  });
  describe('when a task aren\'t created', () => {
    let response = {};

    before(async () => {
      response = await chai.request(server)
        .post('/tasks')
        .send({});
    });

    it('return http code 400', () => {
      expect(response).to.have.status(400);
    });

    it('return an object', () => {
      expect(response.body).to.be.a('object');
    });

    it('the object has a property message', () => {
      expect(response.body).to.have.property('message');
    });
  });
  describe('get all tasks', () => {
    let response = {};

    before(async () => {
      response = await chai.request(server)
        .get('/tasks');
    });

    it('return http code 200', () => {
      expect(response).to.have.status(200);
    });

    it('return an array', () => {
      console.log(response.body);
      expect(response.body).to.be.an('array');
    });
  });

  describe('when a task deleted', () => {
    let response = {};

    before(async () => {
      const { _id: id } = await mongoConnection.getConnection()
        .then((db) => db.collection('tasks').insertOne(payloads.taskToDb))
        .then(({ insertedId: _id }) => ({ _id, status, content, date }));

      response = await chai.request(server)
        .delete('/tasks')
        .send({ id });
    });

    it('return http code 200', () => {
      expect(response).to.have.status(200);
    });
  });
  describe('when a task aren\'t deleted', () => {
    let response = {};

    before(async () => {
      response = await chai.request(server)
        .delete('/tasks')
        .send({ id: payloads.random_id });
    });

    it('return http code 404', () => {
      expect(response).to.have.status(404);
    });

    it('return an object', () => {
      expect(response.body).to.be.a('object');
    });

    it('the object has a property message', () => {
      expect(response.body).to.have.property('message');
    });
  });
});
