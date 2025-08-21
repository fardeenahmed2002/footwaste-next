'use client'

import Loader from "@/app/loader/Loader"
import axios from "axios"
import {
  CalendarDays,
  CheckCircle,
  ClipboardList,
  Edit,
  Eye,
  Info,
  MapPin,
  MessageCircle,
  Package,
  XCircle
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const FoodDetailsPage = () => {
  const { foodid } = useParams()
  const [food, setFood] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showBitersModal, setShowBitersModal] = useState(false)

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

  const acceptNGO = async (ngoid, foodid) => {
    try {

      const { data } = await axios.post(`/api/user/acceptNGO`, { ngoID: ngoid, foodID: foodid })
      if (data.success) {
        toast.success(`Notification sent . wait for reply of ngo`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const statusColor = {
    "received": "bg-green-600",
    "receiving..": "bg-yellow-500",
    "pending...": "bg-gray-500"
  }

  const statusStyle = statusColor[food?.status] || statusColor.default

  return (
    <div className="relative min-h-[calc(100vh-87px)] overflow-hidden">
      {/* Background layers */}
      <div
        className="absolute inset-0 bg-repeted filter bg-[#FFF7E6]"
        style={{ backgroundImage: `url('/background-veggie-pattern.png')` }}
      />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Loader message="Loading food details..." />
        </div>
      ) : !food ? (
        <p className="text-center mt-10 text-gray-500">Food not found.</p>
      ) : (
        <div className="relative z-10 max-w-4xl w-full mx-auto mt-10 bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
          <div className="flex flex-col sm:flex-row">
            {/* Food Image */}
            <div className="sm:w-1/2 w-full h-64 sm:h-auto">
              <img
                src={food.imageOfDonatedFood}
                alt={food.title}
                className="w-full h-full object-cover rounded-t-3xl sm:rounded-tr-none sm:rounded-l-3xl"
              />
            </div>

            {/* Food Info */}
            <div className="sm:w-1/2 w-full p-6 flex flex-col justify-between text-white">
              <div className="space-y-4">
                {/* Title and Edit */}
                <div className="flex justify-between items-start">
                  <h1 className="text-2xl font-bold uppercase flex items-center gap-2 text-green-100">
                    <ClipboardList className="w-5 h-5 text-green-300" />
                    {food.title}
                  </h1>
                  <Link href={`../editfood/${food._id}`}>
                    <Edit className="text-green-300 hover:text-green-500 w-5 h-5 cursor-pointer" />
                  </Link>
                </div>

                {/* Status */}
                <span className={`inline-block text-sm font-semibold px-3 py-1 rounded-full shadow ${statusStyle}`}>
                  {food.status}
                </span>

                {/* Info List */}
                <ul className="space-y-3 text-sm">
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
                      <p className="text-sm mt-1 leading-relaxed text-gray-100">{food.description}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Eye icon */}
          {food.biter?.length > 0 && (
            <button
              onClick={() => setShowBitersModal(true)}
              className="absolute bottom-4 right-4 bg-white/20 hover:bg-white/40 p-3 rounded-full backdrop-blur-md transition"
              title="View Biters"
            >
              <Eye className="w-6 h-6 text-white" />
            </button>
          )}

          {/* Biters Modal */}
          {showBitersModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
              <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
                <h2 className="text-lg font-bold mb-4">Biters</h2>
                <button
                  onClick={() => setShowBitersModal(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 font-bold"
                >
                  ✕
                </button>
                <div className="space-y-4 max-h-80 overflow-y-auto">
                  {food.biter.length === 0 ? (
                    <p className="text-gray-500">No biters yet.</p>
                  ) : (
                    food.biter.map((b) => (
                      <div key={b._id} className="flex items-center gap-3">
                        <img
                          src={b.image || "/default-user.png"}
                          alt={b.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex flex-row gap-[20px]">
                          <div>
                            <span className="font-medium text-gray-700 mr-[100px]">{b.name}</span>
                          </div>
                          <div className="flex flex-row gap-[10px]">
                            <CheckCircle className="cursor-pointer" onClick={() => acceptNGO(b._id, food._id)} />
                            <XCircle className="cursor-pointer" />
                            <MessageCircle className="cursor-pointer" />
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default FoodDetailsPage
