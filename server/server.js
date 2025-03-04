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

// Error Handling
const createError = require("http-errors")
app.use((req, res, next) => next(createError(404)))
app.use((err, req, res, next) => {
  console.error(err.message)
  if (!err.statusCode) {
    err.statusCode = 500
  }
  if (err instanceof ReferenceError) {
    err.statusCode = 400
    err.message =
      "Cannot reference a variable that has not been declared. This can be caused in run-time if the user did not input a parameter that is required by a router"
  }
  res.status(err.statusCode).send(err.message)
})
