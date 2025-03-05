const router = require(`express`).Router()
const usersModel = require(`../models/users`)
const bcrypt = require("bcryptjs")

const jwt = require('jsonwebtoken')
const fs = require('fs')
const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILENAME, 'utf8')

// Get all users
router.get(`/users`, (req, res, next) => {
  usersModel.find((err, data) => {
    if (err) {
      return next(err)
    }

    if (!data) {
      return next(createError(401))
    }
    res.json(data)
  })
})

// Reset user collection (for testing purposes)
router.post(`/users/reset_user_collection`, (req, res, next) => {
  usersModel.deleteMany({}, (err, data) => {
    if (err) {
      return next(err)
    }
    if (data) {
      const adminPassword = `123!"£qweQWE`
      bcrypt.hash(
        adminPassword,
        parseInt(process.env.SALT_ROUNDS),
        (err, hash) => {
          usersModel.create(
            { name: "Administrator", email: "admin@admin.com", password: hash },
            (createError, createData) => {
              if (createData) {
                res.json(createData)
              } else {
                res.json({
                  errorMessage: `Failed to create Admin user for testing purposes`,
                })
              }
            }
          )
        }
      )
    } else {
      res.json({ errorMessage: `User is not logged in` })
      return next(createError(401))
    }
  })
})

router.post(`/users/register`, (req, res, next) => {
  usersModel.findOne({ email: req.body.email }, (uniqueErr, uniqueData) => {
    if (uniqueErr) {
      return next(err)
    }
    if (uniqueData) {
      res.json({ errorMessage: `User already exists` })
    } else {
      bcrypt.hash(req.body.password, parseInt(process.env.SALT_ROUNDS), (err, hash) => {
          console.log("Request body:", req.body)
          usersModel.create({ ...req.body, password: hash }, (error, data) => {
            if (!data) {
              console.error("User creation returned null data.")
              res.json({ errorMessage: "User creation failed." })
            }
            const token = jwt.sign({email: data.email, accessLevel:data.accessLevel}, JWT_PRIVATE_KEY, {algorithm: 'HS256', expiresIn:process.env.JWT_EXPIRY})     

            res.json({ name: data.firstName, token: token })
          })
        }
      )
    }
  })
})

// User login
router.post(`/users/login/:email/:password`, (req, res, next) => {
  usersModel.findOne({ email: req.params.email }, (err, data) => {
    if (err) {
      return next(err)
    }
    if (data) {
      bcrypt.compare(req.params.password, data.password, (err, result) => {
        if (err) {
          return next(err)
        }
        if (result) {
          res.json({
            _id: data._id,
            name: data.firstName,
            accessName: data.firstName + " " + data.secondName,
            accessLevel: process.env.ACCESS_LEVEL_USER,
          })
        } else {
          res.json({ errorMessage: `Incorrect password` })
          return next(createError(401))
        }
      })
    } else {
      res.json({ errorMessage: `Email has not been registered yet` })
      return next(createError(401))
    }
  })
})

// Add product to user's cart
router.post("/users/cart", (req, res) => {
  const { userId, product } = req.body

  if (!product || !product._id) {
    return res.status(400).json({ errorMessage: "Invalid product data" })
  }

  usersModel.findById(userId, (findError, userData) => {
    if (findError || !userData) {
      return res.status(404).json({ errorMessage: "User not found" })
    }

    userData.cart.push(product)

    userData.save((saveError, updatedUser) => {
      if (saveError) {
        return res.status(500).json({ errorMessage: "Failed to update cart" })
      }

      res.json(updatedUser)
    })
  })
})

// Remove product from user's cart
router.delete("/users/cart", (req, res) => {
  const { userId, product } = req.body

  if (!userId || !product.name) {
    return res
      .status(400)
      .json({ errorMessage: "Missing userId or productName" })
  }

  usersModel.findById(userId, (findError, userData) => {
    if (findError || !userData) {
      return res.status(404).json({ errorMessage: "User not found" })
    }

    const productIndex = userData.cart.findIndex(
      (item) => item.name === product.name
    )

    if (productIndex === -1) {
      return res.status(404).json({ errorMessage: "Product not found in cart" })
    }

    userData.cart.splice(productIndex, 1)

    userData.save((saveError, updatedUser) => {
      if (saveError) {
        return res.status(500).json({ errorMessage: "Failed to update cart" })
      }

      res.json(updatedUser)
    })
  })
})

// User logout
router.post(`/users/logout`, (req, res) => {
  res.json({})
})

module.exports = router
