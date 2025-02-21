const router = require(`express`).Router()

const productsModel = require(`../models/products`)

// read all records
router.get(`/products`, (req, res) => 
{   
  productsModel.find((error, data) => 
    {
        res.json(data)
    })
})

module.exports = router
  