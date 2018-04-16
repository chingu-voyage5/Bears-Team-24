const mongoose = require('mongoose');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const subTopicSchema = new Schema({
  name: String,
  order: Number,
});

module.exports = mongoose.model('SubTopic', subTopicSchema);
