// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const progressRoutes = require('./routes/progressRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/progress', progressRoutes);

app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('MongoDB connected');
  app.listen(5000, () => console.log('Server running on port 5000'));
})
.catch((err) => console.error(err));
