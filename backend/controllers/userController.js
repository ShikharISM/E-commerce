import user from "../models/userModel.js"
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

//Route for User Login
const LoginUser = async (req,res) => {
  try {
    const {email,password} = req.body;
    const User = await user.findOne({email});
    if(!User){
        return res.json({success:false,message:"Enter Valid Credentials"});
    } 
    const isMatch = await bcrypt.compare(password,User.password);
    if(!isMatch){
        return res.json({success:false,message:"Enter Valid Password"});
    }
    const token = createToken(User._id);
    res.json({success:true,token});

  } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
  }
}


//Route for Register User
const registerUser = async (req,res) => {
   try {
    const {name,email,password} = req.body;

    // checking user already exists or not
    const User = await user.findOne({email});
    if(User){
        // res.send("User Already Exists").status(400);
        return res.json({success:false,message:"User already exists"})
    }

    // validating email format and password
    if(!validator.isEmail(email)){
        return res.json({success:false,message:"Enter a Valid Email"})
    }
    if(password.length < 5){
        return res.json({success:false,message:"Please Enter a strong password"})
    }

    //hashing the password
    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(password,salt);

    const newUser = new user({
        name,
        email,
        password:hashedpassword,
    })
 
    // adding the new user details in the database
    const saveduser = await newUser.save();

    const token = createToken(saveduser._id);

    res.json({success:true,token:token});

   } catch (error) {
     console.log(error);
     res.json({success:false,message:error.message})
   }
}


//Route for Admin Login 
const adminLogin = async (req,res) => {
     try {
        console.log("Admin login hit:", req.body);
        const {email,password} = req.body
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            // if email and password matches with admin details we will create a token 
            const token = jwt.sign(
                email + password,
                process.env.JWT_SECRET
            )
            res.json({success:true,token});
        }
        else{
            res.json({success:false,message:"INVALID CREDENTIALS"})
        }
        
     } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
     }
}

export {
    LoginUser,
    registerUser,
    adminLogin,
}