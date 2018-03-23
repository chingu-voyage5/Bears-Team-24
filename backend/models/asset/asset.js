const mongoose = require('mongoose');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const assetSchema = new Schema({
  active: Boolean,
  type: { type: String, enum: ['image', 'audio', 'video']},
  created: Date,
  last_updated: Date,
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  content_type: String,
  content: Buffer
});

module.exports = mongoose.model('Asset', assetSchema);
