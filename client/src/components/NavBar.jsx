import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

function NavBar() {
  const [open, setOpen] = React.useState(false);
  const { user, setUser, navigate, setShowUserLogin, cartCount, searchQuery, setSearchQuery  } = useContext(AppContext);

  const [showDropDown, setShowDropDown] = useState(false);

  useEffect(()=>{

    if (searchQuery.length > 0){
          navigate("/products")

    }

  }, [searchQuery])


  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <Link to={"/"} onClick={()=> setOpen(false)}>
        <h1 className="text-2xl font-bold text-orange-400">🌱Farm2Door</h1>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <Link to={"/"}>Home</Link>
        <Link to={"/products"}>Products</Link>
        <Link to={"/contact"}>Contact</Link>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input onChange={(e)=> setSearchQuery(e.target.value)}
            value={searchQuery}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.836 10.615 15 14.695"
              stroke="#7A7B7D"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              clipRule="evenodd"
              d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783"
              stroke="#7A7B7D"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div> 

        <div className="relative cursor-pointer" onClick={()=> navigate("/cart")}>
   
          <img src={assets.cart_icon} alt="cart-icon" className="w-6 h-6"/>

          <button className="absolute -top-2 -right-3 text-xs text-white bg-green-600 w-[18px] h-[18px] rounded-full">
            {cartCount()}
          </button>
        </div>

        {user ? (
          <div className="relative group">
            <img
              src={assets.profile_icon}
              alt="profile-icon"
              className="w-10"
            />
            <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow-md rounded-md border border-gray-200 py-2 w-32 z-40 text-sm">
              <li
                onClick={() => navigate("/myorder")}
                className="p-1.5 cursor-pointer"
              >
                My Orders
              </li>
              <li
                onClick={() => {
                  setUser(null);
                  navigate("/");
                }}
                className="p-1.5 cursor-pointer"
              >
                Logout
              </li> 
            </ul>
          </div>
        ) : (
          <button   onClick={() => {
              setOpen(false);
              setShowUserLogin(true); 
            }} className="cursor-pointer px-8 py-2 bg-green-700 hover:bg-green-900 transition text-white rounded-full">
            Login
          </button>
        )}
      </div>

      
      <div className="flex items-center gap-6 md:hidden">
        <div
          className="relative cursor-pointer"
          onClick={() => {
            navigate("/cart");
            setOpen(false)} }
        >
          <img src={assets.cart_icon} alt="cart-icon" className="w-6 h-6"/>
          <button className="absolute -top-2 -right-3 text-xs text-white bg-green-600 w-[18px] h-[18px] rounded-full">
            {cartCount()}
          </button>
        </div>
        <button
          onClick={() => (open ? setOpen(false) : setOpen(true))}
          aria-label="Menu"
          className="sm:hidden"
        >
          {/* Menu Icon SVG */}
          <svg
            width="21"
            height="15"
            viewBox="0 0 21 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="21" height="1.5" rx=".75" fill="#426287" />
            <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
            <rect
              x="6"
              y="13"
              width="15"
              height="1.5"
              rx=".75"
              fill="#426287"
            />
          </svg>
        </button>
      </div>

  

      {/* Mobile Menu */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden z-100`}
      >
        <Link onClick={() => setOpen(false)} to={"/"} >
          Home
        </Link>
        <Link onClick={() => setOpen(false)} to={"/products"} >
          Products
        </Link>
        <Link onClick={() => setOpen(false)} to={"/contact"} >
          Contact
        </Link>
        {user ? (
          <div className="relative group" >
            <img
              src={assets.profile_icon}
              alt="profile-icon"
              className="w-10"
              onClick={() => setShowDropDown(!showDropDown)}
            />

            {showDropDown && (
                <ul className="group-hover:block absolute top-10 left-0 bg-white shadow-md rounded-md border border-gray-200 py-2 w-32 z-50 text-sm">
              <li
                onClick={() => {  
                  navigate("/myorder");
                  setOpen(false);
                } }
                className="p-1.5 cursor-pointer"
              >
                My Orders
              </li>
              <li
                onClick={() => {
                  setUser(null);
                  setOpen(false);
                  navigate("/");
                }}
                className="p-1.5 cursor-pointer"
              >
                Logout
              </li> 
            </ul>
            ) }
          
          </div>
        )  : (  <button   onClick={() => {
             
            setOpen(false);
            setShowUserLogin(true);
            }} className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm">
          Login
        </button>)}
      
      </div>
    </nav>
  );
}

export default NavBar;
