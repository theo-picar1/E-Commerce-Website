const mongoose = require("mongoose")

let productsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
    category: { type: String, required: true, minlength: 3, maxlength: 20 },
    price: { type: Number, required: true, min: 0 },
    description: { type: [String], required: true, trim: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    noOfReviews: { type: Number, required: true, min: 0 },
    stockQuantity: { type: Number, required: true, min: 0 },
    productImgs: { type: [String], default: [] }
  },
  {
    collection: `products`,
  }
)

module.exports = mongoose.model("products", productsSchema)
