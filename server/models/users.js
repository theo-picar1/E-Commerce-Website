const mongoose = require("mongoose")

let productsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: [String], required: true },
  rating: { type: Number, required: true },
  noOfReviews: { type: Number, required: true },
  stockQuantity: { type: Number, required: true },
  productImgs: { type: [String], default: [] },
})

let purchasedProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
})

let purchaseHistory = new mongoose.Schema({
  orderId: { type: String, required: true },
  date: { type: String, required: true },
  items: { type: [purchasedProductSchema], default: [] },
  totalAmount: { type: Number, required: true },
})

let usersSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    secondName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    houseAddress: { type: String, default: "" },
    telephoneNo: { type: String, required: true },
    accessLevel: {
      type: Number,
      default: parseInt(process.env.ACCESS_LEVEL_USER),
    },
    profilePhotoFilename: { type: String, default: "" },
    cart: { type: [productsSchema], default: [] },
    purchaseHistory: { type: [purchaseHistory], default: [] },
  },
  {
    collection: `users`,
  }
)

module.exports = mongoose.model("users", usersSchema)
