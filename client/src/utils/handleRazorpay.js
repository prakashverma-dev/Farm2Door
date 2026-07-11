
import { loadRazorpay } from "./openRazorpaySDK.js";

import axios from "axios";
import toast from "react-hot-toast";



handleRazorpay = async (data)=>{

                const options={
                        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

                        amount:data.razorpayOrder.amount,

                        currency:data.razorpayOrder.currency,

                        order_id:data.razorpayOrder.id,

                        name:"Farm2Door",

                        description:"Order Payment",

                        handler: async function(razorpayOrderObj){
                                                
                            const {data} = await axios.post("/api/order/verify-payment", razorpayOrderObj);

                            if(data.success){
                                toast.success(`✅ ${data.message}`);
                                setCartItems({});
                                navigate("/my-orders");
                           
                            }

                        },
                        modal :{                 
                           
                            ondismiss : async function () {
                                
                                 await axios.post("/api/order/verify-payment", {
                                    razorpay_order_id : data.razorpayOrder.id,
                                    paymentFaild : true
                                 });

                                 toast.error("Payment Cancelled or Failed!");
                                }
                        },
                       
                    };

                    const res = await loadRazorpay();
                    
                    if (!res) {
                        toast.error("Failed to load Razorpay SDK");
                        return;
                    }
                    const rzp = new window.Razorpay(options);

                    
                    rzp.on("Payment Failed", async function (res) {

                        await axios.post("/api/order/verify-payment",{
                             razorpay_order_id : data.razorpayOrder.id,
                             paymentFaild : true
                        });

                        toast.error("Payment Failed,")
                    })

                 
                    rzp.open();

}
