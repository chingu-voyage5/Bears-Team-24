const mongoose = require('mongoose');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const requestSchema = new Schema({
  requester: { type: Schema.Types.ObjectId, ref: 'User' },
  article: { type: Schema.Types.ObjectId, ref: 'Article' },
  created: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
  topic: { type: Schema.Types.ObjectId, ref: 'Topic' },
  sub_topic: { type: Schema.Types.ObjectId, ref: 'SubTopic' },
  title: String,
  order: Number,
  content: String,
});

module.exports = mongoose.model('Request', requestSchema);
