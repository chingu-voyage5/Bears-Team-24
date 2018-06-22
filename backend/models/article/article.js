const mongoose = require('mongoose');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const articleSchema = new Schema({
  active: { type: Boolean, default: true },
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  created: { type: Date, default: Date.now },
  topic: { type: Schema.Types.ObjectId, ref: 'Topic' },
  sub_topic: { type: Schema.Types.ObjectId, ref: 'SubTopic' },
  title: String,
  order: Number,
  content: String,
  edit_lock: { type: Boolean, default: false },
});

module.exports = mongoose.model('Article', articleSchema);
