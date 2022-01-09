const express = require("express");
const mongoose = require("mongoose");
const router = require("./router/router");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const cors = require("cors");
const app = express();
app.use(fileupload());
/**
 * Adding mongoose and connecting with the database
 */
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/restapis",{
    useNewUrlParser: true
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Adding cors

app.use(cors());


app.use(express.static("uploads"));

/**
 * Adding the router
 */
app.use("/",router);

/**
 * Starting server
 */
app.listen(5000, ()=>{
    console.log("The server is runing in port: "+5000)
})