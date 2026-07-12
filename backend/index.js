

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { connectDB } from './config/connectMongoDb.js';

import dotenv from 'dotenv'
dotenv.config(); // Must execute before importing local routes/controllers

import userRoutes from './routes/user.routes.js';
import sellerRoutes from './routes/seller.routes.js';
import { connectCloudinary } from './config/connectCloudinary.js';
import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';
import orderRoutes from './routes/order.routes.js';
import addressRoutes from './routes/address.routes.js';



const app = express();

// For mongodb connection -
await connectDB();
// To connect Cloudinary -
await connectCloudinary();

//All Middlewares are here  -

//Allowing the cross-origin requests from the React frontend port to backend port, as frontend and backend are on different ports (origins), and if we dont allow frontend origin to backend it will cause the browser's safety features to reject the response when the expected Access-Control-Allow-Origin header is missing.

//When you write: origin: ['http://localhost:5173', 'https://farm2door-app.vercel.app'] --> you're telling the CORS middleware: "Allow requests from either of these frontend URLs only; NOt from https://google.com and http://localhost:3000" ❌.\

//The CORS package internally checks whether the request's Origin header matches one of the values in the array.
app.use(cors({
    origin: ['http://localhost:5173', 'https://farm2door-app.vercel.app'],
    credentials: true // Include this if you are using cookies or sessions
}));

app.use(express.json()); // Keep this after CORS
app.use(cookieParser());



// API ENDpoints -

// User All Routes -
app.use("/api/user", userRoutes);
// Seller All Routes -
app.use("/api/seller", sellerRoutes);
// Product All Routes -
app.use("/api/product", productRoutes);
// Cart All Routes -
app.use("/api/cart", cartRoutes);
// Order All Routes -
app.use("/api/order", orderRoutes);
// Address All Routes -
app.use("/api/address", addressRoutes);


// Home Page of Backend/Testing  -

app.get("/", (req, res) => {
    res.send("Welcome to farm2Door-app backend!")
})

console.log("Production Check :", process.env.NODE_ENV === "production") // false
console.log("Production Check2 :", process.env.NODE_ENV === "production" ? "none" : "strict") //strict

// To listen the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}, `);
})

