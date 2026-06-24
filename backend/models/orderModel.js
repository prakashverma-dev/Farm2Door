import mongoose from "mongoose";
import { type } from "node:os";


// Order Schema -
const orderSchema = new mongoose.Schema({
    userId :{
        type : String,
        required : true, 
        ref : "User"
    }
});

// Order Model -
const Orders = mongoose.model("orders", orderSchema);

export default Orders;