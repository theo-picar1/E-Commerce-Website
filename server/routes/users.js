const router = require(`express`).Router()
const usersModel = require(`../models/users`)
const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken")
const fs = require("fs")
// Purely for security reasons. Instead of the actual key in the env file, we read (fs) the filename of JWT_PRIVATE_KEY_FILENAME
const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILENAME, "utf8")

// All error handling was from https://derek.comp.dkit.ie/ at Full Stack Development/Error Handling
const createError = require("http-errors")

// Get all users
const getAllUsers = (req, res, next) => {
  usersModel.find((err, data) => {
    if (err) {
      return next(err)
    }

    if (!data) {
      return next(createError(401))
    }
    res.json(data)
  })
}

// Get one user by id
const getOneUser = (req, res, next) => {
  usersModel.findById(req.params.id, (err, data) => {
    if (err) {
      return next(err)
    }

    if (!data) {
      return next(createError(401))
    }

    res.json(data)
  })
}

// Reset user collection (for testing purposes and not actually used)
router.post(`/users/reset_user_collection`, (req, res, next) => {
  usersModel.deleteMany({}, (err, data) => {
    if (err) {
      return next(err)
    }
    if (data) {
      const adminPassword = `123!"£qweQWE`
      bcrypt.hash(adminPassword, parseInt(process.env.SALT_ROUNDS), (err, hash) => {
        usersModel.create({ name: "Administrator", email: "admin@admin.com", password: hash }, (createError, createData) => {
          if (createData) {
            res.json(createData)
          }
          else {
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

// Check if user already exists for registering a user
const checkUserExistsForRegister = (req, res, next) => {
  usersModel.findOne({ email: req.body.email }, (err, data) => {
    if (err) {
      return next(err)
    }
    if (data) {
      return res.json({ errorMessage: `User already exists` })
    }

    next()
  })
}

// Hash user's password. Mainly for registering
const hashPassword = (req, res, next) => {
  bcrypt.hash(req.body.password, parseInt(process.env.SALT_ROUNDS), (err, hash) => {
    if (err) {
      return next(err)
    }
    req.hashedPassword = hash
    next()
  })
}

const createNewUser = (req, res, next) => {
  usersModel.create({ ...req.body, password: req.hashedPassword }, (error, data) => {
    if (error || !data) {
      return res.json({ errorMessage: "User creation failed." })
    }
    res.json({ name: data.firstName })
  })
}

// Find user by email. Mainly for logging in
const findUserByEmail = (req, res, next) => {
  usersModel.findOne({ email: req.params.email }, (err, data) => {
    if (err) {
      return next(err)
    }
    if (!data) {
      res.json({ errorMessage: `Email has not been registered yet` })
      return next(createError(401))
    }
    // For next middleware to use because data would not be defined in middleware below
    req.user = data
    next()
  })
}

// Compare the values of two hashed passwords for logging in
const compareHashedPasswords = (req, res, next) => {
  bcrypt.compare(req.params.password, req.user.password, (err, result) => {
    if (err) {
      return next(err)
    }
    if (!result) {
      return next(createError(401))
    }
    next()
  })
}

// For creating the token when the user successfully logs in
const createTokenAndSendBackDetails = (req, res) => {
  const token = jwt.sign({ email: req.user.email, accessLevel: req.user.accessLevel }, JWT_PRIVATE_KEY, { algorithm: "HS256", expiresIn: process.env.JWT_EXPIRY }
  )

  res.json({
    _id: req.user._id,
    accessFirstName: req.user.firstName,
    accessSecondName: req.user.secondName,
    email: req.user.email,
    accessLevel: process.env.ACCESS_LEVEL_USER,
    token: token,
  })
}

// Checks to see if user id and product are valid
const validateProducts = (req, res, next) => {
  // get user id and product from body
  const { product } = req.body

  // check if user id and product are valid
  if (!product || !product._id) {
    res.json({ errorMessage: "Invalid product data" })
    return next(createError(400))
  }

  next()
}

// Used to find a user by id. Mainly for the shopping cart
const findUserByIdForCart = (req, res, next) => {
  const { userId } = req.body

  // find user by id
  usersModel.findById(userId, (findError, userData) => {
    // if user not found or error, return error
    if (findError || !userData) {
      res.json({ errorMessage: "User not found" })
      return next(createError(404))
    }

    req.user = userData
    next()
  })
}

// For adding passed product to matching user's cart
const addProductToCart = (req, res, next) => {
  const { product } = req.body

  // add product to user's cart
  req.user.cart.push(product)

  // save user to database
  req.user.save((saveError, updatedUser) => {
    if (saveError) {
      res.json({ errorMessage: "Failed to update cart" })
      return next(createError(500))
    }

    // return updated user
    res.json(updatedUser)
  })
}

// Same logic but we're deleting a product from the mathcing user's cart
const deleteProductFromCart = (req, res, next) => {
  const { product } = req.body

  // remove product from user's cart
  const productIndex = req.user.cart.findIndex(
    (item) => item.name === product.name
  )

  // if product not found in cart, return error
  if (productIndex === -1) {
    res.json({ errorMessage: "Product not found in cart" })
    return next(createError(404))
  }

  // remove product from cart
  req.user.cart.splice(productIndex, 1)

  // save user to database
  req.user.save((saveError, updatedUser) => {
    if (saveError) {
      res.json({ errorMessage: "Failed to update cart" })
      return next(createError(500))
    }

    // return updated user
    res.json(updatedUser)
  })
}

// User logout
const logout = (req, res) => {
  res.json({})
}

// Get all users
router.get(`/users`, getAllUsers)

// Get one user
router.get(`/users/:id`, getOneUser)

// Register function
router.post(`/users/register`, checkUserExistsForRegister, hashPassword, createNewUser)

// Login function
router.post(`/users/login/:email/:password`, findUserByEmail, compareHashedPasswords, createTokenAndSendBackDetails)

// Add product to user's cart
router.post("/users/cart", validateProducts, findUserByIdForCart, addProductToCart)

// Delete a product from the user's cart
router.delete("/users/cart", validateProducts, findUserByIdForCart, deleteProductFromCart)

// User logout
router.post(`/users/logout`, logout)

module.exports = router
