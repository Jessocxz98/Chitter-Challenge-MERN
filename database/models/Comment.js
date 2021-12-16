const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    text: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    peepId: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Comment', CommentSchema);