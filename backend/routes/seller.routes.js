import express from "express"
import { isAuthSeller, sellerLogin, sellerLogout } from "../controllers/seller.controller.js"
import { authSeller } from "../middlewares/authSeller.js"


const sellerRoutes = express.Router()


//Making seller login -
sellerRoutes.post("/login", sellerLogin);

// seller logged out Route -
sellerRoutes.get("/logout", authSeller, sellerLogout);


//seller auth check route -
sellerRoutes.get("/is-auth", authSeller, isAuthSeller);

export default sellerRoutes;


// Flow -

// controllers  --->  Routes  --->  Index.js