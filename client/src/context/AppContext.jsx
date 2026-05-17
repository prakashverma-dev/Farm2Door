import { createContext, use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";


export const AppContext = createContext(null);



const AppContextProvider = ({children})=>{

        const navigate = useNavigate();
        const [user, setUser] = useState(null);
        const [isSeller, setIsSeller] = useState(null);
        const [showUserLogin, setShowUserLogin] = useState(false);
        const [products, setProducts] = useState([])

        const value = {navigate, user, setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin, products, };

        // Fetch all Products Data -
        const fetchProductsData = async ()=>{
                setProducts(dummyProducts)
        }

        useEffect(()=>{
                fetchProductsData();
        },[])

        return (
                <AppContext.Provider value={value}>
                        {children}
                </AppContext.Provider>
        )
}

export default AppContextProvider;