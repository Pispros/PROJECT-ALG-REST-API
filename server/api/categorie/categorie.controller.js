/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/categories              ->  index
 * POST    /api/categories              ->  create
 * GET     /api/categories/:id          ->  show
 * PUT     /api/categories/:id          ->  upsert
 * PATCH   /api/categories/:id          ->  patch
 * DELETE  /api/categories/:id          ->  destroy
 */

import { applyPatch } from 'fast-json-patch';
import Categorie from './categorie.model';
import Article from '../article/article.model';

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

// Gets a list of Categories
export function index(req, res) {
    return Categorie.find().exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a list of Categories
export async function indexOnArticles(req, res) {

    try
    {
        let listCategories = await Categorie.find();
        for (let index = 0; index < listCategories.length; index++) {
            
            let listArticles = await Article.find({categoryId: listCategories[index]._id});
            listCategories[index].listArticles = [];
            listCategories[index].listArticles = [...listArticles];               
        }
        console.log(listCategories);
        res.status(200).json(listCategories);
    }
    catch(e)
    {
        console.log(e);
    }
}

// Gets a single Categorie from the DB
export function show(req, res) {
    return Categorie.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new Categorie in the DB
export function create(req, res) {
    return Categorie.create(req.body)
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
}

// Upserts the given Categorie in the DB at the specified ID
export function upsert(req, res) {
    if(req.body._id) {
        Reflect.deleteProperty(req.body, '_id');
    }
    return Categorie.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Updates an existing Categorie in the DB
export function patch(req, res) {
    if(req.body._id) {
        Reflect.deleteProperty(req.body, '_id');
    }
    return Categorie.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(patchUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Deletes a Categorie from the DB
export function destroy(req, res) {
    return Categorie.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}
