const mongoose = require("mongoose");

const User = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    name: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true
    }
});


module.exports = mongoose.model("User",User);