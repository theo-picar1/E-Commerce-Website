const router = require(`express`).Router()
const usersModel = require(`../models/users`)
const bcrypt = require("bcryptjs")

// Get all users
router.get(`/users`, (req, res) => {
  usersModel.find((error, data) => {
    res.json(data)
  })
})

// Reset user collection (for testing purposes)
router.post(`/users/reset_user_collection`, (req, res) => {
  usersModel.deleteMany({}, (error, data) => {
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
    }
  })
})

router.post(`/users/register`, (req, res) => {
    usersModel.findOne({ email: req.body.email }, (uniqueError, uniqueData) => {
        if (uniqueData) {
            res.json({ errorMessage: `User already exists` })
        }
        else {
            bcrypt.hash(req.body.password, parseInt(process.env.SALT_ROUNDS), (err, hash) => {
                console.log("Request body:", req.body);
                usersModel.create({...req.body, password: hash }, (error, data) => {
                    if (error) {
                        console.error("MongoDB Error:", error);
                        return res.json({ errorMessage: "MongoDB error. User not created." });
                    }
                    if (!data) {
                        console.error("User creation returned null data.");
                        return res.json({ errorMessage: "User creation failed." });
                    }
                    res.json({ name: data.firstName });
                })
            })
        }
    })
})

// User login
router.post(`/users/login/:email/:password`, (req, res) => {
  usersModel.findOne({ email: req.params.email }, (error, data) => {
    if (data) {
      bcrypt.compare(req.params.password, data.password, (err, result) => {
        if (result) {
          res.json({
            _id: data._id,
            name: data.name,
            accessName: "USER",
            accessLevel: 1,
          })
        } else {
          res.json({ errorMessage: `Incorrect password` })
        }
      })
    } else {
      res.json({ errorMessage: `Email has not been registered yet` })
    }
  })
})

// Add product to user's cart
router.post("/users/cart", (req, res) => {
  const { userId, product } = req.body

  if (!product || !product._id) {
    return res.json({ errorMessage: "Invalid product data" })
  }
  

  usersModel.findById(userId, (findError, userData) => {
    if (findError || !userData) {
      return res.json({ errorMessage: "User not found" })
    }

    userData.cart.push(product)

    userData.save((saveError, updatedUser) => {
      if (saveError) {
        return res.json({ errorMessage: "Failed to update cart" })
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
