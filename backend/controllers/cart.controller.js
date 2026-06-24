
import User from "../models/userModel.js";




// update respective user cartData : /api/cart/update

export const updateCart = async (req, res)=>{
    try {

        const userId = req.userId;
        const {cartItems } = req.body;

        const updatedUser = await User.findByIdAndUpdate(userId, {cartData : cartItems}, {new : true} );

        if(!updatedUser){
            res.status(404).json({message : "User not found", success : false});
        }

        res.status(200).json({updatedUser, message : "Cart Updated Successfully" , success : true});
          
        
    } catch (error) {
        res.status(500).json({message : "Internal Server Error", Error : error.message}) ;
    }
}