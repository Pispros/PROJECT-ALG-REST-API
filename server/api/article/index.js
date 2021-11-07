var express = require('express');
var controller = require('./article.controller');

var router = express.Router();


router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/byCategories/:id', controller.indexByCategories);
router.post('/', controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
