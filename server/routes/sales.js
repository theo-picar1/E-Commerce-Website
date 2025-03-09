const router = require(`express`).Router()

const salesModel = require(`../models/sales`)

const createError = require('http-errors')

const createNewSaleDocument = (req, res, next) => {              
    let saleDetails = new Object()

    saleDetails.paypalPaymentID = req.body.paypalPaymentID
    saleDetails.cartItems = req.body.cartItems
    saleDetails.totalPrice = req.body.totalPrice
    saleDetails.userId = req.body.userId

    salesModel.create(saleDetails, (err, data) => {
        if (err) {
            return next(err)
        }

        console.log("Created sale object!")
    })
}

// To find multiple sales that has the user id passed in. For purchase history
const findAllMatchingSalesById = (req, res, next) => {
  salesModel.find({ userId: req.params.id }, (err, data) => {
    if (err) {
      return next(err)
    }

    if (!data) {
      return next(createError(401))
    }

    console.log("Found sales with matching user ID!")
    res.json(data)
  })
}

// Save a record of each Paypal payment
router.post('/sales', createNewSaleDocument)

// Finds all matching sales that contains user id in their schema. For purchase history
router.get(`/sales/:id`, findAllMatchingSalesById)

module.exports = router