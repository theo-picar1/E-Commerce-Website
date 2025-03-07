const mongoose = require(`mongoose`)

let cartItemsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: [String], required: true },
    rating: { type: Number, required: true },
    noOfReviews: { type: Number, required: true },
    stockQuantity: { type: Number, required: true },
    productImgs: { type: [String], default: [] }
})

let salesSchema = new mongoose.Schema({
    paypalPaymentID: { type: String, required: true },
    cartItems: { type: [cartItemsSchema], required: true },
    totalPrice: { type: Number, required: true },
    userId: { type: String, required: true }
},
    {
        collection: `sales`
    })

module.exports = mongoose.model(`sales`, salesSchema)