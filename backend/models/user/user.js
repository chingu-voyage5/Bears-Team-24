const mongoose = require('mongoose');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

/**
 * Passport-Local Mongoose will add a username,
 * hash and salt field to store the username,
 * the hashed password and the salt value.
 */
// email can be anything in dev
let emailSpec;
if (process.env.NODE_ENV !== 'production') {
  emailSpec = String;
} else {
  emailSpec = {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please Supply an email address',
  };
}
const userSchema = new Schema({
  active: Boolean,
  email: emailSpec,
  username: {
    type: String,
    required: 'Please supply a username',
    trim: true,
  },
  role: { type: String, enum: ['admin', 'member'] },
  bio: String,
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);
