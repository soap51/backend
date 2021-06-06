import { User } from "../../model"
import { hashPassword, comparePassword } from "../../utils/crypt";

interface IGetProfile {
    id: string;
}

interface IUpdateProfile {
    id: string;
    name: string;
}

interface ICreateProfile {
    email: string;
    password: string;
    name: string;
}

export const getProfile = async ({id}: IGetProfile) => {
    try{
        const user = await User.findById(id).exec()  
        if(user){
            return {
                email: user.email,
                name: user.name
            }
        }        
    }catch(err){
        throw err;
    }
}

export const updateProfile = async ({id, name}:IUpdateProfile) => {
    try{
        const user = await User.findByIdAndUpdate(id, {name}, {new: true}).exec()
        if(user){
            return {
                email: user.email,
                name: user.name
            };
        }
    }catch(err){
        throw err;
    }
}

export const createProfile = async ({email, password, name} : ICreateProfile) => {
    try{
        const hashedPassword = await hashPassword({password})
        const user = await User.create({
            email,
            password:hashedPassword,
            name
        })       
        const token = await comparePassword({user,password})            
        return {
            token,
            id: user.id
        }                  
    }catch(err){

        throw err;
    }
}

