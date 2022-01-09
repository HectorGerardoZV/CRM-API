const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.createAccount = async (req,res,next)=>{
    try {
        const user = new User(req.body);
        user.password = await bcrypt.hash(user.password,12);
        await user.save();
        res.json({message: "User added"});
    } catch (error) {
        console.log(error);
        res.json({error: "Error while creating account"});
    }
}

exports.signIn = async(req,res,next)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(!user){
            res.status(401).json({error: "Invalid credentials"});
            return next();
        }else{
            if(bcrypt.compareSync(password, user.password)){
                const token = jwt.sign({
                    email: user.email,
                    name: user.name,
                    id: user._id
                },"superSecret",
                {
                    expiresIn: "1h"
                }
                );
                res.json({token});


            }else{
                res.status(401).json({error: "Invalid credentials"});
                return next();
            }
        }


    } catch (error) {
        next();
    }
}