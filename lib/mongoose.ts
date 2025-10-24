import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

let MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  try {
    const envPath = path.resolve(process.cwd(), '.env.local');
    const envFile = fs.readFileSync(envPath, 'utf8');
    const envVars = envFile.split('\n').reduce((acc, line) => {
      const [key, value] = line.split('=');
      if (key && value) {
        acc[key.trim()] = value.trim();
      }
      return acc;
    }, {} as Record<string, string>);
    MONGODB_URI = envVars.MONGODB_URI;
  } catch (error) {
    // ignore
  }
}

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI not set in .env.local');
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
