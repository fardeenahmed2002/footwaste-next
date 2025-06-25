"use client"
import { useState } from 'react'
import { motion } from "framer-motion";
import Footer from '../../components/Footer';

const page = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    question: '',
    address: '',
    rating: 1,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted', formData);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center items-center p-4 border-x-[10px] border-[#2171b5] min-h-screen"
      >
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-3xl border-t-4 border-blue-600"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Contact Us</h2>
          <p className="text-lg text-gray-700 text-center mb-4">
            We'd love to hear from you! Please fill out the form below with any questions or comments.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="block text-gray-600 font-semibold mb-1">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-600 font-semibold mb-1">Your Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="flex flex-col md:col-span-2">
              <label className="block text-gray-600 font-semibold mb-1">Your Question</label>
              <textarea
                name="question"
                value={formData.question}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-32"
                placeholder="Enter your question"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-600 font-semibold mb-1">Your Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your address"
              />
            </div>
          </div>
          <div className="mt-6 text-center">
            <button
              type="submit"
              className="w-full mt-6 bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg"
            >
              Submit
            </button>
          </div>
        </motion.form>
      </motion.div>
      <Footer />
    </>
  );
}

export default page;
