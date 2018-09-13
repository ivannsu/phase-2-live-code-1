const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please fill user name']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please fill user email']
  },
  password: {
    type: String,
    required: [true, 'Please fill user password'],
    min: [6, 'Password harus 6 karakter']
  },
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;
