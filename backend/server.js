import express, { urlencoded } from 'express';
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser';
import connectdb from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js';
//App Config 
const app = express()
const port = process.env.PORT || 4000

connectdb()
connectCloudinary()


const corsOptions = {
  origin: "http://localhost:5173", // <-- Your frontend's URL
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization,token", // <-- IMPORTANT: Add 'token' here
  credentials: true
};
//Middlewares
app.use(cors({
  origin: "https://e-commerce-frontend-app-nine.vercel.app",
  credentials: true
}));
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


//API Endpoint
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/', (req, res) => {
  res.send("API Working").status(200);
})

app.listen(port, (req, res) => {
  console.log('Server started on PORT:' + port);
})

