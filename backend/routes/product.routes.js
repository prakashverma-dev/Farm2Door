import express from "express"
import { upload } from "../config/multer.js";
import { authSeller } from "../middlewares/authSeller.js";
import { addProduct, changeStock, getProductById, getProducts } from "../controllers/product.controller.js";


const productRoutes = express.Router();

// add a new product - we used multer here to recived the images -
productRoutes.post("/add-product", upload.array('images'), authSeller, addProduct);
// show all products -
productRoutes.get("/list-products", getProducts); //Here we dont need sellerAuth, as it can viewed by anyone from frontend.
//show single product -
productRoutes.get("/id", getProductById);
//product stock update -
productRoutes.post("/stock", authSeller, changeStock);
 


export default productRoutes;