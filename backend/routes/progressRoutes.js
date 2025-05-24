// backend/routes/progressRoutes.js
const express = require('express');
const { saveProgress, getProgress } = require('../controllers/progressController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/save', authMiddleware, saveProgress);
router.get('/:videoId', authMiddleware, getProgress);

module.exports = router;
