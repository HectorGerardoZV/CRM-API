const mongoose = require("mongoose");
const Product = new mongoose.Schema({
    name:{
        type: String,
        trim: true
    },
    price: {
        type: Number
    },
    image: {
        type: String
    }
});


module.exports = mongoose.model("Product", Product);