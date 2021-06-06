import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "../model";

interface IComparePassword {
  user: IUser;
  password: string;
}

interface IHashPassword {
  password: string;
}

const SALT_ROUNDS = 10;

export const hashPassword =async ({ password }: IHashPassword) => {
  try{
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    return hashedPassword;
  }catch(err){
    throw err;
  }
  

};

export const comparePassword = async ({ user, password }: IComparePassword) => {
  try{
    const matched = await bcrypt.compare(password, user.password);
    if(matched){
      const token = jwt.sign({
        email: user.email,
        id: user.id
      },process.env.JWT_SECRET as string, {expiresIn: '1h'})
      return token
    }
  }catch(err){
    throw err;
  }
};
