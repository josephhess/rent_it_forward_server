'use strict';
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const ItemSchema = mongoose.Schema({
  name: {type: String,required: true},
  initial_price: {type: Number, required: true},
  user_id: {type: String, required: true},
  description: {type: String, required: true}
});

ItemSchema.methods.serialize = function() {
  return {
    id: this.id || '',
    name: this.name || '',
    initial_price: this.initial_price || '',
    user_id: this.user_id || '',
    description: this.description || ''
  };
};

// ItemSchema.set('toJson', {
//   virtuals: true,
//   transform: (doc, result) => {
//     delete result._id;
//     delete result.__v;
//   }
// });

module.exports = mongoose.model('Item', ItemSchema);
