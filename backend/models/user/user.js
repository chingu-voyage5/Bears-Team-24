const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;
// const mongodbErrorHandler = require('mongoose-mongodb-errors');

/**
 * Passport-Local Mongoose will add a username,
 * hash and salt field to store the username,
 * the hashed password and the salt value.
 */
const userSchema = new Schema({
  active: { type: Boolean, default: true },
  created: { type: Date, default: Date.now },
  github: {
    id: String,
    displayName: String,
    username: String,
  },
  email: String,
  username: {
    type: String,
    required: 'Please supply a username',
    trim: true,
  },
  role: { type: String, enum: ['admin', 'member'], default: 'member' },
  bio: String,
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'username' });
// userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);
