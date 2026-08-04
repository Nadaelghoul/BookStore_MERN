const mongoose = require("mongoose");

// Disable Mongoose buffering so queries fail immediately 
// if there is no connection, instead of hanging for 300 seconds
mongoose.set("bufferCommands", false);

// Global cache to persist across serverless invocations
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  // 1. If a connection is already established, reuse it
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  // 2. If a connection attempt is already in progress, wait for it instead of opening a new one
  if (!cached.promise) {
    const opts = {
      serverSelectionTimeoutMS: 10000,
    };

    cached.promise = mongoose
      .connect(process.env.MONGO_URI, opts)
      .then((mongooseInstance) => {
        console.log("✅ MongoDB connected successfully");
        return mongooseInstance;
      })
      .catch((error) => {
        console.error("❌ MongoDB connection failed:", error.message);
        cached.promise = null; // Reset promise so future attempts can retry
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
};

module.exports = connectDB;


