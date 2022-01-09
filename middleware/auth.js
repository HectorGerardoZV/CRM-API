const jwt = require("jsonwebtoken");
module.exports = (req,res,next)=>{
    
    try {
        const authHeader = req.get("Authorization");
        if(!authHeader){
            const error = new Error("The user isn't authenticatedd");
            error.statusCode = 401;
            throw error;
        }else{
            const token = authHeader.split(" ")[1];
            let checkToken;
            try {
                checkToken = jwt.verify(token, "superSecret");
            } catch (error) {
                error.statusCode =500;
                throw error;
            }

            if(!checkToken){
                const error = new Error("The user ins't authenticated");
                error.statusCode = 401;
                throw error;
            }
            next();
        }
        
    } catch (error) {
        console.log(error);
    }
}