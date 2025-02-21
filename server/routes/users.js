const router = require(`express`).Router()

const usersModel = require(`../models/users`)

const bcrypt = require('bcryptjs')

router.get(`/users`, (req, res) => {
    usersModel.find((error, data) => {
        res.json(data)
    })
})

router.post(`/users/reset_user_collection`, (req, res) => {
    usersModel.deleteMany({}, (error, data) => {
        if (data) {
            const adminPassword = `123!"£qweQWE`
            bcrypt.hash(adminPassword, parseInt(process.env.SALT_ROUNDS), (err, hash) => {
                usersModel.create({ name: "Administrator", email: "admin@admin.com", password: hash }, (createError, createData) => {
                    if (createData) {
                        res.json(createData)
                    }
                    else {
                        res.json({ errorMessage: `Failed to create Admin user for testing purposes` })
                    }
                })
            })
        }
        else {
            res.json({ errorMessage: `User is not logged in` })
        }
    })
})

router.post(`/users/register/:name/:email/:password`, (req, res) => {
    usersModel.findOne({ email: req.params.email }, (uniqueError, uniqueData) => {

        if (uniqueData) {
            res.json({ errorMessage: `User already exists` })
        }
        else {
            bcrypt.hash(req.params.password, parseInt(process.env.SALT_ROUNDS), (err, hash) => {
                usersModel.create({ name: req.params.name, email: req.params.email, password: hash }, (error, data) => {
                    if (data) {
                        res.json({ name: data.name })
                    }
                    else {
                        res.json({ errorMessage: `User was not registered` })
                    }
                })
            })
        }
    })
})

router.post(`/users/login/:email/:password`, (req, res) => {
    usersModel.findOne({ email: req.params.email }, (error, data) => {
        if (data) {
            bcrypt.compare(req.params.password, data.password, (err, result) => {
                if (result) {
                    res.json({ 
                        name: data.name, 
                        accessName: "USER",
                        accessLevel: 1
                    })
                }
                else {
                    res.json({ errorMessage: `Incorrect password` })
                }
            })
        }
        else {
            res.json({ errorMessage: `Email has not been registered yet` })
        }
    })
})


router.post(`/users/logout`, (req, res) => {
    res.json({})
})

module.exports = router