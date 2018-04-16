const mongoose = require('mongoose');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const assetSchema = new Schema({
  active: { type: Boolean, default: true },
  created: { type: Date, default: Date.now },
  last_updated: { type: Date, default: Date.now },
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  content_type: String,
  content: Buffer,
});

module.exports = mongoose.model('Asset', assetSchema);
