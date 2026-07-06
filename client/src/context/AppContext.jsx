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
        const [searchQuery, setSearchQuery] = useState("")

        // console.log("CartItems : ", cartItems);


        // Fetch Seller Status, Is seller Authorized or not means seller loggined or not -
        const checkSellerAuth = async ()=>{
                try {
                       const {data} = await axios.get("/api/seller/is-auth");

                       if(data.success){
                                setIsSeller(true);
                       }

                } catch (error) {
     
                    if (error.response) {
                        // Backend responded with an error status (400, 401, 500...)
                        // console.log("Backend sent a failure flag 400 or 500, Inside Data :", error.response);
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
    
        // Fetch all Products Data -
        const fetchProductsData = async ()=>{
                setProducts(dummyProducts)
        }

        // Fetches products at Page Refresh 
        useEffect(()=>{
                fetchProductsData();
        },[])

        // Checks seller authentication only at /seller route -
        useEffect(() => {
                if (location.pathname.startsWith("/seller")) {
                        checkSellerAuth();
                }
        }, [location.pathname]);



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


        const value = {navigate, user, setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin, products, setProducts, cartItems, addToCart, updateCartItem, cartCount, totalCartAmount, removeFromCart, searchQuery, setSearchQuery, axios  };

        return (
                <AppContext.Provider value={value}>
                        {children}
                </AppContext.Provider>
        )
}

export default AppContextProvider;