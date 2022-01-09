const mongoose = require("mongoose");
const Order = new mongoose.Schema({

    client: {
        type: mongoose.Schema.ObjectId,
        ref: "Client"
    },
    products: [{
        product: {
            type: mongoose.Schema.ObjectId,
            ref: "Product"
        },
        quantity: Number
    }],
    total:{
        type: Number
    }
});

module.exports = mongoose.model("Order",Order);