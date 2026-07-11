import jsonwebtoken from "jsonwebtoken";


export const authUser = (req, res, next)=>{
    try {
        const {usertoken} = req.cookies;

        // If userToken is not found, means user is unauthorized, Make him to loggin or signup first -
        if(!usertoken){
           return res.status(401).json({message : "Please Login to Proceed!", success : false});
        }

        const decoded = jsonwebtoken.verify(usertoken, process.env.JWT_SECRET);

        // If the token is valid, you can attach the decoded information to the request object for further use in the protected routes.
        // For example, you can attach the user ID or any other relevant information from the token payload to the request object.

        // console.log("decoded : ", decoded)
        // Attaching the user id to the request object for further use in the protected routes -
        // adding a custom property (userId) to the request object after successfully verifying the JWT token for all protected routes -
        req["userId"] = decoded["id"] ;

        next();
    

    } catch (error) {
        console.error("Authentication error :", error);
        return res.status(401).json({message : "Unauthorized User, token not found!", success : false});
    }
}