const sinon = require('sinon');
const { expect } = require('chai');

const tasksModel = require('../../src/model/tasksModel');
const tasksServices = require('../../src/service/tasksService');
const payloads = require('../payloadTasks');

describe('Service tests:', () => {
  before(() => {
  
    sinon.stub(tasksModel, 'create')
      .resolves(payloads.taskReturnedForDb);
    sinon.stub(tasksModel, 'getAll')
      .resolves(payloads.allTasks);
    sinon.stub(tasksModel, 'getTaskById')
      .resolves(payloads.taskReturnedForDb);
  });

  after(() => {
    tasksModel.create.restore();
    tasksModel.getAll.restore();
    tasksModel.getTaskById.restore();
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

  describe('Test if a wrong task status ', () => {
    it('return null', async () => {
      const response = await tasksServices.create(payloads.taskToDbWithOutStatus);
      expect(response).to.be.a('null');
    });
  });

  describe('Test if get tasks: ', () => {
    it('get all tasks: ', async () => {
      const response = await tasksServices.getAll();
    
      expect(response).to.be.an('array');
      expect(response.length).to.be.equal(3);
    });
    it('get task by id', async () => {
      const response = await tasksServices.getTaskById(payloads.example_id);
      expect(response).to.be.an('object');
      expect(response).to.have.a.property('_id');
      expect(response).to.have.a.property('content');
      expect(response).to.have.a.property('status');
      expect(response).to.have.a.property('date');
    });
  });

  describe('Test delete task: ', () => {
    describe('with exist id', () => {
      before(() => {
  
        sinon.stub(tasksModel, 'deleteTask')
          .resolves(payloads.correctDbReturnToDelete);
      });
    
      after(() => {
        tasksModel.deleteTask.restore();
      });

      it('altered database', async () => {
        const response = await tasksServices.deleteTask(payloads.example_id);
        expect(response).to.be.equal(true);
      });
    });
    describe('with inexist id', () => {
      before(() => {
  
        sinon.stub(tasksModel, 'deleteTask')
          .resolves(payloads.incorrectDbReturnToDelete);
      });
    
      after(() => {
        tasksModel.deleteTask.restore();
      });

      it('dont\'t altered database', async () => {
        const response = await tasksServices.deleteTask(payloads.example_id);
        expect(response).to.be.equal(false);
      });
    });
  });

  describe('Test update task: ', () => {
    describe('with correct data', () => {
      before(() => {
  
        sinon.stub(tasksModel, 'update')
          .resolves(payloads.correctDbReturnToDelete);
      });
    
      after(() => {
        tasksModel.update.restore();
      });

      it('task has updated ', async () => {
        const response = await tasksServices.update({ ...payloads.newTaskToDb, id: payloads.example_id });
        expect(response).to.be.equal(true);
      });
    });
    describe('with incorrect data', () => {
      before(() => {
  
        sinon.stub(tasksModel, 'update')
          .resolves(payloads.incorrectDbReturnToDelete);
      });
    
      after(() => {
        tasksModel.update.restore();
      });

      it('task hasn\'t updated ', async () => {
        const response = await tasksServices.update({ ...payloads.newTaskToDb, id: payloads.example_id });
        expect(response).to.be.equal(false);
      });
    });
  });

});
