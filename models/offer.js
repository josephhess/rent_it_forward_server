// 'use strict';
// const mongoose = require('mongoose');

// mongoose.Promise = global.Promise;

// const OfferSchema = mongoose.Schema({
//   item_id: {type: Number,required: true},
//   offer_price: {type: Number, required: true},
//   user_id: {type: Number, required: true},
//   status: {type: String, enum: ['pending', 'accepted'] }
// });

// OfferSchema.methods.serialize = function() {
//   return {
//     id: this.id || '',
//     name: this.name || '',
//     offer_price: this.offer_price || '',
//     user_id: this.user_id || ''
//   };
// };

// OfferSchema.set('toObject', {
//   virtuals: true,
//   transform: (doc, result) => {
//     delete result._id;
//     delete result.__v;
//   }
// });

// const Offer = mongoose.model('Offer', OfferSchema);
