import React, { useEffect, useState } from "react";
import { dummyOrders } from "../assets/assets.js";

function MyOrder() {
  const [myOrders, setMyOrders] = useState([]);

  const fetchOrders = async () => {
    setMyOrders(dummyOrders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="mt-8 md:mt-12 pb-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl md:text-3xl font-semibold mb-8">My Orders</h1>

      {myOrders.map((order, index) => (
        <div
          key={index}
          className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-xl shadow-sm mb-8 overflow-hidden"
        >
          {/* Order Header */}
          <div className="p-4 md:p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-between gap-3 text-sm md:text-base font-medium">
              <p>
                <span className="text-gray-500">Order ID:</span>{" "}
                <span className="break-all">{order._id}</span>
              </p>

              <p>
                <span className="text-gray-500">Payment:</span>{" "}
                {order.paymentType}
              </p>

              <p>
                <span className="text-gray-500">Total:</span> ${order.amount}
              </p>
            </div>
          </div>

          {/* Order Items */}
          {order.items.map((item, itemIndex) => (
            <div
              key={itemIndex}
              className={`flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 p-4 md:p-6 ${
                itemIndex !== order.items.length - 1
                  ? "border-b border-gray-200"
                  : ""
              }`}
            >
              {/* Left Section */}
              <div className="flex items-center gap-4">
                <img
                  src={item.product.image[0]}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-md border"
                />

                <div>
                  <h2 className="text-lg md:text-xl font-semibold">
                    {item.product.name}
                  </h2>

                  <p className="text-gray-500 text-sm md:text-base">
                    {item.product.category}
                  </p>
                </div>
              </div>

              {/* Middle Section */}
              <div className="text-sm md:text-base font-medium space-y-1">
                <p>
                  <span className="text-gray-500">Quantity:</span>{" "}
                  {item.quantity}
                </p>

                <p>
                  <span className="text-gray-500">Status:</span> {order.status}
                </p>

                <p>
                  <span className="text-gray-500">Date:</span>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Right Section */}
              <div className="text-lg md:text-xl font-semibold text-green-600">
                ${item.product.offerPrice * item.quantity}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default MyOrder;
