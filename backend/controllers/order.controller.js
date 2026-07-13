
import {razorpayInstance} from "../config/razorpay.js";
import Orders from "../models/orderModel.js";
import Products from "../models/productModel.js";
import crypto from 'crypto';
import User from "../models/userModel.js";




// Place COD order : /api/order/cod 
export const placeOrderCOD = async (req, res)=>{
    try {

        const userId = req.userId; //from authenticated user id attached to request body.
        const {items, address} = req.body; 


        if(!items || items.length === 0 || !address){
             res.status(400).json({ message: "Address and Items are required", success : false });
        }

        // Calculating the total amount of the order -
        let amount = await items.reduce(async (acc, item)=>{
            const product = await Products.findById(item.product);

            return (await acc) + product.offerPrice * item.quantity;
        }, 0);


        // Adding tax 2% extra charges -
        amount += (amount * 2)/100 ;

        // creating the order -
        await Orders.create({
            userId,
            items,
            address : address,
            amount,
            paymentMethod : "COD",
            status : "Pending",
            deliveryStatus : "Order Placed",
            isPaid : false
        });

        // clearning CartItems Object from user section, after successfull order -
        await User.findByIdAndUpdate(
            userId,
            {
                cartItems: {}
            }
        );


        res.status(201).json({ message:"Order Placed Successfully", success : true });
        
    }catch (error){

        console.error("Error placing order:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// For RazorPay Payment setup : we need to create two APIs for this, one for 'create razor pay order' and another one is 'verify payment -

//To Create RazorPay Order : /api/order/create-razorpay-order  
export const placeOrderRazorPay = async (req, res)=>{
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
        amount += (amount * 2)/100 ;

        //RazorPay Setup, to create order -
        const options = {
                amount: Number(amount) * 100, //Amount is multiplied by 100 because Razorpay uses paise.
                currency: "INR",
                receipt: `receipt_${Date.now()}`
        };

        const razorpayOrder = await razorpayInstance.orders.create(options);

        // save Order with razorFields in DB -
        const newOrderObj = new Orders({
            userId,
            items,
            address : address,
            amount,
            paymentMethod : "Online",
            status :"Pending",
            isPaid : false,
            razorpayOrderId : razorpayOrder.id
        });

        await newOrderObj.save();


        res.status(201).json({ message:"Created a RazorPay Order", razorpayOrder : razorpayOrder, dbOrder : newOrderObj, success : true });
        
    }catch (error){

        console.error("Error placing RazorPay order:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// To verify RazorPay Order : /api/order/verify-payment
export const verifyRazorPayPayment = async (req, res)=>{
    try {

        const {razorpay_order_id, razorpay_payment_id, razorpay_signature, paymentFailed } = req.body;

        // If payment failed, we update the status from pending to failed -
        if(paymentFailed){
            const order = await Orders.findOneAndUpdate(
                {razorpayOrderId : razorpay_order_id},
                {
                    status :"Failed",
                    isPaid : false
                },
                {new : true}
            )

            return res.status(400).json({ message: "Payment Failed!", success : false, order : order });

        }

        // If successfull payment BY USER, let's verify with RazorPAy -

        const sign = razorpay_order_id + "|" + razorpay_payment_id ;
        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(sign.toString()).digest("hex");

        // Now macthing -
        if (expectedSignature === razorpay_signature){

            const order = await Orders.findOneAndUpdate(
                {razorpayOrderId : razorpay_order_id},
                 {
                    status :"Paid",
                    deliveryStatus : "Order Placed",
                    isPaid : true,
                    razorpayPaymentId : razorpay_payment_id,
                    razorpaySignature : razorpay_signature
                },
                {new : true}
            );

            return  res.status(200).json({ message:"Payment Successfull!", order : order, success : true });
        }else{
            await Orders.findOneAndUpdate(
                {razorpayOrderId : razorpay_order_id},
                {
                    status :"Failed",
                    isPaid : false
                },
                {new : true}
            );

            return res.status(400).json({ message: "Invalid RazorPay Signature!", success : false});
        }
    
        
    } catch (error) {
         console.error("Error In RazorPay Verify Payment:", error);
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
