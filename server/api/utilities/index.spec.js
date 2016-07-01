'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var vrfCtrlStub = {
  index: 'vrfCtrl.index',
  show: 'vrfCtrl.show',
  create: 'vrfCtrl.create',
  update: 'vrfCtrl.update',
  destroy: 'vrfCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var vrfIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './vrf.controller': vrfCtrlStub
});

describe('Vrf API Router:', function() {

  it('should return an express router instance', function() {
    expect(vrfIndex).to.equal(routerStub);
  });

  describe('GET /api/vrf', function() {

    it('should route to vrf.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'vrfCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/vrf/:id', function() {

    it('should route to vrf.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'vrfCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/vrf', function() {

    it('should route to vrf.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'vrfCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/vrf/:id', function() {

    it('should route to vrf.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'vrfCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/vrf/:id', function() {

    it('should route to vrf.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'vrfCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/vrf/:id', function() {

    it('should route to vrf.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'vrfCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
