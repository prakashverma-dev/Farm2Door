import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext.jsx';
import toast from 'react-hot-toast';
import { loadRazorpay } from '../utils/openRazorpaySDK.js';

function useRazorpay() {

     const { navigate, setCartItems, axios } = useContext(AppContext);

     const handleRazorpay = async (razorpayOrder) => {

        const options = {

                key: import.meta.env.VITE_RAZORPAY_KEY_ID,

                amount: razorpayOrder.amount,

                currency: razorpayOrder.currency,

                order_id: razorpayOrder.id,

                name: "Farm2Door",

                description: "Order Payment",

                // To verify Payment -
                handler: async function (response) {

                    //  console.log("Payment Details :", response); // We get RazorPay Payment details
                            // after receiving the payment details we can send for verification via again API call here - Inside Response we recived three parameters -
                            // response.razorpay_payment_id
                            // response.razorpay_order_id
                            // response.razorpay_signature     

                        const { data } = await axios.post("/api/order/verify-payment", response);

                        if (data.success) {

                            toast.success(data.message);
                            setCartItems({});
                            navigate("/order-success");
                        }          
                },

                // Handle user closing the pop-up
                modal: {

                    ondismiss: async function () {
    
                        await axios.post("/api/order/verify-payment", {
                            razorpay_order_id: razorpayOrder.id,
                            paymentFailed: true,
                        });

                          toast.error("Payment Cancelled");
                        }

                },

                // prefill:{
                        //     // name: `${selectedAddress.firstName} + ${selectedAddress.lastName}`,
                        //     // email: selectedAddress.email,
                        //     // contact: selectedAddress.phone
                        //     name: user.lastName,
                        //     email: user.email,
                        //     contact: user.phone
                        // },

                theme: {

                    color: "#16a34a",

                },

             };
        
        //Load Open RazorPay SDK -
        const res = await loadRazorpay();
            if (!res) {
                toast.error("Failed to load Razorpay SDK");
                return;
            }

        const rzp = new window.Razorpay(options);
        
        // Listen for Payment Failure -
        rzp.on("payment.failed", async function () {

            try {

                await axios.post("/api/order/verify-payment", {

                    razorpay_order_id: razorpayOrder.id,

                    paymentFailed: true,

                });

            } catch (error) {

                console.log(error);

            }

            toast.error("Payment Failed,  Please Try again");

        });

        // Finally to open Razorpay SDK Popup -
        rzp.open();

    };

    return { handleRazorpay };


}

export default useRazorpay;