const serverless = require("serverless-http");
const app = require("../server");
const connectDB = require("../config/db");

const handler = serverless(app);

module.exports = async (req, res) => {
  try {
    await connectDB();

    return handler(req, res);
  } catch (error) {
    console.error("Database connection error:", error);

    return res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
};
