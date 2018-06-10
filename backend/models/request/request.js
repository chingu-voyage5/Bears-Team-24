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
  diff: [
    {
      count: Number,
      added: Boolean,
      removed: Boolean,
      value: String,
    },
  ],
});

module.exports = mongoose.model('Request', requestSchema);
