import React, { useContext, useEffect, useState } from 'react'
import { assets, dummyOrders } from '../../assets/assets.js';
import { AppContext } from '../../context/AppContext.jsx';

function Orders() {

    const [allOrders, setAllOrders] = useState([]);
    const {axios} = useContext(AppContext);

    

    const fetchOrders = async () =>{
        // setAllOrders(dummyOrders);
        try {

           const {data} = await axios.get("/api/order/all-details");
           if(data.success){
            setAllOrders(data.allOrders);
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

    useEffect(()=>{
      fetchOrders();
    },[]);


    return (
  <div className="p-4 md:p-8 flex-1">
    <h2 className="text-2xl font-semibold mb-6">Orders List</h2>

    {/* Desktop Header */}
    <div className="hidden md:grid md:grid-cols-[2fr_2fr_1fr_1.2fr] gap-5 px-5 py-3 bg-gray-100 rounded-md border border-gray-300 font-semibold text-gray-700 mb-3">
      <p>Product</p>
      <p>Shipping Details</p>
      <p>Amount</p>
      <p>Order Details</p>
    </div>

    <div className="space-y-4">
      {allOrders.map((order, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-lg p-5 md:grid md:grid-cols-[2fr_2fr_1fr_1.2fr] gap-5 items-start bg-white"
        >
          {/* Product */}
          <div>
            {/* Mobile Title */}
            <h3 className="md:hidden font-semibold text-gray-700 mb-2">
              Product
            </h3>

            <div className="flex gap-4">
              <img
                src={order.items[0].product.image}
                alt=""
                className="w-14 h-14 rounded object-cover"
              />

              <div className="space-y-1">
                {order.items.map((item, i) => (
                  <p key={i} className="font-medium">
                    {item.product.name}

                    {item.quantity > 0 && (
                      <span className="text-indigo-600">
                        {" "}
                        × {item.quantity}
                      </span>
                    )}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Customer */}
          <div>
            <h3 className="md:hidden font-semibold text-gray-700 mt-5 mb-2">
              Shipping Details
            </h3>

            <p className="font-semibold">
              {order.address.firstName} {order.address.lastName}
            </p>

            <p className="text-sm text-gray-600">
              {order.address.street},
              <br />
              {order.address.city}, {order.address.state}
              <br />
              {order.address.country} - {order.address.zipCode}
            </p>

            <p className="text-sm mt-2">
              <span className="font-medium">Phone:</span>{" "}
              {order.address.phone}
            </p>
          </div>

          {/* Amount */}
          <div>
            <h3 className="md:hidden font-semibold text-gray-700 mt-5 mb-2">
              Amount
            </h3>

            <p className="text-xl font-bold text-green-600">
              ₹{order.amount}
            </p>
          </div>

          {/* Order Details */}
          <div>
            <h3 className="md:hidden font-semibold text-gray-700 mt-5 mb-2">
              Order Details
            </h3>

            <div className="text-sm space-y-1">
              <p>
                <span className="font-medium">Method:</span>{" "}
                {order.paymentMethod}
              </p>

              <p>
                <span className="font-medium">Date:</span>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>

              <p>
                <span className="font-medium">Payment:</span>{" "}
                <span
                  className={
                    order.isPaid
                      ? "text-green-600 font-medium"
                      : "text-red-500 font-medium"
                  }
                >
                  {order.isPaid ? "Paid" : "Pending"}
                </span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
};

export default Orders


