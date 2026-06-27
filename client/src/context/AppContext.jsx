import { createContext, use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast"
import axios from 'axios'



axios.defaults.withCredentials = true ;

// Base URL of Backend adding here -

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;







export const AppContext = createContext(null);

const AppContextProvider = ({children})=>{

        const navigate = useNavigate();
        const [user, setUser] = useState(null);
        const [isSeller, setIsSeller] = useState(null);
        const [showUserLogin, setShowUserLogin] = useState(false);
        const [products, setProducts] = useState([])
        const [cartItems, setCartItems] = useState({})
        const [searchQuery, setSearchQuery] = useState("")

        // console.log("CartItems : ", cartItems)

    
        // Fetch all Products Data -
        const fetchProductsData = async ()=>{
                setProducts(dummyProducts)
        }

        useEffect(()=>{
                fetchProductsData();
        },[])


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