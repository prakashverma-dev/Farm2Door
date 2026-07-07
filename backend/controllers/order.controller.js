
import Orders from "../models/orderModel.js";
import Products from "../models/productModel.js";




// Place COD order : /api/order/cod 
export const placeOrderCOD = async (req, res)=>{
    try {

        const userId = req.userId; //from authenticated user id attached to request body.
        const {items, address} = req.body; 


        if(!items || !address){
             res.status(400).json({ message: "Address and Items are required", success : false });
        }

        // Calculating the total amount of the order -
        let amount = await items.reduce(async (acc, item)=>{
            const product = await Products.findById(item.product);

            return (await acc) + product.offerPrice * item.quantity;
        }, 0);

        // Adding tax 2% extra charges -
        amount += Math.floor((amount * 2)/100);

        // creating the order -
        await Orders.create({
            userId,
            items,
            address : address,
            amount,
            paymentMethod : "COD",
            isPaid : false
        });

        res.status(201).json({ message:"Order Placed Successfully", success : true });
        
    }catch (error){

        console.error("Error placing order:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


// ## Check .populate() function -
// After Order Placed, Order Details for individual user : /api/order/details
export const getUserOrder = async (req, res)=>{
    try {
        const userId = req.userId;
        const orderDetails = await Orders.find({
            userId,
            $or : [ {paymentMethod : "COD"}, {isPaid : true } ], 

        }).populate("items.product address").sort({createdAt : -1});

        if(orderDetails.length == 0){
            return res.status(404).json({ message: "No Order Placed!", success : false });
        }
        
        res.status(200).json({ message:"User Orders details fetched Successfully", orderDetails , success : true });

    }catch (error){

        console.error("Error Fetching user order deatails :", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// get all Orders for admin/seller : /api/order/all-orders
export const getAllOrders = async (req, res)=>{
    try {
        const orders = await Orders.find({
            $or : [{paymentMethod : "COD"}, {isPaid : true}],

        }).populate("items.product address").sort({createdAt : -1});
        
        res.status(200).json({ message:"All Orders details fetched Successfully", orders, success : true });
        
    } catch (error) {
       
        console.error("Error Fetching All orders deatails :", error);
        res.status(500).json({ message: "Internal server error" }); 
    }
}
