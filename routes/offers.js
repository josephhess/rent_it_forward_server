'use strict';

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Offer = require('../models/offer');

const router = express.Router();
router.all('*', cors());

/* ========== GET/READ ALL ITEMS ========== */
router.get('/', (req, res, next) => {
  

  Offer.find()
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

  Offer.findById(id)
    .populate('tags')
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
// ================ offers by buyer =============

router.get('/buyer/:buyer_user_id', (req,res, next) => {
  const { buyer_user_id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(buyer_user_id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  Offer.find({buyer_user_id: buyer_user_id})
    .then(results => {
      if(results){
        res.json(results);
      } else {
        next();
      }
    })
    .catch(err => next(err));

});
// ================ offers by owner =============

router.get('/owner/:owner_user_id', (req,res, next) => {
  const { owner_user_id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(owner_user_id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  Offer.find({owner_user_id: owner_user_id})
    .then(results => {
      if(results){
        res.json(results);
      } else {
        next();
      }
    })
    .catch(err => next(err));

});

/* ========== POST/CREATE AN ITEM ========== */
router.post('/', (req, res, next) => {
  const { 
    item_id,
    owner_user_id,
    buyer_user_id,
    offer_price,
    item_name,
    status 
  } = req.body;

  const newOffer = {
    item_id,
    owner_user_id,
    buyer_user_id,
    offer_price,
    item_name,
    status 
  };

  /***** Never trust users - validate input *****/
  const required_params = [
    'item_id',
    'owner_user_id',
    'buyer_user_id',
    'offer_price',
    'item_name'
  ];
  required_params.forEach(param => {
    if (!newOffer[param]) {
      const err = new Error(`Missing ${param} in request body`);
      err.status = 400;
      return next(err);
    }
  });
  // const available_enums = ['pending', 'accepted']


  Offer.create(newOffer)
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
router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  

  const toUpdate = {};
  const updateableFields = ['status'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  /***** Never trust users - validate input *****/
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  if (toUpdate.status === '') {
    const err = new Error('Missing `status` in request body');
    err.status = 400;
    return next(err);
  }

  Offer.findByIdAndUpdate(id, toUpdate, { new: true })
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

/* ========== DELETE/REMOVE A SINGLE ITEM ========== */
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  /***** Never trust users - validate input *****/
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  Offer.findByIdAndRemove(id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
