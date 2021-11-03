const sinon = require('sinon');
const { expect } = require('chai');

const tasksModel = require('../../src/model/tasksModel');
const tasksServices = require('../../src/service/tasksService');
const payloads = require('../payloadTasks');

describe('Service tests:', () => {
  before(() => {
  
    sinon.stub(tasksModel, 'create')
      .resolves(payloads.taskReturnedForDb);
  });

  after(() => {
    tasksModel.create.restore();
  });

  describe('Test if a task ', () => {
    it('inserted', async () => {
      const response = await tasksServices.create(payloads.taskToDb);
      expect(response).to.be.an('object');
    });
    it('has _id', async () => {
      const response = await tasksServices.create(payloads.taskToDb);
      expect(response).to.have.a.property('_id');
    });
    it('has content', async () => {
      const response = await tasksServices.create(payloads.taskToDb);
      expect(response).to.have.a.property('content');
    });
    it('has date', async () => {
      const response = await tasksServices.create(payloads.taskToDb);
      expect(response).to.have.a.property('date');
    });
    it('has status', async () => {
      const response = await tasksServices.create(payloads.taskToDb);
      expect(response).to.have.a.property('status');
    });
  });
});
