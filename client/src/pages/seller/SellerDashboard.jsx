import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import { NavLink, Outlet } from "react-router-dom";
import toast from "react-hot-toast";

function SellerDashboard() {
  const { setIsSeller, navigate, axios, sellerInfo } =
    useContext(AppContext);

  const sidebarLinks = [
    {
      name: "Add Product",
      path: "/seller",
      icon: assets.add_icon,
    },
    {
      name: "Product List",
      path: "/seller/product-list",
      icon: assets.product_list_icon,
    },
    {
      name: "Orders",
      path: "/seller/orders",
      icon: assets.order_icon,
    },
  ];

  const logout = async () => {

    // Without backend - 
    // setIsSeller(false); 
    // navigate("/seller");
    
    try {
      const { data } = await axios.get("/api/seller/logout");

      if (data.success) {
        setIsSeller(false);
        navigate("/seller");
        toast.success(data.message);
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* NAvBar */}
      <header className="flex items-center justify-between border-b border-gray-300 bg-white px-4 sm:px-6 lg:px-8 py-3">
        <h1
          onClick={() => navigate("/")}
          className="cursor-pointer text-xl sm:text-2xl font-bold text-orange-400"
        >
          🌱Farm2Door
        </h1>

        <div className="flex items-center gap-2 sm:gap-5">
          <p className="hidden sm:block text-gray-600 text-sm md:text-base">
            Hi! {sellerInfo?.name}
          </p>

          <button
            onClick={logout}
            className="border rounded-full px-3 sm:px-4 py-1 text-sm hover:bg-gray-100 transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1">
        {/* Left Side */}
        <aside className="w-16 md:w-64 border-r border-gray-300 bg-white flex flex-col py-4 shrink-0">
          {sidebarLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/seller"}
              className={({ isActive }) =>
                `flex items-center justify-center md:justify-start gap-3 px-4 py-3 transition-all duration-200
                ${
                  isActive
                    ? "bg-indigo-50 border-r-4 md:border-r-[6px] border-indigo-500 text-indigo-600"
                    : "hover:bg-gray-100"
                }`
              }
            >
              <img
                src={item.icon}
                alt={item.name}
                className="w-6 h-6 md:w-7 md:h-7"
              />

              <span className="hidden md:block font-medium whitespace-nowrap">
                {item.name}
              </span>
            </NavLink>
          ))}
        </aside>

        {/* Right Side */}
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div> 
  );
}

export default SellerDashboard;