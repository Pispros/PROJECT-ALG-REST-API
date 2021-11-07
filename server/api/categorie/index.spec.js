/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var categorieCtrlStub = {
  index: 'categorieCtrl.index',
  show: 'categorieCtrl.show',
  create: 'categorieCtrl.create',
  upsert: 'categorieCtrl.upsert',
  patch: 'categorieCtrl.patch',
  destroy: 'categorieCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var categorieIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './categorie.controller': categorieCtrlStub
});

describe('Categorie API Router:', function() {
  it('should return an express router instance', function() {
    expect(categorieIndex).to.equal(routerStub);
  });

  describe('GET /api/categories', function() {
    it('should route to categorie.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'categorieCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/categories/:id', function() {
    it('should route to categorie.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'categorieCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/categories', function() {
    it('should route to categorie.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'categorieCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/categories/:id', function() {
    it('should route to categorie.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'categorieCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/categories/:id', function() {
    it('should route to categorie.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'categorieCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/categories/:id', function() {
    it('should route to categorie.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'categorieCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
