import mongoose from "mongoose";
import 'dotenv/config'
export  const connetDB= async()=>{
    await mongoose.connect(process.env.MONGODB_URL).then(()=> console.log('db connected')
    )
}