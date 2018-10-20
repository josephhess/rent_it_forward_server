// 'use strict';
// const mongoose = require('mongoose');

// mongoose.Promise = global.Promise;

// const ItemSchema = mongoose.Schema({
//   name: {type: String,required: true},
//   initial_price: {type: Number, required: true},
//   user_id: {type: Number, required: true}
// });

// ItemSchema.methods.serialize = function() {
//   return {
//     id: this.id || '',
//     name: this.name || '',
//     initial_price: this.initial_price || '',
//     user_id: this.user_id || ''
//   };
// };

// ItemSchema.set('toObject', {
//   virtuals: true,
//   transform: (doc, result) => {
//     delete result._id;
//     delete result.__v;
//   }
// });

// const Item = mongoose.model('Item', ItemSchema);
