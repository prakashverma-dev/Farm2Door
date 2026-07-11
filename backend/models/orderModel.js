import mongoose, { Schema } from "mongoose";
import { type } from "node:os";
import productRoutes from "../routes/product.routes.js";


// Order Schema -
const orderSchema = new mongoose.Schema({
    userId :{
        type : String,
        required : true, 
        ref : "login_signup_users" //This must match exaclty model name of User Model.
    },
    items : [{
        product : { type : mongoose.Schema.Types.ObjectId , required : true, ref : "all_Products" },
        quantity : { type : Number, required : true},
    }],
    amount : {
      type : Number,
      required : true  
    },
    address : {
        type : Object,
        required : true,
        ref : "address"
    },
    paymentMethod : {
        type : String,
        enum: ["COD", "Online"], 
        required : true,
    },
    status : {
        type : String,
        enum: ["Pending", "Paid", "Failed"],
        default: "Pending",
        required : true,
    },
    deliveryStatus : {
        type : String,
        enum: ["Order Placed", "Proccesing", "Shipped", "Delivered", "Cancelled", "Pending",""],
        default: ""
    },
    isPaid : {
        type : Boolean,
        required : true,
        default : false
    },
    
    //Razorpay Fields-
    razorpayOrderId :{
        type : String,
        default: ""
    },

    razorpayPaymentId: {
        type: String,
        default: ""
    },

    razorpaySignature: {
        type: String,
        default: ""
    },



}, {timestamps : true});

// Order Model -
const Orders = mongoose.model("orders", orderSchema);

export default Orders;


/*
Note  : - ref name must be same as Model name.
mongoose.model("User", userSchema); // ref: "User" ✅
mongoose.model("user", userSchema); // ref: "user" ✅
mongoose.model("Users", userSchema); // ref: "Users" ✅

Note : IF use Reference 'ref' field, if we add type : string; then MongoDB's standard generated IDs for type often changed to Schema.Types.ObjectId instead of String, automatically.  mongoose.Schema.Types.ObjectId

 */