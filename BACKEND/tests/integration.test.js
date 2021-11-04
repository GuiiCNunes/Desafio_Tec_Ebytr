const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../src/api/app');
const payloads = require('./payloadTasks');

chai.use(chaiHttp);

const { expect } = chai;

describe('Integration tests: ', () => {
  describe('when a task created', () => {
    let response = {};

    before(async () => {
      response = await chai.request(server)
        .post('/tasks')
        .send(payloads.taskToDb);
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
});
