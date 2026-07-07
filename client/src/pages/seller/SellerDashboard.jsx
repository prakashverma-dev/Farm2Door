import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets';
import { NavLink, Outlet } from 'react-router-dom';
import toast from 'react-hot-toast';

function SellerDashboard() {

    const {isSeller, setIsSeller, navigate, axios, sellerInfo} = useContext(AppContext);

    const sidebarLinks = [
        { name: "Add Product", path: "/seller", icon: assets.add_icon },
        { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
        { name: "Orders", path: "/seller/orders", icon: assets.order_icon},
    ];

    const logout = async (req, res)=>{

        // Without backend -
        //  setIsSeller(false);
        //  navigate("/seller");

        try {
                  const {data} = await axios.get("/api/seller/logout");

                  if(data.success){

                        setIsSeller(false);              
                        navigate("/seller");
                        toast.success(data.message);
                      
                  }
            
        } catch (error) {
                          
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

    return (
        <>
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
                 
        <h1 onClick={()=> navigate("/")} className="cursor-pointer text-2xl font-bold text-orange-400 ">🌱Farm2Door</h1>
      
                <div className="flex items-center gap-5 text-gray-500">
                    <p>Hi! {sellerInfo?.name} </p>
                    <button onClick={logout} className='border rounded-full text-sm px-4 py-1 cursor-pointer'>Logout</button>
                </div>
            </div>

            <div className='flex'>

              <div className="md:w-64 w-16 border-r h-[550px] text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
                {sidebarLinks.map((item) => (
                    <NavLink to={item.path} key={item.name} end={item.path === "/seller"}
                        className={({ isActive }) => `flex items-center py-3 px-4 gap-3 
                            ${
                              isActive
                                ? "border-r-4 md:border-r-[6px] bg-indigo-500/10 border-indigo-500 text-indigo-500"
                                : "hover:bg-gray-100/90 border-white "
                            }`}
                    >
                        <img src={item.icon} alt="" className="w-7 h-7" />
                        
                        <p className="md:block hidden text-center">{item.name}</p>
                    </NavLink>
                ))}
              </div>

              <Outlet/>

            </div>
       

        </>
    );
};

export default SellerDashboard

