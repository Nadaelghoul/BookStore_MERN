const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";

app.use(
  cors({
    origin: clientUrl,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

// 1. Ensure DB is connected on every serverless request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: "Database connection failed" });
  }
});

// Import route modules
const userRoutes = require("./routes/users");
const bookRoutes = require("./routes/books");
const categoryRoutes = require("./routes/category");
const adminRoutes = require("./routes/admin");
const cartRoutes = require("./routes/carts");

// 2. Register routes with BOTH /api prefix and without
app.use("/api/users", userRoutes);
app.use("/users", userRoutes);

app.use("/api/books", bookRoutes);
app.use("/books", bookRoutes);

app.use("/api/category", categoryRoutes);
app.use("/category", categoryRoutes);

app.use("/api/admin", adminRoutes);
app.use("/admin", adminRoutes);

app.use("/api/carts", cartRoutes);
app.use("/carts", cartRoutes);

app.use("/images", express.static(path.join(__dirname, "images")));

// 3. Fallback 404 JSON handler to prevent returning HTML on missing routes
app.use("*", (req, res) => {
  res.status(404).json({ success: false, error: `Route ${req.originalUrl} not found` });
});

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;

  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  });
}