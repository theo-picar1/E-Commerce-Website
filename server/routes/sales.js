const router = require(`express`).Router()

const salesModel = require(`../models/sales`)
const productsModel = require(`../models/products`)


const createNewSaleDocument = (req, res, next) => {              
    let saleDetails = new Object()

    saleDetails.paypalPaymentID = req.params.paymentID
    saleDetails.cartItems = req.params.cartItems
    saleDetails.totalPrice = req.params.totalPrice
    saleDetails.firstName = req.params.firstName
    saleDetails.secondName = req.params.secondName
    saleDetails.email = req.params.email


    // productsModel.findByIdAndUpdate({ _id: req.params.carID }, { sold: true }, (err, data) => {
    //     if (err) {
    //         return next(err)
    //     }
    // })

    salesModel.create(saleDetails, (err, data) => {
        if (err) {
            return next(err)
        }
    })

    return res.json({ success: true })
}


// Save a record of each Paypal payment
router.post('/sales/:paymentID/:carID/:price/:customerName/:customerEmail', createNewSaleDocument)

module.exports = router