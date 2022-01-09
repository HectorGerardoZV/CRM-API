const Product = require("../models/Product");
const helpers = require("./helpers/productHelper");
exports.newProduct = async (req,res,next)=>{
    try {
        let data = {
            errors: [],
            valid: false
        };
        if(req.files){
            data = helpers.validationImage(req);
            if(data.valid){
                const name = helpers.imageName(req);
                if(name!=="void"){
                    data = helpers.uploadImage(req,name);
                    if(data.valid){
                        const product = new Product(req.body);
                        product.image = name;
                        
                        const saved = await product.save();
                        if(saved){
                            res.json({message: "Added"});
                            return next();
                        }else{
                            data.errors.push("Error while adding the product");
                        }
                    }
                }else{
                    data.errors.push("Error while generating the image name");
                }
            }
        }else{
            data.errors.push("Error all fields are required");
        }
        res.json({error: data.errors});
        
    } catch (error) {
        res.json({error: "Error while adding the product"})
    }
    next();
}

exports.allProducts = async(req,res,next)=>{
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.json({error: "Error while querying products"});
    }
}

exports.productByID = async(req,res,next)=>{
    try {
        const {idProduct} = req.params;
        const product = await Product.findById(idProduct);
        if(product){
            res.json(product);
        }else{
            res.json({error: "The product doesn't exist"});
        }
    } catch (error) {
        res.json({error: "Error while querying the product"});
    }
}

exports.updateProduct = async(req,res,next)=>{
    try {
        const {idProduct} = req.params;
        const product = req.body;
        
        let data = {
            errors: [],
            valid: false
        };
        if(req.files){
            data = helpers.validationImage(req);
            if(data.valid){
                const name = helpers.imageName(req);
                if(name!=="void"){
                    data = helpers.uploadImage(req,name);
                    if(data.valid){
                        const productOBJ = await Product.findById(idProduct);
                        data = helpers.deleteImage(productOBJ.image);
                        if(data.valid){
                            product.image = name;
                        }
                    }
                }else{
                    data.errors.push("Error while generating the image name");
                }
            }
        }

        const newProduct = await Product.findByIdAndUpdate(idProduct,product,{new:true});

        if(newProduct){
            res.json({message: "Updated"});
            return next();
        }

        res.json({error:data.errors});
            
    } catch (error) {
        res.json({error: "Error while querying the product"});
    }
}

exports.deleteProduct = async(req,res,next)=>{
    try {
        const {idProduct} = req.params;
        let product = await Product.findById(idProduct);
        let data = helpers.deleteImage(product.image);
        if(data.valid){
            const product = await Product.findByIdAndDelete(idProduct);
            if(product){
                res.json({message: "Deleted"});
                return next();
            }else{
               data.errors.push("Error while deleting the product");
            }
        }
        res.json({error: data.errors});
        
    } catch (error) {
        
    }
}

exports.searchProducts = async(req,res,next)=>{
    try {
        
        const {query} = req.params;

        const product = await Product.findOne({name: new RegExp(query,"i")});

        res.json(product);
    } catch (error) {
        console.log({error: "Error while querying the product"});
        next();
    }
}