import { log } from "console";
import mongoose from "mongoose";

type connectionObject={
    isConnetcted?:number
}

const connection:connectionObject={}

async function dbConnect():Promise<void>{
 if(connection.isConnetcted){
console.log("Already connected to the database");
return ;
 }
 try {
  const db=  await mongoose.connect(process.env.MONGODB_URI || "",{})
  connection.isConnetcted=db.connections[0].readyState

  console.log("DB connected successfully");
  

 } catch (error) {
    console.log("DB connection failed",error);
    
    process.exit(1)
 }
}
export default dbConnect;