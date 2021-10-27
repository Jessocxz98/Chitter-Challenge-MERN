const { assert } = require('chai');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'Please provide a Username'],
      minlength: [4, 'Username must be at least 4 characters']
    }
  }
)

module.exports = mongoose.model('User', UserSchema);