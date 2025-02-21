const mongoose = require(`mongoose`)

let productsSchema = new mongoose.Schema({
        name: { type: String },
        category: { type: String },
        price: { type: Number },
        description: { type: [String] }, 
        rating: { type: Number },
        noOfReviews: { type: Number },
        stockQuantity: { type: Number},
        productImgs: { type: [String] }
   },
   {
       collection: `products`
   })

module.exports = mongoose.model(`products`, productsSchema)