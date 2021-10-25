const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PeepSchema = new Schema(
  {
    text: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Peep', PeepSchema);