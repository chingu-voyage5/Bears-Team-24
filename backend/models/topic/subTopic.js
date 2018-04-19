const mongoose = require('mongoose');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const subTopicSchema = new Schema({
  parent: { type: Schema.Types.ObjectId, ref: 'Topic' },
  name: String,
  order: Number,
});

module.exports = mongoose.model('SubTopic', subTopicSchema);
