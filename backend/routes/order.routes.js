import express from "express";
import { getAllOrders, getUserOrder, placeOrderCOD, placeOrderRazorPay, verifyRazorPayPayment } from "../controllers/order.controller.js";
import { authUser } from "../middlewares/authUser.js";
import { authSeller } from "../middlewares/authSeller.js";




const orderRoutes = express.Router();

// Place user cod order -
orderRoutes.post("/cod", authUser, placeOrderCOD);
//to get user order details BY USER -
orderRoutes.get("/details", authUser, getUserOrder);
//to get all order details by SELLER -
orderRoutes.get("/all-details", authSeller, getAllOrders);


// For RazorPay Routes -
orderRoutes.post("/create-razorpay-order", authUser, placeOrderRazorPay); // To create Razorpay order
orderRoutes.post("/verify-payment", authUser, verifyRazorPayPayment); //To verify payment signature



export default orderRoutes;