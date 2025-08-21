"use client";

import { Context } from "@/app/contextapi/ContextProvider";
import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

const DonationPage = () => {
  const { inEng } = useContext(Context);

  const [isloading, setisloading] = useState(false)

  const [formData, setFormData] = useState({
    donorType: "",
    selectedNgo: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    amount: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setisloading(true)
    const { donorType, fullName, email, phone, address, amount, message, selectedNgo } = formData;

    if (donorType === "NormalDonor") {
      if (!fullName || !email || !phone || !address || !amount || !selectedNgo) {
        toast.error(
          inEng
            ? "Please fill all required fields!"
            : "সব ফিল্ড পূরণ করুন!"
        );
        return;
      }
    } else if (donorType === "AnonymousDonor") {
      if (!amount) {
        toast.error(
          inEng
            ? "Please enter the amount!"
            : "অনুদানের পরিমাণ লিখুন!"
        );
        return;
      }
    } else {
      toast.error(
        inEng
          ? "Please select a donor type!"
          : "অনুদানের ধরন নির্বাচন করুন!"
      );
      return;
    }

    try {
      axios.defaults.withCredentials = true;

      const saveResponse = await axios.post("/api/save-donation", {
        donorType,
        selectedNgo,
        fullName,
        email,
        phone,
        address,
        amount,
        message,
      });
      if (saveResponse.data.success) {
        toast.success(`donation done redirecting to donate page`)
      }
      if (!saveResponse.data.success) {
        toast.error(inEng ? "Failed to save donation!" : "দান সংরক্ষণ ব্যর্থ হয়েছে!");
        return;
      }

      const paymentResponse = await axios.post("/api/create-ssl-session", {
        amount,
      });

      if (paymentResponse.data.success && paymentResponse.data.url) {
        window.location.href = paymentResponse.data.url;
      } else {
        toast.error(inEng ? "Payment URL not found!" : "পেমেন্ট URL পাওয়া যায়নি!");
      }

    } catch (err) {
      console.error(err);
      toast.error(inEng ? "Something went wrong!" : "কিছু ভুল হয়েছে!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-md shadow-md mt-10">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center"
      >

        <select
          name="donorType"
          value={formData.donorType}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">
            {inEng ? "Select Donor Type" : "অনুদানের ধরন নির্বাচন করুন"}
          </option>
          <option value="NormalDonor">
            {inEng ? "Normal Donor" : "সাধারণ দানকারী"}
          </option>
          <option value="AnonymousDonor">
            {inEng ? "Anonymous Donor" : "গোপন দানকারী"}
          </option>
        </select>


        <select
          name="selectedNgo"
          value={formData.selectedNgo}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">
            {inEng ? "Select Recipient" : "প্রাপক বাছাই করুন"}
          </option>
          <option value="Khaddo Bachao">খাদ্য বাঁচাও</option>
          <option value="BRAC">ব্র্যাক</option>
          <option value="Caritas Bangladesh">কারিতাস বাংলাদেশ</option>
          <option value="CARE Bangladesh">কেয়ার বাংলাদেশ</option>
          <option value="ASA Bangladesh">আশা বাংলাদেশ</option>
          <option value="Shakti Foundation">শক্তি ফাউন্ডেশন</option>
          <option value="Proshika">প্রশিকা</option>
          <option value="BURO Bangladesh">বুরো বাংলাদেশ</option>
          <option value="Oxfam Bangladesh">অক্সফাম বাংলাদেশ</option>
          <option value="Jagorani Chakra Foundation (JCF)">জাগরণী চক্র ফাউন্ডেশন</option>
          <option value="Thengamara Mohila Sabuj Sangha (TMSS)">তেনগামারা মহিলা সবুজ সংঘ</option>
          <option value="Save the Children">সেভ দ্যা চিলড্রেন</option>
          <option value="SOS Children’s Villages Bangladesh">এসওএস শিশু গ্রাম</option>
          <option value="UNICEF Bangladesh">ইউনিসেফ বাংলাদেশ</option>
          <option value="JAAGO Foundation">জাগো ফাউন্ডেশন</option>
          <option value="Mastul Foundation">মাস্তুল ফাউন্ডেশন</option>
        </select>


        {formData.donorType === "NormalDonor" && (
          <div className="md:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                {inEng ? "Full Name" : "পূর্ণ নাম"}
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder={inEng ? "Full Name" : "পূর্ণ নাম"}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>


            <div>
              <label className="block mb-1 font-medium text-gray-700">
                {inEng ? "Email Address" : "ইমেইল ঠিকানা"}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={inEng ? "Email Address" : "ইমেইল ঠিকানা"}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>


            <div>
              <label className="block mb-1 font-medium text-gray-700">
                {inEng ? "Phone Number" : "ফোন নম্বর"}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={inEng ? "Phone Number" : "ফোন নম্বর"}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>


            <div>
              <label className="block mb-1 font-medium text-gray-700">
                {inEng ? "Address" : "ঠিকানা"}
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder={inEng ? "Address" : "ঠিকানা"}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>


            <div>
              <label className="block mb-1 font-medium text-gray-700">
                {inEng ? "Amount" : "টাকার পরিমাণ"}
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder={inEng ? "Amount" : "টাকার পরিমাণ"}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>


            <div className="md:col-span-2">
              <label className="block mb-1 font-medium text-gray-700">
                {inEng ? "Message (optional)" : "বার্তা - ঐচ্ছিক"}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={inEng ? "Message (optional)" : "বার্তা - ঐচ্ছিক"}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        )}


        {formData.donorType === "AnonymousDonor" && (
          <div className="md:col-span-4 space-y-4">

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                {inEng ? "Amount" : "টাকার পরিমাণ"}
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder={inEng ? "Amount" : "টাকার পরিমাণ"}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>


            <div>
              <label className="block mb-1 font-medium text-gray-700">
                {inEng ? "Message (optional)" : "বার্তা - ঐচ্ছিক"}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={inEng ? "Message (optional)" : "বার্তা - ঐচ্ছিক"}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        )}

        {isloading ? (
          <button
            type="submit"
            className="bg-green-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-green-700 transition-colors md:col-span-4"
          >
            <Spinner />
          </button>
        ) : (
          <button
            type="submit"
            className="bg-green-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-green-700 transition-colors md:col-span-4"
          >
            {inEng ? "Donate" : "দান করুন"}
          </button>
        )}

      </form>
    </div>
  );
};

export default DonationPage;
