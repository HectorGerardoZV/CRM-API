const mongoose = require("mongoose");

const Client = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    company: {
        type: String,
        trim :true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true
    },
    phoneNumber: {
        type: String,
        trim: true
    }
});

module.exports = mongoose.model("Client", Client)

