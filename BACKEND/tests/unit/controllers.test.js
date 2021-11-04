const sinon = require('sinon');
const { expect } = require('chai');

const tasksServices = require('../../src/service/tasksService');
const tasksControllers = require('../../src/controller/tasksController');
const payloads = require('../payloadTasks');

describe('Controller tests: ', () => {
  describe('test correct task ', () => {
    const response = {};
    const request = {};
    const next = {};

    before(() => {
      request.body = payloads.taskToDb;

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns(payloads.taskReturnedForDb);

      sinon.stub(tasksServices, 'create')
        .resolves(payloads.taskReturnedForDb);
    })

    after(() => {
      tasksServices.create.restore();
    });

    it('called response with code 201', async () => {
      await tasksControllers.create(request, response, next);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });
    it('called response with task in the body', async () => {
      await tasksControllers.create(request, response, next);

      expect(response.json.calledWith(payloads.taskReturnedForDb)).to.be.equal(true);
    });
  });
  describe('test wrong task ', () => {
    const response = {};
    const request = {};
    let next = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub()
        .returns(response);
      next = sinon.stub().returns('');

      sinon.stub(tasksServices, 'create')
        .resolves({});
    })

    after(() => {
      tasksServices.create.restore();
    });

    it('passed error', async () => {
      await tasksControllers.create(request, response, next);
      const call = { status: 400, message: 'empty data' };
      expect(next.calledWith(call)).to.be.equal(true);
    });
  });
});