const mongoose = require('mongoose');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const topicSchema = new Schema({
  name: String,
  order: Number,
});

module.exports = mongoose.model('Topic', topicSchema);
