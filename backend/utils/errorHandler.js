import {
    CustomError
  } from './customErrorHandler';
  
  const notFoundErrorHandler = (req, res, next) => {
    try{
        if (!req.resourcePath) {
            throw new CustomError('UrlNotFound',`The path ${req.path} is not found`);
          }
          next();
    }catch(e){
        next(e);
    }
  }
  
  const globalErrorHandler = (err, req, res, next) => {
    console.log(err);

    let message = err.message;


    // Mongoose bad ObjectId
    if (err.name === "CastError") {
      message = `Resource not found with id of ${err.value}`;
      err.code = 404;
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
      message = "Duplicate field value entered";
      err.code = 404;
    }

    // Mongoose validation error
    if (err.name === "ValidatorError") {
      message = Object.values(err.error).map(val => val.message);
      err.code = 404;
    }
  
    const error = {
      status : false,
      code : err.code || 500,
      error : {
        type : err.name || "ServerError",
        details : {
          message : message
        }
      }
    }
    
    return res.status(error.code).json(error);
  }
  
  module.exports = {
      globalErrorHandler,
      notFoundErrorHandler
  };