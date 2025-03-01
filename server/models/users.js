const mongoose = require("mongoose")

// Define the products schema
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

// Define the users schema
const usersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    cart: [productsSchema], // Add productsSchema as an array for the cart
  },
  {
    collection: "users", // Specify the collection name
  }
)

// Export the users model
module.exports = mongoose.model("users", usersSchema)
