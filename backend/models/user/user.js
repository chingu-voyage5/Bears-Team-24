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
  email: String,
  name: {
    type: String,
    required: 'Please supply a name',
    trim: true
  },
  avatar: String
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
// userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);
