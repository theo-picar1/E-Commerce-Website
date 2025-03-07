const mongoose = require(`mongoose`)

let salesSchema = new mongoose.Schema({
    paypalPaymentID: { type: String, required: true },
    carID: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    firstName: { type: String, required: true },
    secondName: { type: String, required: true },
    email: { type: String, required: true }
},
    {
        collection: `sales`
    })

module.exports = mongoose.model(`sales`, salesSchema)