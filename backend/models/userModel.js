import mongoose,{Schema} from "mongoose";

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    email : {
        type : String,
        required: true,
        unique: true
    },
    password : {
        type : String,
        required: true,
        unique : true
    },
    cartData: {
        type : Object,
        default : {},
        // required: true
    },
},{minimize : false,timestamps : true})

const user = mongoose.model('user',UserSchema);

export default user; 