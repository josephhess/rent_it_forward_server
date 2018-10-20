'use strict';

const express = require('express');
const mongoose = require('mongoose');

const Item = require('../models/item');


const router = express.Router();

/* ========== GET/READ ALL ITEMS ========== */
router.get('/', (req, res, next) => {

  Item.find()
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

  Item.findById(id)
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
    name,
    initial_price,
    user_id,
    description 
  } = req.body;

  const newItem = { 
    name,
    initial_price,
    user_id,
    description
  };

  /***** Never trust users - validate input *****/
  const required_params = [
    'name',
    'initial_price',
    'user_id',
    'description'
  ];
  required_params.forEach(param => {
    if (!newItem[param]) {
      const err = new Error(`Missing ${param} in request body`);
      err.status = 400;
      return next(err);
    }
  });


  Item.create(newItem)
    .then(result => {
      res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
    })
    .catch(err => {
      if (err.code === 11000) {
        err = new Error('User name already exists');
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

//   const updateUser = { name };

//   User.findByIdAndUpdate(id, updateUser, { new: true })
//     .then(result => {
//       if (result) {
//         res.json(result);
//       } else {
//         next();
//       }
//     })
//     .catch(err => {
//       if (err.code === 11000) {
//         err = new Error('User name already exists');
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

  const itemRemovePromise = Item.findByIdAndRemove(id);

  // const UserUpdatePromise = User.updateMany(
  //   { users: id },
  //   { $pull: { users: id } }
  // );

  Promise.all([itemRemovePromise])
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      next(err);
    });

});

module.exports = router;