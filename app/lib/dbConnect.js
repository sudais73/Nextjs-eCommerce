import mongoose from 'mongoose';

// Caching connection to reuse across requests
let cachedConnection = null;

async function dbConnect() {
  // If a connection is already cached, use it
  if (cachedConnection) {
    console.log('Using cached database connection');
    return cachedConnection;
  }

  // Ensure MONGODB_URI is defined
  if (!process.env.MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }

  try {
    // Attempt to connect to MongoDB
    const connection = await mongoose.connect(process.env.MONGODB_URI);

    console.log('New database connection established');
    cachedConnection = connection; // Cache the new connection
    return connection;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw new Error('Database connection failed');
  }
}

export default dbConnect;