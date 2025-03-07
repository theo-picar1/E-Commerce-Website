const router = require(`express`).Router()

const productsModel = require(`../models/products`)

const multer = require("multer")
// Broken. If time, will fix
var upload = multer({ dest: `${process.env.UPLOADED_FILES_FOLDER}` })

const jwt = require('jsonwebtoken')

const fs = require('fs')
const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILENAME, 'utf8')
const createError = require("http-errors")

// Read all records. This is the "fetch" method
router.get(`/products`, (req, res, next) => {
  productsModel.find((err, data) => {
    if (err) {
      return next(err)
    }

    if (!data) {
      return next(createError(401))
    }

    res.json(data)
  })
})

// Read one record. Used in EditProduct.js
router.get(`/products/:id`, (req, res, next) => {
  productsModel.findById(req.params.id, (err, data) => {
    if (err) {
      return next(err)
    }

    if (!data) {
      return next(createError(401))
    }

    res.json(data)
  })
})

// Update one record. Used in EditProduct.js
router.put(`/products/:id`, (req, res, next) => {
  // This is where the headers bit comes into play from the axios side, where authorisaton is the token found in localStorage
  // Refer to users.js in users/login where the token is created
  jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, { algorithm: "HS256" }, (err, decodedToken) => {
    if (err) {
      return next(createError(401))
    }
    else {
      // This is where the token comes into play. We also do accessLevel checking in the server as client is not enough
      // When the user changes their access level in the console, they still can't do anything an admin can do as they don't have the right token
      if (decodedToken.accessLevel >= process.env.ACCESS_LEVEL_ADMIN) {
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
    }
  })
})

// Delete one record
router.delete(`/products/:id`, (req, res, next) => {
  jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, { algorithm: "HS256" }, (err, decodedToken) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return next(createError(401, 'Token has expired'));
      }

      return next(createError(401))
    }
    else {
      // Refer to router.put for explanation
      if (decodedToken.accessLevel >= process.env.ACCESS_LEVEL_ADMIN) {
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
    }
  })
})

// Add new record
router.post(`/products`, (req, res, next) => {
  jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, { algorithm: "HS256" }, (err, decodedToken) => {
    if (err) {
      return next(createError(401))
    }
    else {
      // Refer to router.put for explanation
      if (decodedToken.accessLevel >= process.env.ACCESS_LEVEL_ADMIN) {
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
    }
  })
})

// // Get photos for product
// router.get(`/products/photo/:filename`, (req, res, next) => {
//   fs.readFile(
//     `${process.env.UPLOADED_FILES_FOLDER}/${req.params.filename}`,
//     "base64",
//     (err, fileData) => {
//       if (err) {
//         return next(err)
//       }

//       if (!data) {
//         return next(createError(401))
//       }

//       if (fileData) {
//         res.json({ image: fileData })
//       } else {
//         res.json({ image: null })
//       }
//     }
//   )
// })

module.exports = router
