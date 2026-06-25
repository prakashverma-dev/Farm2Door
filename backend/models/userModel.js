


import mongoose from "mongoose";

// User Schema -
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true,
        unique : true,
    },
    password : {
        type : String,
        require : true,
    },

    cartItems : {
        type : Object,
        default : {}
    }
}, {minimize : false});

// Creating user model -
const User = mongoose.model("login_signup_users", userSchema);




export default User;