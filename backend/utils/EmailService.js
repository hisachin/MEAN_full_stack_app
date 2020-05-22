import path from 'path';

export default class EmailService {
    constructor(email, emailType, data){
        this._SEND_EMAIL_TO = email,
        this.EMAIL_TYPE = emailType;
        this.EMAIL_CONTENT = data;
    }

    async send(){
        try{
            switch(this.EMAIL_TYPE){
                case 'registration' :
                    this.sendNewRegistrationEmail();
                    break;  
                default:
                    return;
            }

            return;
        }catch(error){
            console.log(error);
        }
    }

    async sendNewRegistrationEmail(){
        const subject = `Welcome To Lynkit`;
        console.log('...Email Send to', this._SEND_EMAIL_TO);
    }
}