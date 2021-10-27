const { assert } = require('chai');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'Please provide a Username'],
      minlength: [4, 'Username must be at least 4 characters'],
      maxlength: [15, 'Username must not have more than 15 charaters']
    }
  }
)

module.exports = mongoose.model('User', UserSchema);