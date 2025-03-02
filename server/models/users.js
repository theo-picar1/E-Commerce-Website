const mongoose = require("mongoose")

const productsSchema = new mongoose.Schema({
  name: { type: String },
  category: { type: String },
  price: { type: Number },
  description: { type: [String] },
  rating: { type: Number },
  noOfReviews: { type: Number },
  stockQuantity: { type: Number },
  productImgs: { type: [String] },
})

const usersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    cart: [productsSchema],
  },
  {
    collection: "users",
  }
)

module.exports = mongoose.model("users", usersSchema)
