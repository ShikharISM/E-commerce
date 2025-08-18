import express from 'express'
import { adminLogin, LoginUser, registerUser } from '../controllers/userController.js';


const userRouter = express.Router();

userRouter.post('/login',LoginUser);
userRouter.post('/register',registerUser);
userRouter.post('/admin',adminLogin);

export default userRouter