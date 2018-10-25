'use strict';
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const OfferSchema = mongoose.Schema({
  item_id: {type: String,required: true},
  offer_price: {type: Number, required: true},
  owner_user_id: {type: String, required: true},
  buyer_user_id: {type: String, required: true},
  item_name: {type: String, required: true},
  status: {type: String, enum: ['pending', 'accepted','politely declined'],default: 'pending' },
  
});

OfferSchema.methods.serialize = function() {
  return {
    id: this.id || '',
    name: this.name || '',
    offer_price: this.offer_price || '',
    user_id: this.user_id || ''
  };
};

// OfferSchema.set('toObject', {
//   virtuals: true,
//   transform: (doc, result) => {
//     delete result._id;
//     delete result.__v;
//   }
// });

module.exports = mongoose.model('Offer', OfferSchema);
