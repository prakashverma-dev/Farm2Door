
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { connectDB } from './config/connectMongoDb.js';
import userRoutes from './routes/user.routes.js';
import sellerRoutes from './routes/seller.routes.js';
import { connectCloudinary } from './config/connectCloudinary.js';
dotenv.config();


const app = express();

// For mongodb connection -
connectDB();

// To connect Cloudinary -
connectCloudinary();

// Defining the origins to allow on backend end Point from frontend -
// Define the frontend url here -
const allowedOrigins = ["http://localhost:5173/"]


// middlewares 
app.use(express.json());
app.use(cors({
    origin: allowedOrigins, credentials: true
}));
app.use(cookieParser());


// User All Routes -
app.use("/api/user", userRoutes );
// Seller All Routes -
app.use("/api/seller", sellerRoutes );


// API ENDpoints -
// app.get("/", (req, res) => {
//     res.send("Hello World!")
// })


// To listen the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}, `);
})

