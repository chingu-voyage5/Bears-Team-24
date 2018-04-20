const mongoose = require('mongoose');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const historySchema = new Schema({
  contributor: { type: Schema.Types.ObjectId, ref: 'User' },
  created: { type: Date, default: Date.now },
  article: { type: Schema.Types.ObjectId, ref: 'Article' },
  asset: { type: Schema.Types.ObjectId, ref: 'Asset' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  sizePre: Number,
  sizePost: Number,
});

module.exports = mongoose.model('History', historySchema);
