const router = require(`express`).Router()
const usersModel = require(`../models/users`)
const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken")
const fs = require("fs")
// Purely for security reasons. Instead of the actual key in the env file, we read (fs) the filename of JWT_PRIVATE_KEY_FILENAME
const JWT_PRIVATE_KEY = fs.readFileSync(
  process.env.JWT_PRIVATE_KEY_FILENAME,
  "utf8"
)

// Error handling
// All error handling was from https://derek.comp.dkit.ie/ at Full Stack Development/Error Handling
const createError = require("http-errors")

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

// Get one user
router.get(`/users/:id`, (req, res, next) => {
  usersModel.findById(req.params.id, (err, data) => {
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

// In Derek's example, a token is created in here because they are automatically logged in after registering
// In ours, the user is redirected to the Login page instead
router.post(`/users/register`, (req, res, next) => {
  usersModel.findOne({ email: req.body.email }, (err, data) => {
    if (err) {
      return next(err)
    }
    if (data) {
      res.json({ errorMessage: `User already exists` })
    }
    else {
      // Hashes the user's password for security purposes
      bcrypt.hash(req.body.password, parseInt(process.env.SALT_ROUNDS), (err, hash) => {
        // password is now the hashed value when creating the user
        usersModel.create({ ...req.body, password: hash }, (error, data) => {
          if (!data) {
            res.json({ errorMessage: "User creation failed." })
          }

          // password is now the hashed value when creating the user
          usersModel.create({ ...req.body, password: hash }, (error, data) => {
            if (!data) {
              res.json({ errorMessage: "User creation failed." })
            }

            res.json({ name: data.firstName })
          })
        }
        )
      })
    }
  })
})

// Similar to register function above. Only difference is that we assign an access 
router.post(`/users/register/checkout`, (req, res, next) => {
  usersModel.findOne({ email: req.body.email }, (err, data) => {
    if (err) {
      return next(err)
    }
    if (data) {
      res.json({ errorMessage: `User already exists` })
    }
    else {
      // Hashes the user's password for security purposes
      bcrypt.hash(req.body.password, parseInt(process.env.SALT_ROUNDS), (err, hash) => {
        // password is now the hashed value when creating the user
        usersModel.create({ ...req.body, password: hash }, (error, data) => {
          if (!data) {
            res.json({ errorMessage: "User creation failed." })
          }

          // password is now the hashed value when creating the user
          usersModel.create({ ...req.body, password: hash }, (error, data) => {
            if (!data) {
              res.json({ errorMessage: "User creation failed." })
            }

            res.json({ name: data.firstName })
          })
        }
        )
      })
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
      // In here, we compare the hashed value of the given password to the hashed password of the email the user is logging into
      // The hashed value will be equal to each other if the passwords are also the same
      bcrypt.compare(req.params.password, data.password, (err, result) => {
        if (err) {
          return next(err)
        }
        if (result) {
          // This is where the token is created. The user's email and accessLevel is found inside the token
          const token = jwt.sign({ email: data.email, accessLevel: data.accessLevel }, JWT_PRIVATE_KEY, { algorithm: "HS256", expiresIn: process.env.JWT_EXPIRY })

          res.json({
            _id: data._id,
            accessFirstName: data.firstName,
            accessSecondName: data.secondName,
            email: data.email,
            accessLevel: process.env.ACCESS_LEVEL_USER,
            token: token,
          })
        } else {
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
router.post("/users/cart", (req, res, next) => {
  // get user id and product from body
  const { userId, product } = req.body

  // check if user id and product are valid
  if (!product || !product._id) {
    res.json({ errorMessage: "Invalid product data" })
    return next(createError(400))
  }

  // find user by id
  usersModel.findById(userId, (findError, userData) => {
    // if user not found or error, return error
    if (findError || !userData) {
      res.json({ errorMessage: "User not found" })
      return next(createError(404))
    }

    // add product to user's cart
    userData.cart.push(product)

    // save user to database
    userData.save((saveError, updatedUser) => {
      if (saveError) {
        res.json({ errorMessage: "Failed to update cart" })
        return next(createError(500))
      }

      // return updated user
      res.json(updatedUser)
    })
  })
})

// Remove product from user's cart
router.delete("/users/cart", (req, res, next) => {
  // get user id and product from body
  const { userId, product } = req.body

  // check if user id and product are valid
  if (!userId || !product.name) {
    res.json({ errorMessage: "Missing userId or productName" })
    return next(createError(400))
  }

  // find user by id
  usersModel.findById(userId, (findError, userData) => {
    if (findError || !userData) {
      res.json({ errorMessage: "User not found" })
      return next(createError(404))
    }

    // remove product from user's cart
    const productIndex = userData.cart.findIndex(
      (item) => item.name === product.name
    )

    // if product not found in cart, return error
    if (productIndex === -1) {
      res.json({ errorMessage: "Product not found in cart" })
      return next(createError(404))
    }

    // remove product from cart
    userData.cart.splice(productIndex, 1)

    // save user to database
    userData.save((saveError, updatedUser) => {
      if (saveError) {
        res.json({ errorMessage: "Failed to update cart" })
        return next(createError(500))
      }

      // return updated user
      res.json(updatedUser)
    })
  })
})

// User logout
router.post(`/users/logout`, (req, res) => {
  res.json({})
})

module.exports = router
