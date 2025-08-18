import mongoose from "mongoose";

const connectdb = async (req,res)=>{
   try {
     mongoose.connection.on('connected',()=>{
        console.log("DB Connected");
     })
     await mongoose.connect(`${process.env.mongoURI}/ecommerce`);
   } catch (error) {
     res.send("DB not connected").status(500);
   }
}

export default connectdb;