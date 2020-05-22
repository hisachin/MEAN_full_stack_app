import moment from 'moment';

/**
 * Import all models here
 */
const Users = require('../models/users.model');

 /**
  * Import all lib and helper functions here
  */
 import {
    generateUserTokenAndPassword,
    EmailService,
    CustomError,
    Serialize
} from '../utils';

export default class UserService{
    constructor(email,data){
        this._userData = data;
        this._userEmail = email
    }

    /**
     * this method is used to check if email is exists in the system
     */
    async isEmailExists(){
        const user = await Users.find({"email" : this._userEmail});

        if(user.length == 0){
            return false;
        }

        return true;
    }

    /**
     * this method is used to create new user in the system
     */
    async create(){
        try{

            if(await this.isEmailExists()){
                throw new CustomError('EmailAlreadyExist');
            }

            const { userPassword , hashedPassword,salt} = await generateUserTokenAndPassword(this._userData.password);

            const tmpUser = {
                password : hashedPassword,
                salt : salt,
                name: this._userData.name,
                email : this._userData.email,
                mobile : this._userData.mobile
            }

            const user = await Users.create(tmpUser);

            if(!user){
                throw new Error('Something Went Wrong');
            }

            //sending email
            const email = user.email;
            const name = this._userData.name;
            const Email = new EmailService(email,'registration', {name,email,userPassword});
            Email.send();

            return {
                success : { 
                    data : await Serialize.User(user) 
                }
            }
            
        }catch(error){
            return {
                error : error
            }
        }
    }
}