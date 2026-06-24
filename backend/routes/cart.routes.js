import express from "express";
import { authUser } from "../middlewares/authUser.js";
import { updateCart } from "../controllers/cart.controller.js";

const cartRoutes = express.Router();

// to update the cart Items -
cartRoutes.post("/update", authUser, updateCart ) //Only Authenticated user can update cartItem in cart.


export default cartRoutes;