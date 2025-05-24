// backend/models/WatchedInterval.js
const mongoose = require('mongoose');

const intervalSchema = new mongoose.Schema({
  start: Number,
  end: Number,
});

const watchedSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  videoId: { type: String, required: true },
  intervals: [intervalSchema], // array of { start, end }
});

module.exports = mongoose.model('WatchedInterval', watchedSchema);
