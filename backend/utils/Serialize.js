export class Serialize{

    static async User(data){
        const {
            _id,
            email,
            name
        } = data;
    
        return {
            _id,
            email,
            name
        }
    }
}