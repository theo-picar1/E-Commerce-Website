// Server-side global variables
require(`dotenv`).config({ path: `./config/.env` })
require(`./config/db`)

// Express
const express = require(`express`)
const app = express()

// Middleware
app.use(require(`body-parser`).json())
app.use(require(`cors`)({ credentials: true, origin: process.env.LOCAL_HOST }))

// Routers
app.use(require(`./routes/products`))
app.use(require(`./routes/users`))

// Port
app.listen(process.env.SERVER_PORT, () => {
  console.log(`Connected to port ` + process.env.SERVER_PORT)
})

// New route for testing
app.post("/users/cart", (req, res) => {
  console.log("hello") // Log "hello" when a POST request is received
  res.send("Received POST request") // Send a response
})

// Error Handling
const createError = require("http-errors")
app.use((req, res, next) => next(createError(404))) // Handles 404 errors
app.use((err, req, res, next) => {
  console.error(err.message)
  if (!err.statusCode) {
    err.statusCode = 500
  }
  res.status(err.statusCode).send(err.message) // Handles other errors
})
