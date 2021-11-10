const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'Please provide a Username'],
      minlength: [4, 'Username must be at least 4 characters'],
      maxlength: [15, 'Username must not have more than 15 characters'],
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

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user
    }
    throw Error('incorrect email or password');
  }
  throw Error('incorrect email or password');
}

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);