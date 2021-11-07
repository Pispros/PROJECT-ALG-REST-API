/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var articleCtrlStub = {
  index: 'articleCtrl.index',
  show: 'articleCtrl.show',
  create: 'articleCtrl.create',
  upsert: 'articleCtrl.upsert',
  patch: 'articleCtrl.patch',
  destroy: 'articleCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var articleIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './article.controller': articleCtrlStub
});

describe('Article API Router:', function() {
  it('should return an express router instance', function() {
    expect(articleIndex).to.equal(routerStub);
  });

  describe('GET /api/articles', function() {
    it('should route to article.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'articleCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/articles/:id', function() {
    it('should route to article.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'articleCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/articles', function() {
    it('should route to article.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'articleCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/articles/:id', function() {
    it('should route to article.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'articleCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/articles/:id', function() {
    it('should route to article.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'articleCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/articles/:id', function() {
    it('should route to article.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'articleCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
