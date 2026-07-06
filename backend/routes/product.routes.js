import express from "express"

import { authSeller } from "../middlewares/authSeller.js";
import { addProduct, changeStock, getProductById, getProducts } from "../controllers/product.controller.js";
import { receiveFile } from "../config/multer.js";

const productRoutes = express.Router();

// add a new product - we used multer here to recived the images / req.files is array of `photos` files
productRoutes.post("/add-product",  authSeller, receiveFile.array("images"), addProduct);
// show all products -
productRoutes.get("/list-products", getProducts); //Here we dont need sellerAuth, as it can viewed by anyone from frontend.
//show single product -
productRoutes.get("/id", getProductById);
//product stock update -
productRoutes.post("/stock", authSeller, changeStock);
 


export default productRoutes;

