"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import axios from "axios"
import Loader from "../../../components/Loader"
import { CalendarCheck, MapPin, Package, AlertCircle } from "lucide-react"

const FoodDetailsPage = () => {
  const { foodid } = useParams()
  const [food, setFood] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFood = async () => {
      try {
        axios.defaults.withCredentials = true
        const { data } = await axios.get(`/api/user/donatedfoodbyid/${foodid}`)
        if (data.success) {
          setFood(data.food)
        }
      } catch (error) {
        console.error("Error fetching food:", error.message)
      } finally {
        setLoading(false)
      }
    }

    if (foodid) fetchFood()
  }, [foodid])

  if (loading) return <Loader message="Loading food details..." />

  if (!food) return <p className="text-center mt-10 text-gray-500">Food not found.</p>

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-2xl shadow-lg mt-10">
      <h1 className="text-3xl font-bold text-green-700 mb-4 uppercase">{food.title}</h1>

      <img
        src={food.imageOfDonatedFood}
        alt={food.title}
        className="w-full h-64 sm:h-80 object-cover rounded-xl mb-6"
      />

      <div className="space-y-4 text-gray-700 text-sm sm:text-base">
        <div className="flex items-start gap-2">
          <Package className="text-green-600 mt-1" size={18} />
          <div className="flex">
            <strong className="min-w-[110px]">Quantity:</strong>
            <span>{food.quantity}</span>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <MapPin className="text-blue-500 mt-1" size={18} />
          <div className="flex">
            <strong className="min-w-[110px]">Location:</strong>
            <span>{food.location}</span>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <AlertCircle className="text-red-500 mt-1" size={18} />
          <div className="flex">
            <strong className="min-w-[110px]">Expires on:</strong>
            <span>{new Date(food.expiryDate).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <CalendarCheck className="text-purple-500 mt-1" size={18} />
          <div className="flex">
            <strong className="min-w-[110px]">Donated on:</strong>
            <span>{new Date(food.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div>
          <strong>Description:</strong>
          <p className="mt-1 text-gray-600">{food.description}</p>
        </div>
      </div>
    </div>
  )
}

export default FoodDetailsPage
