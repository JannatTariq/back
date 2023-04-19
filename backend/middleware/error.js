const ErrorHandler = require("../utils/errorhandler")

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
   
    //Wrong id error
    if(err.name === "CastError"){
        const message = `Resource not found.Invalid: ${err.path}`;
        err = new ErrorHandler(message,400);
    }
    //Mongoose duplicate key error 
    if(err.code === 11000)
    {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`
        err = new ErrorHandler(message,400);
    }

    //Wrong JWT Token
    if(err.code === "JsonWebTokenError")
    {
        const message = `Json Web Token is Invalid`
        err = new ErrorHandler(message,400);
    }
    if(err.code === "TokenExpireError")
    {
        const message = `Json Web Token is Expired`
        err = new ErrorHandler(message,400);
    }


    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
    
}