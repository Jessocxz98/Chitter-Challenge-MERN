const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

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
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      trim: true,
      match: [/^.+@(?:[\w-]+\.)+\w+$/, 'Please provide a valid email']
    }
  }
)

UserSchema.pre('save', function(next) {
  let user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err.message);
    
    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
  });
});

UserSchema.plugin(uniqueValidator);

const User = mongoose.model('User', UserSchema)

module.exports = User;