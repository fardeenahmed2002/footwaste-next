// app/user/add-food-donation/page.jsx
"use client";

import { Context } from "@/app/contextapi/ContextProvider";
import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";

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
  const [loading, setLoading] = useState(false)
  const { inEng } = useContext(Context)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const requiredFields = ["donorName", "address", "email", "phone", "pickupLocation", "time", "foodName", "quantity"];
    for (let field of requiredFields) {
      if (!formData[field]) {
        toast.error("Please fill all required fields!");
        setLoading(false)
        return;
      }
    }

    try {
      const res = await axios.post("/api/free-food-donate", formData)
      if (res.data.success) {
        toast.success("Donation submitted successfully!");
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
        setLoading(false)
      } else {
        toast.error("Something went wrong!");
        setLoading(false)
      }
    } catch (err) {
      console.error(err);
      toast.error("Error submitting form!");
      setLoading(false)
    }
    finally {
      setLoading(false)
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {inEng ? "Food Donation" : "খাদ্য দান"}
      </h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
          <label className="block mb-1 font-medium">{inEng ? "Donor Name" : "দানকারীর নাম"}</label>
          <input
            type="text"
            name="donorName"
            value={formData.donorName}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder={inEng ? "Donor Name" : "দানকারীর নাম"}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">{inEng ? "Address" : "ঠিকানা"}</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder={inEng ? "Address" : "ঠিকানা"}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">{inEng ? "Email" : "ইমেইল"}</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder={inEng ? "Email" : "ইমেইল"}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">{inEng ? "Phone" : "ফোন"}</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder={inEng ? "Phone Number" : "ফোন নম্বর"}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">{inEng ? "Pickup Location" : "উত্তোলনের স্থান"}</label>
          <input
            type="text"
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder={inEng ? "Pickup Location" : "উত্তোলনের স্থান"}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">{inEng ? "Pickup Time" : "উত্তোলনের সময়"}</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">{inEng ? "Food Name" : "খাবারের নাম"}</label>
          <input
            type="text"
            name="foodName"
            value={formData.foodName}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder={inEng ? "Food Name" : "খাবারের নাম"}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">{inEng ? "Quantity" : "পরিমাণ"}</label>
          <input
            type="text"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder={inEng ? "Quantity" : "পরিমাণ"}
          />
        </div>

        <div className="md:col-span-2">
          {loading ? (
            <button
              type="submit"
              className="bg-[#FFC808] text-[#1F2937] hover:text-[#FFC808] hover:bg-[#1C2532] font-semibold px-4 py-2 rounded-md transition-colors w-full"
            >
              <Spinner />
            </button>
          ) : (
            <button
              type="submit"
              className="bg-[#FFC808] text-[#1F2937] hover:text-[#FFC808] hover:bg-[#1C2532] font-semibold px-4 py-2 rounded-md transition-colors w-full"
            >
              {inEng ? "Submit" : "জমা দিন"}
            </button>
          )}
        </div>
      </form>

    </div>
  );
};

export default FreeFoodDonation;
