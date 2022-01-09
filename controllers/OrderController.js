const Order = require("../models/Order");

exports.newOrder = async (req,res,next)=>{
    try {
        const order = new Order(req.body);
        await order.save();

        res.json({message: "Added"});
    } catch (error) {
        res.json({error: "Error while adding the order"})
    }
}

exports.allOrders = async (req,res,next)=>{
    try {
        const orders = await Order.find()
        .populate("client")
        .populate({
            path: "products.product",
            model: "Product"
        });
        res.json(orders);
    } catch (error) {
        res.json({error: "Error while querying orders"})
    }
}

exports.orderByID = async (req,res,next)=>{
    try {
        const {idOrder} = req.params;
        const order = await Order.findById(idOrder)
        .populate("client")
        .populate({
            path: "products.product",
            model: "Product"
        });
        if(order){
            res.json(order);
            return next();
        }
        res.json({error: "The order doesn't exist"});
    } catch (error) {
        res.json({error: "The order doesn't exist"});
    }
}

exports.updateOrder = async (req,res,next)=>{
    try {
        const {idOrder} = req.params;
        const order = await Order.findByIdAndUpdate(idOrder, req.body, {new:true})
        .populate("client")
        .populate({
            path: "products.product",
            model: "Product"
        });
        res.json(order);

    } catch (error) {
        res.json({error: "The order doesn't exist"});
    }
}

exports.deleteOrder = async (req,res,next)=>{
    try {
        const {idOrder} = req.params;
        const order = await Order.findOneAndDelete(idOrder);
        if(order){
            res.json({message: "Deleted"})
        }
    } catch (error) {
        res.json({error: "The order doesn't exist"});
    }
}