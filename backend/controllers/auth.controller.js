import express from 'express';

let router = express.Router();

 /**
  * Import all services here
  */

import { AuthService, UserService } from '../services';

 /**
  * Import all lib and helper functions here
  */
 import {
    Response,
    CustomError
} from '../utils';


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

const register = async (req ,res, next) => {

    try{
        const data = req.body;

        if(!data.email || !data.password){
            throw new CustomError("MissingFieldError");
        }

        const USER = new UserService(data.email,data);
    
        const { error, success } = await USER.create();

        if(error){
            next(error);
        }

        if(success){
            const responseObj = new Response('success',"NewEntity");
            return res.status(201).json(responseObj);
        }
    }catch(e){
        next(e);
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const login = async (req ,res, next) => {
    const loginDetails = req.body;

    const AUTH = new AuthService(loginDetails);
 
    const { error, success } = await AUTH.login();

    if(error){
        next(error);
    }

    if(success){

        const responseObj = new Response('success',"LoggedIn",success.data);
        return res.status(200).json(responseObj);
    }
}

/**
 * Routes for authentication and authrization is defined below
 */
router.post('/signup',register);
router.post('/signin',login);

module.exports = router;