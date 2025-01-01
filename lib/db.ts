
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// MongoDB connection URL
const MONGO_URI = process.env.MONGO_URI as string;

// Ensure MONGO_URI is defined
if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI in your .env file');
}

// Connect to MongoDB function
const connectDB = async () => {
  // Check if already connected
  if (mongoose.connections[0].readyState) {
    console.log('Database already connected');
    return;
  }

  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI, {
      dbName: 'ameya_innovax', // Database name
    });

    // Check connection state
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1); // Exit the process with an error code
  }
};

export default connectDB;
