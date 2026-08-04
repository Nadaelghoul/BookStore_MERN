const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  // Reuse existing connection
  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    isConnected = true;

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    isConnected = false;

    console.error("❌ MongoDB connection failed:", error.message);

    throw error;
  }
};

module.exports = connectDB;