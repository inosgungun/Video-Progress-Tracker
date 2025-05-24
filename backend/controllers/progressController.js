// backend/controllers/progressController.js
const WatchedInterval = require('../models/WatchedInterval');

/**
 * Merge overlapping intervals and return total watched seconds
 */
function mergeIntervals(intervals) {
  if (!intervals.length) return [];

  intervals.sort((a, b) => a.start - b.start);
  const merged = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const last = merged[merged.length - 1];
    const current = intervals[i];

    if (current.start <= last.end) {
      last.end = Math.max(last.end, current.end);
    } else {
      merged.push(current);
    }
  }

  return merged;
}

exports.saveProgress = async (req, res) => {
  const { videoId, start, end } = req.body;
  const userId = req.user.id;

  try {
    let record = await WatchedInterval.findOne({ userId, videoId });

    if (!record) {
      record = new WatchedInterval({ userId, videoId, intervals: [] });
    }

    record.intervals.push({ start, end });
    const merged = mergeIntervals(record.intervals);
    record.intervals = merged;

    await record.save();

    const totalWatched = merged.reduce((acc, i) => acc + (i.end - i.start), 0);
    res.json({ message: 'Progress saved', totalWatched });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not save progress' });
  }
};

exports.getProgress = async (req, res) => {
  const { videoId } = req.params;
  const userId = req.user.id;

  try {
    const record = await WatchedInterval.findOne({ userId, videoId });
    if (!record) return res.json({ intervals: [], totalWatched: 0 });

    const merged = mergeIntervals(record.intervals);
    const totalWatched = merged.reduce((acc, i) => acc + (i.end - i.start), 0);
    res.json({ intervals: merged, totalWatched });
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch progress' });
  }
};
