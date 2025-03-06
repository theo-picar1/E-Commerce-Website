const router = require(`express`).Router()

const productsModel = require(`../models/products`)

const multer = require("multer")
var upload = multer({ dest: `${process.env.UPLOADED_FILES_FOLDER}` })

const jwt = require('jsonwebtoken')

const fs = require('fs')
const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILENAME, 'utf8')

// read all records
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

// Read one record
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

// Update one record
router.put(`/products/:id`, (req, res, next) => {
  jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, { algorithm: "HS256" }, (err, decodedToken) => {
    if (err) {
      return next(createError(401))
    }
    else {
      if (decodedToken.accessLevel >= process.env.ACCESS_LEVEL_ADMIN) {
        productsModel.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          (err, data) => {
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
      return next(createError(401))
    }
    else {
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
