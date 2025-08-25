"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MapPin,
  Calendar,
  Package,
  HandHeart,
  ImageIcon,
  User,
  Phone,
  Mail,
  Archive,
  Clock,
} from "lucide-react";

const Page = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/admin/non-auth-donation");
      setDonations(data);
    } catch (err) {
      setError("Failed to fetch donations");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  if (loading) return <div className="p-6 text-center text-gray-500">Loading donations...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
        Outsiders Donated Foods
      </h1>

      {donations.length === 0 ? (
        <p className="text-center text-gray-500">No donations found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map((d) => (
            <div
              key={d._id}
              className="bg-white dark:bg-[#1c2333] rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <div className="relative h-48 overflow-hidden rounded-t-xl">
                <img
                  src={d.imageOfDonatedFood || "/placeholder.png"}
                  alt={d.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-5 space-y-3">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{d.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">{d.description}</p>

                <div className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <div className="flex items-center gap-2"><User size={16} /> {d.donorName}</div>
                  <div className="flex items-center gap-2"><MapPin size={16} /> {d.address}</div>
                  <div className="flex items-center gap-2"><Mail size={16} /> {d.email}</div>
                  <div className="flex items-center gap-2"><Phone size={16} /> {d.phone}</div>
                  <div className="flex items-center gap-2"><MapPin size={16} /> {d.location}</div>
                  <div className="flex items-center gap-2"><Calendar size={16} /> Pickup: {d.pickupTime}</div>
                  <div className="flex items-center gap-2"><Package size={16} /> Quantity: {d.quantity}</div>
                  <div className="flex items-center gap-2"><HandHeart size={16} /> Type: {d.foodType}</div>
                  <div className="flex items-center gap-2"><ImageIcon size={16} /> Category: {d.foodCategory}</div>
                  <div className="flex items-center gap-2"><Archive size={16} /> Storage: {d.storageCondition}</div>
                  <div className="flex items-center gap-2"><Clock size={16} /> Cooked: {d.cookedTime}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
