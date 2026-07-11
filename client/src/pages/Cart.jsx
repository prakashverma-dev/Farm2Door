import React, { useContext, useEffect, useState } from 'react'
import { assets, categories, dummyAddress } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import useRazorpay from '../customhook/useRazorpay.jsx';




function Cart() {

  const { products, navigate, cartItems, setCartItems, updateCartItem, cartCount, totalCartAmount, removeFromCart, axios, user }  = useContext(AppContext);

  // state to store the products available in cart -
  const [cartData, setCartData] = useState([]);
//   console.log("cartData : ", cartData) 

  // State to store all addresses added by user -
  const [addresses, setAddresses] = useState([])
  const [showAddress, setShowAddress] = useState(false)
   // State to store selected address -
  const [selectedAddress, setSelectedAddress] = useState(null)
  // For payment 
  const [paymentOption, setPaymentOption] = useState('COD')

  const { handleRazorpay } = useRazorpay();


  //  LEFT SECTION // To get cart data  -
  const getCart =()=>{

    let temp = [];
    for(const key in cartItems){
      const product = products.find(item=> item._id === key);
      product.quantity = cartItems[key];
      temp.push(product)
    }

    setCartData(temp);
  };

  useEffect(()=>{
    if(products.length > 0 && cartItems){
        getCart();
    }
  }, [products, cartItems]);




//  RIGHT SECTION // TO get User Added address -

const getUserAddress = async ()=>{
    try {
        const {data}= await axios.get("/api/address/get");
        if(data.success){
            setAddresses(data.addresses);

            // if any address present for that user -
            if(data.addresses.length > 0){
                setSelectedAddress(data.addresses[0]);
            }
        }
    } catch (error) {
       if (error.response) {
                        // Backend responded with an error status (400, 401, 500...)
                        // toast.error(error.response.data.message);

                    } else if (error.request) {
                        // Request was made but no response received (e.g., server is down) 
                        toast.error(error.message);
              
                    } else {
                        // Something else happened
                        toast.error(error.message);
                    }  
                }
}

useEffect(()=>{
    if(user){
        getUserAddress();
    }
},[user])



// To Place order Either COD or Online Payment -

const placeOrder = async ()=>{
        try {
            if(!selectedAddress){
                toast.error("Please Select an Address!")
            }

            // TO Place COD Order Only -
            if(paymentOption === "COD"){

                const {data} = await axios.post("/api/order/cod",{
                    items : cartData.map((item)=>({
                        product : item._id,
                        quantity : item.quantity
                    })),
                    address : selectedAddress
                });

                if(data.success){
                    toast.success(data.message);
                    setCartItems({});
                    navigate("/order-success")
                }

            }else{

                // Means online Payment -
                const {data} = await axios.post("/api/order/create-razorpay-order",{
                    items : cartData.map((item)=>({
                        product : item._id,
                        quantity : item.quantity
                    })),
                    address : selectedAddress
                });

                if(data.success){
                    // After sucessfull order initiation, we recive the rajorpay order details to proceed, then we open the RAZOR Pay, with providing it options -
                    
                    // Show Razorpay payment popup
                    console.log("RazorPayOrderDetails : ", data.razorpayOrder);


                    handleRazorpay(data.razorpayOrder);

                }
            }

        } catch (error) {
       
                    if (error.response) {
                        toast.error(error.response.data.message);

                    } else if (error.request) {
                        // Request was made but no response received (e.g., server is down) 
                        toast.error(error.message);
              
                    } else {
                        // Something else happened
                        toast.error(error.message);
                    }  
                
        }
}


  return (
    products.length > 0 && cartItems ?
    
    (
       <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
            <div className='flex-1 max-w-4xl'>
                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart <span className="text-sm text-green-600 ">{cartCount()} Items</span>
                </h1>
                {cartCount() > 0 ? (
                        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>
                ) : (  <div className="min-h-[64vh] flex flex-col items-center justify-center text-center px-4 md:pl-42">
                        <img
                            src={assets.empty_cart}
                            alt="Empty Cart"
                            className="w-45 mb-6"
                        />

                        <h2 className="text-3xl font-medium text-gray-800 mb-2">
                            Your Cart is Empty!
                        </h2>

                        <p className="text-gray-500 max-w-md mb-6">
                            Looks like you haven't added any fresh products to your cart yet.
                        </p>

                        <button onClick={()=> {
                    navigate("/products");
                    scrollTo(0,0);
                    
                    }} className="bg-primary-txt hover:bg-green-700 text-white px-6 py-3 rounded-lg transition">
                            Continue Shopping ...
                        </button>
                        </div> )
                    
                    }
        
                {cartData.map((product, index) => (
                    <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                        <div className="flex items-center md:gap-6 gap-3">
                            <div onClick={()=> {
                                navigate(`categorydetail/${product.category.toLowerCase()}`); 
                                scrollTo(0,0);
                                }} className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden">
                                <img className="max-w-full h-full object-cover" src={product.image[0]} alt={product.name} />
                            </div>
                            <div>
                                <p className="hidden md:block font-semibold">{product.name}</p>
                                <div className="font-normal text-gray-500/70">
                                    <p>Weight: <span>{product.weight || "N/A"}</span></p>
                                    <div className='flex items-center'>
                                        <p>Qty:</p>
                                     <select
                                        onChange={(e)=>
                                        updateCartItem(product._id, Number(e.target.value)) }
                                        value={cartItems[product._id]}
                                        className="outline-none"
                                            >

                                        { Array(cartItems[product._id] > 9 ? cartItems[product._id] : 9)

                                        .fill("")
                                        .map((_, index) => (
                                        <option key={index} value={index + 1}>
                                            {index + 1}
                                        </option>
                                        ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center">₹{product.offerPrice * product.quantity}</p>
                        <button onClick={()=> removeFromCart(product._id)} className="cursor-pointer mx-auto">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0" stroke="#FF532E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>)
                )}

                {cartCount() > 0 && 
                <button onClick={()=> {
                    navigate("/products");
                    scrollTo(0,0);
                    
                    }} className="group cursor-pointer flex items-center mt-6 pt-2 gap-2 text-primary-txt font-medium">
                    <img src={assets.arrow_right_icon_colored} alt="" className="transition group-focus:translate-x-1" />
                    Continue Shopping
                </button> }
          

            </div>
            { cartCount() > 0  &&
            (  
            <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
             
                <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
                <hr className="border-gray-300 my-5" />

                <div className="mb-6">
                    <p className="text-sm font-medium uppercase">Delivery Address</p>
                    <div className="relative flex justify-between items-start mt-2">
                        <p className="text-gray-500">
                            {selectedAddress ? `${selectedAddress.street}, ${selectedAddress.city},${selectedAddress.state}, ${selectedAddress.country}, ${selectedAddress.zipCode} Phone : ${selectedAddress.phone}` : "No Address Added" }
                        </p>
                        <button onClick={() => setShowAddress(!showAddress)} className="text-green-600 hover:underline cursor-pointer">
                            Change
                        </button>
                        {showAddress && (
                            <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">

                                {addresses.map( (address, index)=>{
                                    return (
                                        <p key={index} onClick={()=>{
                                            setSelectedAddress(address);
                                            setShowAddress(false)
                                        }} className="text-gray-500 p-2 hover:bg-gray-100 cursor-pointer">

                                            {address.street}, {address.city}, {address.state}, {address.country}, {address.zipCode} <br />
                                            Phone : {address.phone}

                                        </p>
                                    )
                                    
                                } )}

                                <p onClick={() => navigate("/add-address") } className="text-green-600 font-medium text-center cursor-pointer p-2 hover:bg-indigo-500/10">
                                    Add Address
                                </p>
                            </div>
                        )}
                    </div>

                    <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

                    <select onChange={(e)=>setPaymentOption(e.target.value) } className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
                        <option value="COD">Cash On Delivery</option>
                        <option value="Online">Online Payment</option>
                    </select>
                </div>

                <hr className="border-gray-300" />

                <div className="text-gray-500 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Price</span><span>₹{totalCartAmount()}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Shipping Fee</span><span className="text-green-600">Free</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Tax (2%)</span><span>₹{(totalCartAmount() * 2) / 100 }</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Total Amount:</span><span>₹{totalCartAmount() + (totalCartAmount() * 2) / 100}</span>
                    </p>
                </div>

                <button onClick={placeOrder} className={`w-full py-3 mt-6 cursor-pointer text-white font-medium transition ${
                        paymentOption === "COD"
                            ? "bg-primary-btn hover:bg-primary-hover-btn"
                            : "bg-green-600 hover:bg-green-700"
                        }`}>
                       {paymentOption === 'COD' ? "Place Order" : "Pay Now"} 
                </button>
            </div>

            )}
        </div>
    ): null

  )}


export default Cart