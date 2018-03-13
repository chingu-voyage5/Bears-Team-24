const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;
// const validator = require('validator');
// const mongodbErrorHandler = require('mongoose-mongodb-errors');

/**
 * Passport-Local Mongoose will add a username,
 * hash and salt field to store the username,
 * the hashed password and the salt value.
 */
const userSchema = new Schema({
  active: Boolean,
  github: {
    id: String,
    displayName: String,
    username: String
  },
  email: String,
  username: {
    type: String,
    required: 'Please supply a name',
    trim: true
  },
  avatar: String
});

userSchema.pre('save', function preSaveHook(next) {
  if (typeof this.username === 'undefined') {
    this.username = this.github.username;
  }
  next();
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'username' });
// userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);
