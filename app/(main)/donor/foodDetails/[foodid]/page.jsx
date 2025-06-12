'use client'
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import axios from "axios"
import Loader from "@/app/loader/Loader"
import Link from "next/link"
import { Edit, MapPin, CalendarDays, ClipboardList, Package, Info } from "lucide-react"
const FoodDetailsPage = () => {
  const { foodid } = useParams()
  const [food, setFood] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchFood = async () => {
    try {
      axios.defaults.withCredentials = true
      const { data } = await axios.get(`/api/donor/donatedfoodbyid/${foodid}`)
      if (data.success) {
        setFood(data.food)
      }
    } catch (error) {
      console.error("Error fetching food:", error.message)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (foodid) fetchFood()
  }, [foodid])

  return (
    <div className="relative min-h-[calc(100vh-87px)] overflow-hidden">
      <div
        className="absolute inset-0 bg-repeted filter bg-[#FFF7E6]"
        style={{ backgroundImage: `url('/background-veggie-pattern.png')` }}
      />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Loader message="Loading food details..." />
        </div>
      ) : !food ? (
        <p className="text-center mt-10 text-gray-500">Food not found.</p>
      ) : (
        <div className="relative z-10 max-w-3xl w-full mx-auto mt-10 bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-1/2 w-full h-64 sm:h-auto">
              <img
                src={food.imageOfDonatedFood}
                alt={food.title}
                className="w-full h-full object-cover rounded-t-3xl sm:rounded-tr-none sm:rounded-l-3xl"
              />
            </div>
            <div className="sm:w-1/2 w-full p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-2xl font-bold text-green-100 uppercase flex items-center gap-2">
                    <ClipboardList className="w-5 h-5 text-green-300" />
                    {food.title}
                  </h1>
                  <Link href={`../editfood/${food._id}`}>
                    <Edit className="text-green-300 hover:text-green-500 w-5 h-5 cursor-pointer" />
                  </Link>
                </div>
                <ul className="space-y-3 text-sm text-gray-100">
                  <li className="flex gap-2 items-center">
                    <Package className="w-4 h-4 text-green-200" />
                    <span><strong>Quantity:</strong> {food.quantity}</span>
                  </li>
                  <li className="flex gap-2 items-center">
                    <MapPin className="w-4 h-4 text-green-200" />
                    <span><strong>Location:</strong> {food.location}</span>
                  </li>
                  <li className="flex gap-2 items-center">
                    <CalendarDays className="w-4 h-4 text-green-200" />
                    <span><strong>Expires on:</strong> {new Date(food.expiryDate).toLocaleDateString()}</span>
                  </li>
                  <li className="flex gap-2 items-center">
                    <CalendarDays className="w-4 h-4 text-green-200" />
                    <span><strong>Donated on:</strong> {new Date(food.createdAt).toLocaleDateString()}</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <Info className="w-4 h-4 text-green-200 mt-1" />
                    <div>
                      <strong>Description:</strong>
                      <p className="text-sm mt-1 text-gray-100 leading-relaxed">{food.description}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FoodDetailsPage
