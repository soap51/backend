import { User } from "../../model"
import { comparePassword } from "../../utils/crypt";

interface IAuth {
    email: string;
    password: string;
}

export const auth = async ({email, password} : IAuth) => {
    try{
        const user = await User.findOne({email}).exec()
        if(user){
            const token = await comparePassword({user,password})  
            if(token){
                return {
                    token,
                    id: user.id
                }
            }                 
        }       
    }catch(err){
        throw err;
    }
}

