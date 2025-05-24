import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error('MONGODB_URL is not defined in environment variables.');
}

console.log('Connecting to MongoDB...');

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Global cache for database connection (for serverless environments)
let cached: MongooseConnection = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async (): Promise<Mongoose> => {
  if (cached.conn) {
    // If already connected, return the cached connection
    console.log('Using existing database connection');
    return cached.conn;
  }

  if (!MONGODB_URL) {
    throw new Error('Missing MONGODB_URL in environment variables');
  }

  // Prevent multiple database connections on the same request
  cached.promise = cached.promise || mongoose.connect(MONGODB_URL, { dbName: 'imaginify', bufferCommands: false });

  try {
    cached.conn = await cached.promise;
    console.log('MongoDB connection successful');
    return cached.conn;
  } catch (error) {
    if (error instanceof Error) {
      // If error is a JavaScript Error object, use error.message
      console.error('MongoDB connection error:', error.message);
      throw new Error(`Failed to connect to MongoDB: ${error.message}`);
    } else {
      // If error is not a JavaScript Error object, log and throw a generic error
      console.error('MongoDB connection error:', error);
      throw new Error('Failed to connect to MongoDB: Unknown error');
    }
  }
};



















// // /* eslint-disable @typescript-eslint/no-explicit-any */
// import mongoose, { Mongoose } from 'mongoose';

// const MONGODB_URL = process.env.MONGODB_URL;

// interface MongooseConnection {
//     conn: Mongoose | null;
//     promise: Promise<Mongoose> | null;
// }

// let cached: MongooseConnection = (global as any).mongoose;

// if (!cached) {
//     cached = (global as any).mongoose = { conn: null, promise: null };
// }


// export const connectToDatabase = async () => {
//     if (cached.conn) return cached.conn;
//     if (!MONGODB_URL) throw new Error('Missing MONGODB_URL is not defined');
//     cached.promise = cached.promise || mongoose.connect(MONGODB_URL, { dbName: 'fantacreate', bufferCommands: false });

//     cached.conn = await cached.promise;
//     return cached.conn;
// }