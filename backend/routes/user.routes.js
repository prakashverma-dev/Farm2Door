import express from "express"

import { isAuthUser, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { authUser} from "../middlewares/authUser.js";

const userRoutes = express.Router()

// user register Route -
userRoutes.post("/register",  registerUser)
// user logged in Route -
userRoutes.post("/login",  loginUser)
// user logged out Route -
userRoutes.get("/logout", authUser, logoutUser)

// user auth check route -
userRoutes.get("/is-auth", authUser, isAuthUser)

export default userRoutes;


// Flow -


// controllers  --->  Routes  --->  Index.js

