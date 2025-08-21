"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

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
    <div className="min-h-screen bg-gray-100 p-4">
      <h2 className="text-xl font-bold mb-4">Food Donation Requests</h2>

      <div className="flex flex-wrap gap-4">
        {allFoods.map((food, i) => (
          <div
            key={i}
            className="bg-white shadow rounded-lg overflow-hidden border hover:shadow-md transition"
            style={{ width: "325px", height: "320px" }}
          >

            <div className="w-full h-[150px]">
              <img
                src={food.imageOfDonatedFood}
                alt={food.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-3 space-y-1 text-sm">
              <h3 className="font-semibold text-gray-800">{food.title}</h3>
              <p className="text-gray-600 line-clamp-2">{food.description}</p>
              <p className="font-medium">Qty: {food.quantity}</p>
              <p className="truncate">📍 {food.location}</p>

              <p className="text-red-500">
                Expiry: {new Date(food.expiryDate).toLocaleDateString()}
              </p>
              <button onClick={() => navigate.push(`/admin/foodRequests/${food._id}`)}>show details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page
