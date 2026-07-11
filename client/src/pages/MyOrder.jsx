import React, { useContext, useEffect, useState } from "react";
import { assets, dummyOrders } from "../assets/assets.js";
import { AppContext } from "../context/AppContext.jsx";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function MyOrder() {
  const [myOrders, setMyOrders] = useState([]);
  const {axios, user, setCartItems, navigate} = useContext(AppContext);

  const fetchOrderDetails = async () => {
    // setMyOrders(dummyOrders);
    try {
      const {data} = await axios.get("/api/order/details");

      if(data.success){
          setMyOrders(data.orderDetails);
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
  };

  useEffect(() => {
    if(user){
          fetchOrderDetails();
    }
  }, [user]);

  // Buy again -
  const buyAgain = (order) => {

    const newCart = {};

    order.items.forEach(item => {
        newCart[item.product._id] = item.quantity;
    });

    setCartItems(newCart);

    navigate("/cart");
    scrollTo(0, 0);

};




return (
  <div className="mt-8 md:mt-12 pb-16 px-4 sm:px-6 lg:px-8">
    <h1 className="text-2xl md:text-3xl font-semibold mb-8">
      My Orders
    </h1>

    {myOrders.length === 0 ? (
      <div className="flex flex-col items-center justify-center py-10">
        <img
          src={assets.empty_orders}
          alt="No Orders"
          className="w-52 mb-6"
        />

        <h2 className="text-2xl font-semibold text-gray-700">
          No Orders Placed
        </h2>

        <p className="mt-2 text-center text-gray-500">
          Looks like you haven't placed any orders yet.
        </p>

        <p className="text-gray-500">
          Start shopping to see your orders here.
        </p>

        <Link
          to="/products"
          className="mt-6 bg-primary-btn hover:bg-primary-hover-btn text-white px-6 py-3 rounded-lg transition"
        >
          Continue Shopping
        </Link>
      </div>
    ) : (
      myOrders.map((order) => (
        <div
          key={order._id}
          className="max-w-5xl mx-auto rounded-xl border border-gray-200 shadow-sm bg-white overflow-hidden mb-8"
        >
          {/* Amazon Style Header */}
          <div className="bg-gray-100 border-b border-gray-200 px-6 py-5">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">

              {/* Order Date */}
              <div>
                <p className="text-xs uppercase font-semibold text-gray-500">
                  Order Placed
                </p>

                <p className="font-semibold text-gray-800">
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>

              {/* Total */}
              <div>
                <p className="text-xs uppercase font-semibold text-gray-500">
                  Total Amount
                </p>

                <p className="text-xl font-bold text-green-600">
                  ₹{order.amount}
                </p>
              </div>

              {/* Payment */}
              <div>
                <p className="text-xs uppercase font-semibold text-gray-500">
                  Payment
                </p>

                <p className="font-semibold text-gray-800">
                  {order.paymentMethod}
                </p>
              </div>

              {/* Status */}
              <div>
                <p className="text-xs uppercase font-semibold text-gray-500">
                  Status
                </p>

                <span
                  className={`inline-flex mt-1 px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  ● {order.status}
                </span>
              </div>

              {/* Order ID */}
              <div>
                <p className="text-xs uppercase font-semibold text-gray-500">
                  Order #
                </p>

                <p className="font-semibold text-gray-800">
                  #{order._id.slice(-8).toUpperCase()}
                </p>
              </div>
            </div>
          </div>

          {/* Products */}
          {order.items.map((item) => (
            <div
              key={item.product._id}
              className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 p-5 border-b last:border-b-0"
            >
              {/* Left */}
              <div className="flex items-center gap-4">
                <img
                  src={item.product.image[0]}
                  alt={item.product.name}
                  className="w-24 h-24 rounded-lg border object-cover"
                />

                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.product.name}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    Category : {item.product.category}
                  </p>

                  <p className="text-gray-500">
                    Quantity : {item.quantity}
                  </p>
                </div>
              </div>

              {/* Right */}
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  Item Price
                </p>

                <p className="text-2xl font-bold text-green-600">
                  ₹{item.product.offerPrice * item.quantity}
                </p>
              </div>
            </div>
          ))}

          {/* Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 px-6 py-4 bg-gray-50">
            <p className="text-sm text-gray-500">
              {order.items.length} Item
              {order.items.length > 1 ? "s" : ""}
            </p>

            <div className="flex gap-3">
              {/* <button className="border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-lg transition">
                View Details
              </button> */}

              <button onClick={()=> buyAgain(order)} className="bg-primary-btn hover:bg-primary-hover-btn text-white px-4 py-2 rounded-lg transition">
                Buy Again
              </button>
            </div>
          </div>
        </div>
      ))
    )}
  </div>
);
}

export default MyOrder;
