import { useState } from "react";
import { assets } from "../assets/assets";

function AddAddress() {
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const submitHanlder = async (e) => {
    e.preventDefault();
    console.log("AddressData:", address);
  };

  return (
    <div className="mt-8 md:mt-12 px-4 sm:px-6 lg:px-8 pb-16">
      <div className="max-w-7xl mx-auto bg-gray-50 rounded-2xl shadow-md overflow-hidden">
        <div className="flex flex-col-reverse lg:flex-row items-center">
          {/* Left Section */}
          <div className="w-full lg:w-3/5 bg-white p-6 md:p-8 lg:p-10">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-8">
              Add Delivery Address
            </h2>

            <form
              onSubmit={submitHanlder}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={address.firstName}
                  onChange={handleChange}
                  placeholder="Enter first name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
                  required
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={address.lastName}
                  onChange={handleChange}
                  placeholder="Enter last name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
                  required
                />
              </div>

              {/* Email */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={address.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
                  required
                />
              </div>

              {/* Street */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Street Address
                </label>
                <input
                  type="text"
                  name="street"
                  value={address.street}
                  onChange={handleChange}
                  placeholder="House No., Street, Area"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
                  required
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={address.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
                  required
                />
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={address.state}
                  onChange={handleChange}
                  placeholder="State"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
                  required
                />
              </div>

              {/* Zip Code */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Zip Code
                </label>
                <input
                  type="number"
                  name="zipCode"
                  value={address.zipCode}
                  onChange={handleChange}
                  placeholder="Zip Code"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
                  required
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={address.country}
                  onChange={handleChange}
                  placeholder="Country"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
                  required
                />
              </div>

              {/* Phone */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={address.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
                  required
                />
              </div>

              {/* Button */}
              <div className="md:col-span-2 pt-2">
                <button
                  type="submit"
                  className="w-full md:w-auto bg-primary-btn hover:bg-primary-hover-btn transition text-white font-medium px-8 py-3 rounded-lg"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-2/5 flex justify-center items-center bg-gray-100 p-8 md:p-10">
            <img
              src={assets.add_address_iamge}
              alt="Address Illustration"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAddress;