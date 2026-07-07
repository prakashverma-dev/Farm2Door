import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import User from "../models/userModel.js";




// Register User : /api/user/register  (User Register API END POINT)
// {
//     "name" : "Prakash Verma",
//     "email" : "prakash@example.com",
//     "password" : "password123"
// }

export const registerUser = async (req, res) =>{

     try {
        const {name, email, password} = req.body;

        if(!name || !email || !password){
            res.status(400).json({message : "All Fields are required", success : false});  
        }
        
        // To check if with same email an user exist or not -
        const existingUser = await User.findOne({email});
        if(existingUser){
            res.status(400).json({message : "User already exists", success : false});  
        }

        // User password hash -
        const hasedPassword = await bcryptjs.hash(password, 10);
        // User create
        const user = await User.create({
            name,
            email,
            password : hasedPassword,
        })

        // Token generate for each user for authentication next time when he logins -
        const token = jwt.sign({
            id : user._id
        }, process.env.JWT_SECRET, {expiresIn : "2d"});

        // sending token via cookie + json response for mixed type sending for client easy -
        res.cookie(
            "usertoken", token, {
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            sameSite : process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge : 2 * 24 * 60 * 60 * 1000  // 2 days in miliseconds of the age to expire.
        });

        res.status(200).json({
            message : "User registered Successfully", 
            success : true, 
            user : {
            name : user.name,
            email : user.email
            },
            token :{
                usertoken : token,
                token_type : "Bearer",
                expires_in : 900 //token in second expires in 15 min.
            }
        });

        
     } catch (error) {
        console.log(error);
        res.status(500).json({message : "Internal Server Error"})
     }
}

// login user : /api/user/login

export const loginUser = async (req, res)=>{
    try {

        const {email, password} = req.body;

        // Field Validation -
        if(!email || !password){
            res.status(400).json({message : "All Fields are required!", success : false});  
        }
        
        // Fetching User credential with his id with database -
        const user = await User.findOne({email});

        //if user doesnot exist -
        if(!user){
            return res.status(400).json({message : "User Not Registered!", success : false})
        }

        // if user exist, we match the password -
        const isMatch = await bcryptjs.compare(password, user.password);
         if(!isMatch){
            return res.status(400).json({message : "Invalid Password!", success : false})
        }

        // Now we will generate the token for authentication next time when he logins -
        const token = jwt.sign({
            id : user._id
        }, process.env.JWT_SECRET, {expiresIn : "2d"});

        // sending token via cookie + json response for mixed type sending for client easy -
        res.cookie(
            "usertoken", token, {
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            sameSite : process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge : 2 * 24 * 60 * 60 * 1000  // 2 days in miliseconds of the age to expire.
        });

        res.status(200).json({
            message : "User Logged in Successfully", 
            success : true, 
            user : {
                name : user.name,
                email : user.email
            },
            token :{
                usertoken : token,
                token_type : "Bearer",
                expires_in : 900 //token in second expires in 15 min.
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Internal Server Error"})
     }
}

// logout user : /api/user/logout 

export const logoutUser = async (req, res)=>{
    try {
        res.clearCookie("usertoken", {
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            sameSite : process.env.NODE_ENV === "production" ? "none" : "strict",

        });

        res.status(200).json({message : "User logged out successfully", success : true});


   } catch (error) {
        console.log(error);
        res.status(500).json({message : "Internal Server Error"})
     }
}


// Check User auth : /api/user/is-auth
export const isAuthUser = async (req, res)=>{
        try {

            // getting access from request body the authenticated userid from userJWtToken id -
            const userId = req.userId;

            if(!userId){
                 return res.status(401).json({message : "Unauthorized User", success : false});
            }

            const user = await User.findById(userId).select("-password");

            res.status(200).json({message : "User is Authorized", success : true, user});


     } catch (error) {

        console.log(error);
        res.status(500).json({message : "Internal Server Error"});
        
     }
}