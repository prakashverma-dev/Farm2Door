import express from "express";
import { authUser } from "../middlewares/authUser.js";
import { addAddress, getAddress } from "../controllers/address.controller.js";




const addressRoutes = express.Router();
// To create a new user address -
addressRoutes.post("/add", authUser, addAddress );
//To get any user address -
addressRoutes.get("/get", authUser, getAddress );




export default addressRoutes;