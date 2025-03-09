const router = require(`express`).Router()

const productsModel = require(`../models/products`)

const multer = require("multer")
// Broken. If time, will fix
var upload = multer({ dest: `${process.env.UPLOADED_FILES_FOLDER}` })

const jwt = require('jsonwebtoken')

const fs = require('fs')
const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILENAME, 'utf8')
const createError = require("http-errors")

// For verifying that the user currently has (or doesnt have) is valid. For admin privileges such as add, edit and delete
const checkIfTokenIsValid = (req, res, next) => {
  // This is where the headers bit comes into play from the axios side, where authorisaton is the token found in localStorage
  // Refer to users.js in users/login where the token is created
  jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, { algorithm: "HS256" }, (err, decodedToken) => {
    if (err) {
      return next(createError(401))
    }

    req.decodedToken = decodedToken
    next()
  })
}

// Checks to see if the user doing add, edit or delete function has the proper access level to do so
const checkTokenAccessLevel = (req, res, next) => {
  // This is where the token comes into play. We also do accessLevel checking in the server as client is not enough
  // When the user changes their access level in the console, they still can't do anything an admin can do as they don't have the right token
  if (req.decodedToken.accessLevel >= process.env.ACCESS_LEVEL_ADMIN) {
    return next()
  }
  return next(createError(403, 'You are not authorised to use this functionality!'))
}

// Get all products
const getAllProducts = (req, res, next) => {
  productsModel.find((err, data) => {
    if (err) {
      return next(err)
    }

    if (!data) {
      return next(createError(401))
    }

    res.json(data)
  })
}

// Find and return product with matching id. For editing
const findProductById = (req, res, next) => {
  productsModel.findById(req.params.id, (err, data) => {
    if (err) {
      return next(err)
    }

    if (!data) {
      return next(createError(401))
    }

    res.json(data)
  })
}

// Find a product by the passed in id and update with the passed in body
const findProductByIdAndUpdate = (req, res, next) => {
  // $set is to prevent removing any fields that user did not decide to edit or put values in the
  // eg. If only price was edited, everything the same except for price
  productsModel.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, data) => {
    if (err) {
      return next(err)
    }

    if (!data) {
      return next(createError(401))
    }

    res.json(data)
  }
  )
}

// Find a product by the passed in id and delete it
const findProductByIdAndDelete = (req, res, next) => {
  productsModel.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) {
      return next(err)
    }

    if (!data) {
      return next(createError(401))
    }

    res.json(data)
  })
}

// Add a new product tothe productsModel database
const addNewProduct = (req, res, next) => {
  productsModel.create(req.body, (err, data) => {
    if (err) {
      return next(err)
    }

    if (!data) {
      return next(createError(401))
    }

    res.json(data)
  })
}

// Read all records. This is the "fetch" method
router.get(`/products`, getAllProducts)

// Read one record. Used in EditProduct.js
router.get(`/products/:id`, findProductById)

// Update one record. Used in EditProduct.js
router.put(`/products/:id`, checkIfTokenIsValid, checkTokenAccessLevel, findProductByIdAndUpdate)

// Delete one record
router.delete(`/products/:id`, checkIfTokenIsValid, checkTokenAccessLevel, findProductByIdAndDelete)

// Add new record
router.post(`/products`, checkIfTokenIsValid, checkTokenAccessLevel, addNewProduct)

module.exports = router
