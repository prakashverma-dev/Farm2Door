import express from "express";
import { getAllOrders, getUserOrder, placeOrderCOD } from "../controllers/order.controller.js";
import { authUser } from "../middlewares/authUser.js";
import { authSeller } from "../middlewares/authSeller.js";




const orderRoutes = express.Router();

// Place user cod order -
orderRoutes.post("/cod", authUser, placeOrderCOD);
//to get user order details -
orderRoutes.get("/user", authUser, getUserOrder);
//to get all order details by admin/seller -
orderRoutes.get("/all-orders", authSeller, getAllOrders);





export default orderRoutes;