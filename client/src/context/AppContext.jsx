import { createContext, use, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast"
import axios from 'axios'


// To send cookies in API request -
axios.defaults.withCredentials = true ;
// Base URL of Backend adding here -
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;






// Context API Setup -

export const AppContext = createContext(null);

const AppContextProvider = ({children})=>{

        const navigate = useNavigate();
        const location = useLocation();
        const [user, setUser] = useState(null);
        const [isSeller, setIsSeller] = useState(false);
        const [showUserLogin, setShowUserLogin] = useState(false);
        const [products, setProducts] = useState([])
        const [cartItems, setCartItems] = useState({}) 
        const [searchQuery, setSearchQuery] = useState("");
        const [sellerInfo, setSellerInfo] = useState(null);

        // console.log("CartItems : ", cartItems);
        // console.log("Products : ", products);
        
        // Fetch Seller Status, Is seller Authorized or not means seller loggined or not -
        const checkSellerAuth = async ()=>{
                try {
                       const {data} = await axios.get("/api/seller/is-auth");

                       if(data.success){
                                setIsSeller(true);
                                setSellerInfo(data.seller)
                       }

                } catch (error) {
     
                    if (error.response) {
                        // Backend responded with an error status (400, 401, 500...)
                        setIsSeller(false);

                    } else if (error.request) {
                        // Request was made but no response received (e.g., server is down) 
                        toast.error(error.message);
                        setIsSeller(false);
                    } else {
                        // Something else happened
                        toast.error(error.message);
                        setIsSeller(false);
                    }
                    
                }
        }

        //Fetch USer Auth Status -/also get  user data and cart Item -
        
        const checkUserAuth = async ()=>{
                try {
                       const {data} = await axios.get("/api/user/is-auth"); 

                       if(data.success){
                                setUser(data.user);
                                setCartItems(data.user.cartItems); //To fetch repective user cart Item from database.
                       }

                } catch (error) {
     
                    if (error.response) {
                        // Backend responded with an error status (400, 401, 500...)
                        setUser(null);

                    } else if (error.request) {
                        // Request was made but no response received (e.g., server is down) 
                        toast.error(error.message);
                        setUser(null)
                    } else {
                        // Something else happened
                        toast.error(error.message);
                        setUser(null)
                    }
                    
                }
        }

    
        // Fetch all Products Data -
        const fetchProductsData = async ()=>{
                // setProducts(dummyProducts)

                try {
                   const {data} = await axios.get("/api/product/list-products");
                   if(data.success){

                        // console.log(data.products)
                        setProducts(data.products);
                   }
                    
                } catch (error) {

                        setProducts(dummyProducts)

                   
                        if (error.response) {
                        // Backend responded with an error status (400, 401, 500...)
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

        // Fetches products at Page Refresh at every routes -
        useEffect(()=>{
                fetchProductsData();
                
        },[])

  
        // Checks seller authentication at /seller route only -
        useEffect(() => {
                if (location.pathname.startsWith("/seller")) {
                        checkSellerAuth();
                }else{
                     checkUserAuth();    //Except seller Route Authe it get executed at every routes.
                }
        }, [location.pathname]);


        // Actually we sending/creating the updated Cart Item from frontend to respective user database -
        useEffect(()=>{
                
                const updateCartItems = async ()=>{
                        try {
                              const {data}= await axios.post("/api/cart/update", {
                                cartItems : cartItems
                              })  
                              
                              if(!data.success){
                                toast.error(data.message)
                              }


                        } catch (error) {

                             if (error.response) {         
                                toast.error(error.response.data.message);
                              } else if (error.request) {
                                        toast.error(error.message);
                        
                             } else {
                                        toast.error(error.message);
                                }  
                                
                        }
                };

                // When user is loggedin then call this -
                if(user){
                        updateCartItems();
                }
        }, [cartItems])



        // Cart Functionality Functions -

        // Add to product to cart -
        const addToCart = (itemId)=>{

                let cartData = structuredClone(cartItems)

                if (cartData[itemId]){
                     cartData[itemId] += 1   
                }else{
                     cartData[itemId] = 1
                }

                setCartItems(cartData);
                toast.success("Added to Cart")
        }

        // update cart Item quantity -
        const updateCartItem = (itemId, quantity)=>{

                let cartData = structuredClone(cartItems); //To create a copy of it.

                cartData[itemId] = quantity;
                setCartItems(cartData);
                toast.success("Item Updated Successfully")
        }

        // total cart items
        const cartCount = ()=>{
                let totalCount = 0;
                for (const item in cartItems){
                        totalCount += cartItems[item]
                }

                return totalCount;
        }

        // total cart amount -
        const totalCartAmount = ()=>{
                let totalAmount = 0

                for(const items in cartItems){
      
                        let itemInfo = products.find(item=> item._id === items);
                        
                        if(cartItems[items] > 0){
                                totalAmount += cartItems[items] * itemInfo.offerPrice;

                        }
                }

                return Math.floor(totalAmount*100) / 100;

        };

        // Remove product from cart
        const removeFromCart = (itemId)=>{

                let cartData = structuredClone(cartItems)
                if(cartData[itemId]){
                        cartData[itemId] -= 1
                        if (cartData[itemId] === 0 ){
                                delete cartData[itemId]
                        }
                        toast('Item Removed from Cart', {
                                icon: '🗑️',
                                });
                        setCartItems(cartData)
                }
        }


        const value = {navigate, user, setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin, products, setProducts, cartItems, setCartItems, addToCart, updateCartItem, cartCount, totalCartAmount, removeFromCart, searchQuery, setSearchQuery, axios, fetchProductsData, sellerInfo  };

        return (
                <AppContext.Provider value={value}>
                        {children}
                </AppContext.Provider>
        )
}

export default AppContextProvider;