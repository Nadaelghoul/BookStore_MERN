const express = require("express")
const app = express()

const cors = require("cors")
app.use(
  cors({
    origin: "http://localhost:3000", 
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

app.use("/images", express.static("images"))



app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})