import express from "express"
import { sellerLogin } from "../controllers/seller.controller.js"


const sellerRoutes = express.Router()


//Making seller login -
sellerRoutes.post("/login", sellerLogin)

// seller logged out Route -
// userRoutes.get("/logout", authUserLogout, logoutUser)

//seller user auth check route -
// userRoutes.get("/is-auth", authUserLogout, isAuthUser)

export default sellerRoutes;


// Flow -

// controllers  --->  Routes  --->  Index.js