const Client = require("../models/Client");

exports.newClient = async (req,res,next)=>{
    try {
        const client = new Client(req.body);
        await client.save();
        res.json({message: "Added"});
    } catch (error) {
        res.json({error: "The client couldn't be added"});
    }
    next();
}

exports.allClients = async (req,res,next)=>{
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (error) {
        res.json({error: "Error while querying clients"});
    }
    next();
}

exports.clientByID = async (req,res,next)=>{
    try {
        const {idClient} = req.params;
        const client = await Client.findById(idClient);
        if(client){
            res.json(client);
        }else{
            res.json({error: "The client doesn't exist"});
        }
    } catch (error) {
        res.json({error: "Error while querying the client"});
    }
    next();
}

exports.updateClient = async (req,res,next)=>{
    try {
        const {idClient} = req.params;
        const info = req.body;
        const client = await Client.findByIdAndUpdate(idClient,info,{new:true});

        if(client){
            res.json(client);
        }else{
            res.json({error: "The client doesn't exist"});
        }
    } catch (error) {
        res.json({error: "Error while updating the client"});
    }
    next();
}

exports.deleteClient = async(req,res,next)=>{
    try {
        const {idClient} = req.params;
        const client = await Client.findByIdAndDelete(idClient);
        if(client){
            res.json({message: "Deleted"});
        }else{
            res.json({error: "The client doesn't exist"});
        }
    } catch (error) {
        res.json({error: "Error while deleting the client"});
    }
}