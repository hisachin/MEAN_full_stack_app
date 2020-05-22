import moment from 'moment';

/**
 * Import all models here
 */
const USERS = require('../models/users.model');

 /**
  * Import all lib and helper functions here
  */
 import {
    CustomError,
    validatePassword,
    Serialize
} from '../utils';


export default class AuthService {
    constructor(userData){
        this._userData = userData;
    }

    /**
     * this method is used to check if email is exists in the system
     */
    async isEmailExists(){
        const user = await USERS.find({"email" : this._userData.email});

        if(user.length == 0){
            return false;
        }

        return true;
    }

    /**
     * this method is used to login into the system
     */
    async login(){
        try{
            const user = await USERS.findOne({"email" : this._userData.email});

            if(!user){
                throw new CustomError('UserNotFound');
            }

            const isPasswordValid = await validatePassword(user.password, user.salt,this._userData.password);

            if(!isPasswordValid){
                throw new CustomError('AuthenticationError');
            }

            return {
                success : {
                    data : await Serialize.User(user)
                }
            };

        }catch(error){
            return {
                error : error
            }
        }
    }
}