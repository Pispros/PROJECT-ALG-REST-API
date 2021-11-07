/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/articles              ->  index
 * POST    /api/articles              ->  create
 * GET     /api/articles/:id          ->  show
 * PUT     /api/articles/:id          ->  upsert
 * PATCH   /api/articles/:id          ->  patch
 * DELETE  /api/articles/:id          ->  destroy
 */

import { applyPatch } from 'fast-json-patch';
import Article from './article.model';

function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity) {
        if(entity) {
            return res.status(statusCode).json(entity);
        }
        return null;
    };
}

function patchUpdates(patches) {
    return function(entity) {
        try {
            applyPatch(entity, patches, /*validate*/ true);
        } catch(err) {
            return Promise.reject(err);
        }

        return entity.save();
    };
}

function removeEntity(res) {
    return function(entity) {
        if(entity) {
            return entity.remove()
                .then(() => res.status(204).end());
        }
    };
}

function handleEntityNotFound(res) {
    return function(entity) {
        if(!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
        res.status(statusCode).send(err);
    };
}

// Gets a list of Articles
export function index(req, res) {
    return Article.find()
        .populate('categoryId')
        .exec()    
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a list of Articles
export function indexByCategories(req, res) {
    return  Article.find({categoryId: req.params.id})
            .populate('categoryId')
            .exec()    
            .then(respondWithResult(res))
            .catch(handleError(res));
}

// Gets a single Article from the DB
export function show(req, res) {
    return Article.findById(req.params.id)
        .populate('categoryId')
        .exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new Article in the DB
export function create(req, res) {
    return Article.create(req.body)
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
}

// Upserts the given Article in the DB at the specified ID
export function upsert(req, res) {
    if(req.body._id) {
        Reflect.deleteProperty(req.body, '_id');
    }
    return Article.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Updates an existing Article in the DB
export function patch(req, res) {
    if(req.body._id) {
        Reflect.deleteProperty(req.body, '_id');
    }
    return Article.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(patchUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Deletes a Article from the DB
export function destroy(req, res) {
    return Article.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}
