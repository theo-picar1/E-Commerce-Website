const router = require(`express`).Router()

const salesModel = require(`../models/sales`)

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

// Save a record of each Paypal payment
router.post('/sales', createNewSaleDocument)

router.get(`/sales/:id`, (req, res, next) => {
  salesModel.findOne({ userId: req.params.id }, (err, data) => {
    if (err) {
      return next(err)
    }

    if (!data) {
      return next(createError(401))
    }

    console.log("Found sales with matching user ID!")
    res.json(data)
  })
})

module.exports = router