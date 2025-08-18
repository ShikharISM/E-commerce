import jwt from 'jsonwebtoken'

const AdminAuth = async(req,res,next)=>{
  try {
    const {token} = req.headers
    if(!token){
        return res.json({success:false,message:"INVALID CREDENTIALS LOGIN AGAIN WITH CORRECT CREDENTIALS"})
    }
    const token_decode = jwt.verify(token,process.env.JWT_SECRET);
    if (token_decode!== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) { // we created the token with our email and password admin 
        return res.json({success:false,message:"INVALID CREDENTIALS LOGIN AGAIN WITH CORRECT CREDENTIALS"})
    }
    next()
    
  } catch (error) {
    console.log(error)
    res.json({success:false, message:error.message})
  }
}
export default AdminAuth