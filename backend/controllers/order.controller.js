
import Orders from "../models/orderModel.js";
import Products from "../models/productModel.js";




// Place COD order : /api/order/cod 
export const placeOrderCOD = async (req, res)=>{
    try {

        const userId = req.userId; //from authenticated user id attached to request body.
        const {items, address} = req.body; 


        if(items.length === 0 || !address){
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
// Place Stripe Online order : /api/order/stripe 
export const placeOrderStripe = async (req, res)=>{
    try {

        const userId = req.userId; //from authenticated user id attached to request body.
        const {items, address} = req.body; 

        // const {origin} = req.headers;

        if(items.length === 0 || !address){
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




// Note : .populate() methdo : When you pass "items.product" to Mongoose, it treats items as a path blueprint, not a specific index. It means: "Loop through every single item inside the array and populate the product field for all of them."If your order has 1 item, it populates that item.If your order has 10 items, it automatically loops and populates all 10 items; Similary 'address' filed get pupulated. JUst Ensure that the address field inside your Order schema has a ref property pointing to the correct collection model 'address' (just like your product has ref: "all_Products").

// After Order Placed, Get Order Details By USER, for individual user : /api/order/details
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

        // console.log("ORder Details : ", orderDetails)
        
        res.status(200).json({ message:"User Orders details fetched Successfully", orderDetails , success : true });

    }catch (error){

        console.error("Error Fetching user order deatails :", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Get All Order Details By SELLER, for all users  :  /api/order/all-details
export const getAllOrders = async (req, res)=>{
    try {
        const allOrders = await Orders.find({
            $or : [{paymentMethod : "COD"}, {isPaid : true}],

        }).populate("items.product address").sort({createdAt : -1});
        
        res.status(200).json({ message:"All Orders details fetched Successfully", allOrders, success : true });
        
    } catch (error) {
       
        console.error("Error Fetching All orders deatails :", error);
        res.status(500).json({ message: "Internal server error" }); 
    }
}
