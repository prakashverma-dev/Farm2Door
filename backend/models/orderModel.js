import mongoose from "mongoose";
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
        product : { type : String, required : true, ref : "all_Products" },
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
    status : {
        type : String,
        required : true,
        default : "Order Placed"
    },
    paymentMethod : {
        type : String,
        enum: ["COD", "Online"], 
        required : true,
    },
    isPaid : {
        type : Boolean,
        required : true,
        default : false
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

Note : IF use Reference 'ref' field, if we add type : string; then MongoDB's standard generated IDs for type often changed to Schema.Types.ObjectId instead of String, automatically.
  
 */