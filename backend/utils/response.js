export class Response{
    constructor(ResponseCodeName = 'success',ResponseMsg = "",ResponseData = null){

        this.status = ResponseCodeName;
        
        if(ResponseMsg){
            this.getResponsMsg(ResponseMsg);
        }

        if(ResponseData){
            this.data = ResponseData;
        }
    }

    getResponsMsg(ResponseMsg){
        switch(ResponseMsg){
            case 'NewEntity':
                this.newEntity();
                break;
            case 'LoggedIn':
                this.loggedIn();
                break;
            case 'NotFound':
                this.notFound();
                break;
            default:
                this.message = ResponseMsg;
                
        }
    }

    newEntity(){
        this.message = 'Account has been created successfully';
    }

    loggedIn(){
        this.message = 'Login Susscessfully';
    }

    notFound(){
        this.message = 'Resquested object not found';
    }


}