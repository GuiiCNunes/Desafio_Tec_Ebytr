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
        .returns();

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
      const call = { code: 400, message: 'empty data' };
      expect(next.calledWith(call)).to.be.equal(true);
    });
  });

  describe('Test get tasks: ', () => {
    const response = {};
    const request = {};
    const next = {};

    before(() => {
      request.body = payloads.taskToDb;

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(tasksServices, 'getAll')
        .resolves(payloads.allTasks);
    })

    after(() => {
      tasksServices.getAll.restore();
    });

    it('called response with code 200', async () => {
      await tasksControllers.getAll(request, response, next);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('called response with tasks in the body', async () => {
      await tasksControllers.getAll(request, response, next);

      expect(response.json.calledWith(payloads.allTasks)).to.be.equal(true);
    });
  });

  describe('Delete task: ', () => {
    describe('exist id ', () => {
      const response = {};
      const request = {};
      const next = {};

      before(() => {
        request.body = { id: payloads.example_id };

        response.status = sinon.stub()
          .returns(response);
        response.end = sinon.stub()
          .returns();

        sinon.stub(tasksServices, 'deleteTask')
          .resolves(true);
      })

      after(() => {
        tasksServices.deleteTask.restore();
      });

      it('called response with code 200', async () => {
        await tasksControllers.deleteTask(request, response, next);
  
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
      it('called response with end', async () => {
        await tasksControllers.deleteTask(request, response, next);
  
        expect(response.end.calledWith()).to.be.equal(true);
      });
    });
    describe('inexist id ', () => {
      const response = {};
      const request = {};
      let next = {};

      before(() => {
        request.body = { id: payloads.example_id };

        response.status = sinon.stub()
          .returns(response);
        next = sinon.stub().returns('');

        sinon.stub(tasksServices, 'deleteTask')
          .resolves(false);
      })

      after(() => {
        tasksServices.deleteTask.restore();
      });

      it('passed error', async () => {
        await tasksControllers.deleteTask(request, response, next);
        const call = { code: 404, message: 'not found' };
        expect(next.calledWith(call)).to.be.equal(true);
      });
    });
  });

  describe('Update task: ', () => {
    describe('exist id ', () => {
      const response = {};
      const request = {};
      const next = {};

      before(() => {
        request.body = { id: payloads.example_id };

        response.status = sinon.stub()
          .returns(response);
        response.end = sinon.stub()
          .returns();

        sinon.stub(tasksServices, 'update')
          .resolves(true);
      })

      after(() => {
        tasksServices.update.restore();
      });

      it('called response with code 200', async () => {
        await tasksControllers.update(request, response, next);
  
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
      it('called response with end', async () => {
        await tasksControllers.update(request, response, next);
  
        expect(response.end.calledWith()).to.be.equal(true);
      });
    });
    describe('inexist id ', () => {
      const response = {};
      const request = {};
      let next = {};

      before(() => {
        request.body = { id: payloads.example_id };

        response.status = sinon.stub()
          .returns(response);
        next = sinon.stub().returns('');

        sinon.stub(tasksServices, 'update')
          .resolves(false);
      })

      after(() => {
        tasksServices.update.restore();
      });

      it('passed error', async () => {
        await tasksControllers.update(request, response, next);
        const call = { code: 404, message: 'not found' };
        expect(next.calledWith(call)).to.be.equal(true);
      });
    });
  });
});