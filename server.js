const express = require("express")
const path = require("path")
const app = express()

const cors = require("cors")
const clientUrl = process.env.CLIENT_URL || "http://localhost:3000"
app.use(
  cors({
    origin: clientUrl,
    credentials: true,
    methods:['GET', 'POST', 'PUT','DELETE'],
    allowedHeaders:['Content-Type', 'Authorization']             
  })
);

const cookieParser = require("cookie-parser")

const dotenv = require("dotenv").config()

const PORT = process.env.PORT || 3000

const connectDB = require("./config/db")
connectDB();

app.use(express.json())
app.use(cookieParser());


app.use("/users", require("./routes/users"));
app.use("/books", require("./routes/books"));
app.use("/category", require("./routes/category"));
app.use("/admin", require("./routes/admin"));
app.use("/carts", require("./routes/carts"));

app.use("/images", express.static(path.join(__dirname, "images")))

module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
  })
}