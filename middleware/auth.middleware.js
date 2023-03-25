const jwt = require("jsonwebtoken");

const auth = (req,res,next)=>{
    const token = req.headers.authorization
    if(token){
        const decoded=jwt.verify(token,"deathNote")
        if(decoded){
            req.body.userID = decoded.userID
            next()
        }else{
            res.status(401).json({message:"Please login first."})
        }
    }else{
        res.status(401).json({message:"Please login first."})
    }
}

module.exports = {
    auth
};