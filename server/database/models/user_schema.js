const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'Please provide a Username'],
      minlength: [4, 'Username must be at least 4 characters'],
      maxlength: [15, 'Username must not have more than 15 charaters'],
      match: [/^[a-zA-Z0-9]+$/, 'Username cannot contain spaces'],
      unique: true,
    },
    password: {
      type: String,
      minlength: [10, 'Password must be at least 10 characters'],
      required: [true, 'Please provide a password']
    }
  }
)

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);