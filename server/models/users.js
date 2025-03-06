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

let usersSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    secondName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    houseAddress: { type: String, default: "" },
    telephoneNo: { type: String, required: true },
    accessLevel: { type: Number, default: parseInt(process.env.ACCESS_LEVEL_USER) },
    profilePhotoFilename: { type: String, default: "" },
    cart: { type: [productsSchema], default: [] }
  },
  {
    collection: `users`
  })

module.exports = mongoose.model("users", usersSchema)
