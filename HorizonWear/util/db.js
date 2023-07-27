// db.js

import mongoose from 'mongoose';

// Move the URI definition outside the functions
const URI = process.env.MONGODB_URI;

// Set up the Mongoose connection
export const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

// Export the Mongoose instance for models and queries
export default mongoose;
