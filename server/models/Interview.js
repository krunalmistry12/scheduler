const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  selectedDate: { type: Date, required: true },
  slot: { type: String, required: true },
});

const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;
