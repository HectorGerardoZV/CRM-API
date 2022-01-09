const shortid = require("shortid");
const fs = require("fs");

exports.validationImage = (req)=>{
    const image = req.files.image;
    const ex = image.mimetype.split("/")[1];   
    let data = {
        errors: [],
        valid: false
    };
    if(ex!== "png" && ex!== "jpeg"){
       data.errors.push("Invalid formate");
    }
    if(image.size<0 || image.size>100000){
        data.errors.push("Invalid size");
    }

    if(data.errors.length===0){
        data.valid = true;
    }
    return data;
}

exports.uploadImage = (req,name)=>{
    let data = {
        errors: [],
        valid: false
    };
    const image = req.files.image;
        image.mv(__dirname+"../../../uploads/"+name,function(error){
            if(error){
                data.errors.push("Error while uploading the image");
            }
        });
        if(data.errors.length===0){
            data.valid=true;
        }
    
    return data;
}

exports.deleteImage= (name)=>{
    let data = {
        errors: [],
        valid: false
    };
    fs.unlink(__dirname+"../../../uploads/"+name,function(error){
        if(error){
            data.errors.push("Error while deleting the image");
        }
    })
    if(data.errors.length===0){
        data.valid=true;
    }
    return data;
}

exports.imageName = (req)=>{
    
    if(req.files){
        const image = req.files.image;
        const ex = image.mimetype.split("/")[1];
        const name = shortid.generate()+"."+ex;
        return name;
    }
    return "Void";
    
}