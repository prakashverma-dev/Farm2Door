
import jwt from "jsonwebtoken";


// seller Login : /api/seller/login

export const sellerLogin = async (req, res) => {

    try {

        const {email, password} = req.body;

          // Field Validation -
        if(!email || !password){
                res.status(400).json({message : "All Fields are required", success : false});  
            }
                
        
        //if seller email doesnot exist -
        if(email !== process.env.SELLER_EMAIL){
                return res.status(400).json({message : "Invalid email", success : false})
            }
        
        // if seller passowrd is wrong -
        if(password !== process.env.SELLER_PASSWORD){
                    return res.status(400).json({message : "Invalid password", success : false})
                }

        if(email === process.env.SELLER_EMAIL && password === process.env.SELLER_PASSWORD){
              
            const token = jwt.sign({email}, process.env.JWT_SECRET, {
                expiresIn : "2d"
            });

            res.cookie("sellerToken", token, {
                    httpOnly : true,
                    secure : process.env.NODE_ENV === "production",
                    sameSite : process.env.NODE_ENV === "production" ? "none" : "strict",
                    maxAge : 2 * 24 * 60 * 60 * 1000  // 2 days in miliseconds of the age to expire.
            })

            res.status(200).json({ message: "Seller Login Successful", success : true, sellerToken : token });
         }
        
    } catch (error) {
        console.error("Error in sellerLogin:", error);
        res.status(500).json({ message: "Internal server error" });
    }
 }

// seller Logout : /api/seller/logout

export const sellerLogout = async (req, res)=>{

    try {
        res.clearCookie("sellerToken", {
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            sameSite : process.env.NODE_ENV === "production" ? "none" : "strict",

        });

        res.status(200).json({message : "Seller Logout Successfull", success : true});


   } catch (error) {
        console.error("Error in sellerLogout", error);
        res.status(500).json({message : "Internal Server Error"})
     }

}

// check seller Auth : /api/seller/is-auth 

export const isAuthSeller = (req, res)=>{
    try {
     
        res.status(200).json( {message : "Seller is authorized", success : true } );

     } catch (error) {

        console.error("Error in isAuthSeller", error);
        res.status(500).json({message : "Internal Server Error"});

     }
}