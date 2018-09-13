const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quoteSchema = new Schema({
  likes: [
    {type: Schema.Types.ObjectId, ref: 'User'}
  ],
  status: {
    type: String,
    required: [true, 'Please fill quote status']
  },
  user: {
    type: Schema.Types.ObjectId
  },
}, {
  timestamps: true
});

const Quote = mongoose.model('Quote', quoteSchema);
module.exports = Quote;
