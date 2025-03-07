const mongoose = require("mongoose")

let productsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: [String], required: true },
    rating: { type: Number, required: true },
    noOfReviews: { type: Number, required: true },
    stockQuantity: { type: Number, required: true },
    productImgs: { type: [String], default: [] }
  },
  {
    collection: `products`,
  }
)

module.exports = mongoose.model("products", productsSchema)
