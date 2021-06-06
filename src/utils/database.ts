import mongoose from "mongoose"


export const connect = async () => {
    try{
        await mongoose.connect(process.env.DATABASE_URL as string, {useNewUrlParser: true, useUnifiedTopology: true})
    }catch(err){
        throw err;
    }
}