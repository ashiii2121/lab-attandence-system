const mongoose = require('mongoose');

const AttandenceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  token:{type:Number},
  Entry: { type: Date, default: Date.now },
  Exit:{type: Date},
  notes: {type: String}

}
);

const Attandence = mongoose.model('User', AttandenceSchema);

module.exports = Attandence;
