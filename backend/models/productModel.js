import mongoose from "mongoose";
import { type } from "node:os";


// Prouduct Schema -
const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },

    description : {
        type : String,
        required : true
    },

    price : {
        type : Number,
        required : true
    },
    offerPrice : {
        type : Number,
        required : true
    },
    image : {
        type : Array,
        required : true
    },

    category : {
        type : String,
        required : true
    },
    inStock : {
        type : Boolean,
        default : true,
        required : true
    },
});


// Prouduct Model -
const Products = mongoose.model("all_products", productSchema);

export default Products;