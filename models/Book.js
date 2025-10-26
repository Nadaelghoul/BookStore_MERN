const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  isFeatured: { type: Boolean, default: false },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  isOnSale: { type: Boolean, default: false },
  discountPercent: { type: String,  default:false },
  coverImage: { type: String },
});

module.exports = mongoose.model('Book', bookSchema);


