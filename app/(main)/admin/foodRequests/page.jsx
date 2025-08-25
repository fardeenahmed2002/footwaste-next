"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MapPin, Calendar, Package } from "lucide-react"

const Page = () => {
  const [allFoods, setAllFoods] = useState([])
  const navigate = useRouter()

  const getFoodPosts = async () => {
    try {
      const { data } = await axios.get(`/api/admin/getFoods`)
      if (data.success) {
        setAllFoods(data.foods)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getFoodPosts()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        🍱 Food Donation Requests
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {allFoods.map((food, i) => (
          <div
            key={i}
            className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
          >
            <div className="w-full h-44">
              <img
                src={food.imageOfDonatedFood}
                alt={food.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 space-y-2 text-sm">
              <h3 className="font-semibold text-lg text-gray-900">
                {food.title}
              </h3>
              <p className="text-gray-600 line-clamp-2">{food.description}</p>

              <div className="flex items-center gap-2 text-gray-700">
                <Package className="w-4 h-4" />
                <span>Qty: {food.quantity}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="w-4 h-4" />
                <span className="truncate">{food.location}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <Calendar className="w-4 h-4" />
                <span>Cooked: {food.cookedTime}</span>
              </div>

              <p className="text-red-500 font-medium">
                Expiry: {new Date(food.expiryDate).toLocaleDateString()}
              </p>

              <button
                onClick={() => navigate.push(`/admin/foodRequests/${food._id}`)}
                className="w-full mt-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Show Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page
