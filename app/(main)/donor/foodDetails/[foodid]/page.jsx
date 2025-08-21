"use client"
import Loader from "@/app/loader/Loader"
import axios from "axios"
import { CalendarDays, ClipboardList, Edit, Eye, Info, MapPin, Package } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Modal from "./Modal"

const FoodDetailsPage = () => {
  const { foodid } = useParams()
  const [food, setFood] = useState(null)
  const [loading, setLoading] = useState(true)
  const [biters, setBiters] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  const fetchBiters = async () => {
    try {
      const { data } = await axios.get(`/api/biters/${foodid}`)
      if (data.success) {
        setBiters(data.bitters)
        setIsModalOpen(true)
      }
    } catch (error) {
      console.error("Error fetching biters:", error.message)
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
          <div className="flex flex-col sm:flex-row relative">
            {/* Left image */}
            <div className="sm:w-1/2 w-full h-64 sm:h-auto">
              <img
                src={food.imageOfDonatedFood}
                alt={food.title}
                className="w-full h-full object-cover rounded-t-3xl sm:rounded-tr-none sm:rounded-l-3xl"
              />
            </div>

            {/* Right info */}
            <div className="sm:w-1/2 w-full p-6 flex flex-col justify-between relative">
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

              {/* Eye icon bottom-right */}
              <div className="absolute bottom-4 right-4">
                <button
                  onClick={fetchBiters}
                  className="p-2 bg-green-600 hover:bg-green-700 rounded-full text-white shadow-md"
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Biters */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Biters</h2>
        {biters.length > 0 ? (
          <ul className="space-y-3">
            {biters.map((b) => (
              <li key={b._id} className="flex items-center gap-3 p-2 rounded-lg bg-white/10">
                <img
                  src={b.image || "/default-avatar.png"}
                  alt={b.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{b.name}</p>
                  <p className="text-sm text-gray-400">{b.email}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No biters yet.</p>
        )}
      </Modal>
    </div>
  )
}

export default FoodDetailsPage
