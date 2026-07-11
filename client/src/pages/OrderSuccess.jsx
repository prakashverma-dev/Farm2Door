import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

function OrderSuccess() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">

        <CheckCircle
          size={80}
          className="mx-auto text-green-600 mb-5"
        />

        <h1 className="text-3xl font-bold text-gray-800">
          Order Placed Successfully!
        </h1>

        <p className="mt-3 text-gray-600">
          Thank you for shopping with <span className="font-semibold text-green-600">Farm2Door</span>.
        </p>

        <p className="mt-2 text-sm text-gray-500">
          We've received your order and will notify you once it is confirmed and shipped.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            to="/my-orders"
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition"
          >
            View My Orders
          </Link>

          <Link
            to="/"
            className="flex-1 border border-green-600 text-green-600 hover:bg-green-50 font-medium py-3 rounded-lg transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;