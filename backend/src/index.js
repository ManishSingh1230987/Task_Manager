import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import app from './app.js';

const PORT = process.env.PORT || 8000;

console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'Not set');

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));