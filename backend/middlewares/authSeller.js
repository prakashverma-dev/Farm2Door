import jsonwebtoken from "jsonwebtoken";


export const authSeller = (req, res, next)=>{
    try {
        const {sellerToken} = req.cookies;

        if(!sellerToken){
           return res.status(401).json({message : "Unauthorized Seller, token not found!", success : false});
        }

        const decoded = jsonwebtoken.verify(sellerToken, process.env.JWT_SECRET);

        // If the token is valid, you can attach the decoded information to the request object for further use in the protected routes.
        // For example, you can attach the user ID or any other relevant information from the token payload to the request object.

        // console.log("decoded : ", decoded)
        // Attaching the user id to the request object for further use in the protected routes -
        // adding a custom property (userId) to the request object after successfully verifying the JWT token for all protected routes -

        req["sellerId"] = decoded["email"] ; 

        if(decoded["email"] === process.env.SELLER_EMAIL){ //we made jwt signin using email -
            next()
        }
            
    

    } catch (error) {
        console.error("Authentication error :", error);
        return res.status(401).json({message : "Unauthorized Seller, token not found!", success : false});
    }
}