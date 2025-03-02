const router = require(`express`).Router()

const productsModel = require(`../models/products`)

const multer = require('multer')
var upload = multer({ dest: `${process.env.UPLOADED_FILES_FOLDER}` })

// read all records
router.get(`/products`, (req, res) => {
  productsModel.find((error, data) => {
    res.json(data)
  })
})

// Read one record
router.get(`/products/:id`, (req, res) => {
  productsModel.findById(req.params.id, (error, data) => {
    res.json(data)
  })
})

// Update one record
router.put(`/products/:id`, (req, res) => {
  productsModel.findByIdAndUpdate(req.params.id, { $set: req.body }, (error, data) => {
    res.json(data)
  })
})

// Delete one record
router.delete(`/products/:id`, (req, res) => {
  productsModel.findByIdAndRemove(req.params.id, (error, data) => {
    res.json(data)
  })
})

// Add new record
router.post(`/products`, (req, res) => {
  productsModel.create(req.body, (error, data) => {
    res.json(data)
  })
})

// Get photos for product
router.get(`/products/photo/:filename`, (req, res) => {
  fs.readFile(`${process.env.UPLOADED_FILES_FOLDER}/${req.params.filename}`, 'base64', (err, fileData) => {
    if (fileData) {
      res.json({ image: fileData })
    }
    else {
      res.json({ image: null })
    }
  })
})

module.exports = router
