const mongoose = require("mongoose")

let productsSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
  category: { type: String, required: true, minlength:3, maxlength: 20 },
  price: { type: Number, required: true, min: 0 },
  description: { type: [String], required: true, trim: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  noOfReviews: { type: Number, required: true, min: 0 },
  stockQuantity: { type: Number, required: true, min: 0 },
  productImgs: { type: [String], default: [] }
})

let usersSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true, minlength: 2, maxlength: 50 },
    secondName: { type: String, required: true },
    email: { type: String, required: true, maxlength: 100, trim: true },
    password: { type: String, required: true, minlength: 8, maxlength: 100 },
    houseAddress: { type: String, default: "" },
    telephoneNo: { type: String, default: "" },
    accessLevel: { type: Number, default: parseInt(process.env.ACCESS_LEVEL_USER), required: true },
    profilePhotoFilename: { type: String, default: "" },
    cart: { type: [productsSchema], default: [] },
    purchaseHistory: { type: [purchaseHistory], default: [] },
  },
  {
    collection: `users`,
  }
)

module.exports = mongoose.model("users", usersSchema)
