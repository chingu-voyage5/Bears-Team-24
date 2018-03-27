const mongoose = require('mongoose');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const articleSchema = new Schema({
  active: { type: Boolean, default: true },
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  created: { type: Date, default: Date.now },
  topic: String,
  sub_topic: String,
  title: String,
  content: String,
});

module.exports = mongoose.model('Article', articleSchema);
