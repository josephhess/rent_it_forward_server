'use strict';

const express = require('express');
const mongoose = require('mongoose');

const User = require('../models/user');

const router = express.Router();

/* ========== GET/READ ALL ITEMS ========== */
router.get('/', (req, res, next) => {

  User.find()
    .sort('name')
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

/* ========== GET/READ A SINGLE ITEM ========== */
router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  /***** Never trust users - validate input *****/
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  User.findById(id)
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

/* ========== POST/CREATE AN ITEM ========== */
router.post('/', (req, res, next) => {
  const { 
    email,
    password,
    firstName,
    lastName,
    zipCode 
  } = req.body;

  const newUser = { 
    email,
    password,
    firstName,
    lastName,
    zipCode 
  };

  /***** Never trust users - validate input *****/
  const required_params = [
    'email',
    'password',
    'firstName',
    'lastName',
    'zipCode' 
  ];
  required_params.forEach(param => {
    if (!newUser[param]) {
      const message = `Missing ${param} in request body`;
      const err = new Error(message);
      err.status = 400;
      return next(err);
    }
  });

  User.create(newUser)
    .then(result => {
      res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
    })
    .catch(err => {
      if (err.code === 11000) {
        err = new Error('User already exists');
        err.status = 400;
      }
      next(err);
    });
});

/* ========== PUT/UPDATE A SINGLE ITEM ========== */
// router.put('/:id', (req, res, next) => {
//   const { id } = req.params;
//   const { name } = req.body;

//   /***** Never trust users - validate input *****/
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     const err = new Error('The `id` is not valid');
//     err.status = 400;
//     return next(err);
//   }

//   if (!name) {
//     const err = new Error('Missing `name` in request body');
//     err.status = 400;
//     return next(err);
//   }

//   const updateFolder = { name };

//   Folder.findByIdAndUpdate(id, updateFolder, { new: true })
//     .then(result => {
//       if (result) {
//         res.json(result);
//       } else {
//         next();
//       }
//     })
//     .catch(err => {
//       if (err.code === 11000) {
//         err = new Error('Folder name already exists');
//         err.status = 400;
//       }
//       next(err);
//     });
// });

/* ========== DELETE/REMOVE A SINGLE ITEM ========== */
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  /***** Never trust users - validate input *****/
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  // ON DELETE SET NULL equivalent
  const userRemovePromise = User.findByIdAndRemove(id);

  Promise.all([userRemovePromise])
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
