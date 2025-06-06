'use client'
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import axios from "axios"
import Loader from "../../../components/Loader"
import Link from "next/link"
import { EditIcon, Trash2 } from "lucide-react"

const FoodDetailsPage = () => {
  const { foodid } = useParams()
  const [food, setFood] = useState(null)
  const [loading, setLoading] = useState(true)

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

  useEffect(() => {
    if (foodid) fetchFood()
  }, [foodid])

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-repeted filter bg-[#FFF7E6]"
        style={{ backgroundImage: `url('/background-veggie-pattern.png')` }}
      />
      <div className="absolute inset-0 bg-black/50"></div>

      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Loader message="Loading food details..." />
        </div>
      ) : !food ? (
        <p className="text-center mt-10 text-gray-500">Food not found.</p>
      ) : (
        <div className="z-10 w-[405px] h-[515px] mx-auto mt-10 bg-white/20 backdrop-blur-md rounded-2xl shadow-lg border border-white/30 overflow-auto p-6">
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-3xl font-bold text-green-700 mb-4 uppercase">{food.title}</h1>
           
            <Link href={`../editfood/${food._id}`}>
              <EditIcon className="text-green-700 hover:text-green-900 cursor-pointer" />
            </Link>
          </div>
          <img
            src={food.imageOfDonatedFood}
            alt={food.title}
            className="w-full h-64 sm:h-80 object-cover rounded-xl mb-6 shadow"
          />
          <div className="space-y-4 text-black text-sm sm:text-base">
            <div className="flex">
              <strong className="min-w-[110px]">Quantity:</strong>
              <span>{food.quantity}</span>
            </div>
            <div className="flex">
              <strong className="min-w-[110px]">Location:</strong>
              <span className="text-justify">{food.location}</span>
            </div>
            <div className="flex">
              <strong className="min-w-[110px]">Expires on:</strong>
              <span>{new Date(food.expiryDate).toLocaleDateString()}</span>
            </div>
            <div className="flex">
              <strong className="min-w-[110px]">Donated on:</strong>
              <span>{new Date(food.createdAt).toLocaleDateString()}</span>
            </div>
            <div>
              <strong>Description:</strong>
              <p className="mt-1">{food.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FoodDetailsPage
