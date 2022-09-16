const mongoose = require("mongoose")

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    code: {
        type: Number,
        required: true
    },
    expiresIn: {
        type: Number
    }
})

module.exports = mongoose.model("otpDatabase", otpSchema)