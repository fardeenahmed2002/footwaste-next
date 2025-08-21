// app/user/add-food-donation/page.jsx
"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const FreeFoodDonation = () => {
  const [formData, setFormData] = useState({
    donorName: "",
    address: "",
    email: "",
    phone: "",
    pickupLocation: "",
    time: "",
    foodName: "",
    quantity: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ["donorName", "address", "email", "phone", "pickupLocation", "time", "foodName", "quantity"];
    for (let field of requiredFields) {
      if (!formData[field]) {
        toast.error("Please fill all required fields!");
        return;
      }
    }

    try {
      const res = await axios.post("/api/free-food-donate", formData)
      if (res.data.success) {
        alert("Donation submitted successfully!");
        setFormData({
          donorName: "",
          address: "",
          email: "",
          phone: "",
          pickupLocation: "",
          time: "",
          foodName: "",
          quantity: "",
        });
      } else {
        alert("Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting form!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Food Donation </h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
   
        <div>
          <label className="block mb-1 font-medium">Donor Name</label>
          <input
            type="text"
            name="donorName"
            value={formData.donorName}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Donor Name"
          />
        </div>


        <div>
          <label className="block mb-1 font-medium">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Address"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Email"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Phone Number"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Pickup Location</label>
          <input
            type="text"
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Pickup Location"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Pickup Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Food Name</label>
          <input
            type="text"
            name="foodName"
            value={formData.foodName}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Food Name"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Quantity</label>
          <input
            type="text"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Quantity"
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="bg-green-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-green-700 transition-colors w-full"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FreeFoodDonation;
