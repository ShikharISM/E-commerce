import express, { urlencoded } from 'express';
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser';
import connectdb from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';

//App Config 
const app = express() 
const port = process.env.PORT || 4000

connectdb()
connectCloudinary() 


//Middlewares
app.use(cors())
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//API Endpoint
app.use('/api/user', userRouter)
app.use('/api/product',productRouter)

app.get('/',(req,res)=>{
    res.send("API Working").status(200);
})

app.listen(port,(req,res)=>{
  console.log('Server started on PORT:' + port);
})

