const mongoose = require(`mongoose`)

let usersSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        secondName: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        houseAddress: { type: String, default: "" },
        telephoneNo: { type: String, required: true},
        accessLevel: { type: Number, default: parseInt(process.env.ACCESS_LEVEL_USER) },
        profilePhotoFilename: { type: String, default: "" }
    },
    {
        collection: `users`
    })

module.exports = mongoose.model(`users`, usersSchema)