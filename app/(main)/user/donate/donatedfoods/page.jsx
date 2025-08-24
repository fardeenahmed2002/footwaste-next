'use client'
import { serverError } from "@/app/Utils/serverError"
import axios from "axios"
import { Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { MdCalendarToday } from "react-icons/md"
import { toast } from "react-toastify"
import DonatedFoodSkeleton from "./DonatedFoodSkeleton"

const Page = () => {
  const [listOfDonatedFoods, setListOfDonatedFoods] = useState([])
  const [loading, setLoading] = useState(true)

  const foodsList = async () => {
    try {
      axios.defaults.withCredentials = true
      const { data } = await axios.get("/api/user/donatedfood")
      if (data.success) {
        setListOfDonatedFoods(data.food)
      }
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  const deletefood = async (id) => {
    try {
      axios.defaults.withCredentials = true
      const { data } = await axios.delete(`/api/user/donatedfoodbyid/${id}`)
      if (data.success) {
        setListOfDonatedFoods((old) => old.filter((food) => food._id != id))
      }
      toast.success("Food deleted successfully")
    } catch (error) {
      toast.error(serverError(error))
    }
  }

  useEffect(() => {
    foodsList()
  }, [])

  return (
    <div className="p-4 relative  min-h-screen">
      <div className="relative z-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">All Donated Foods</h2>
        {loading ? (
          <DonatedFoodSkeleton count={6} />
        ) : listOfDonatedFoods.length === 0 ? (
          <p className="col-span-full text-center text-white font-black">No food donated yet</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {listOfDonatedFoods.map((food) => (
              <div
                key={food._id}
                className="rounded-lg shadow-md overflow-hidden flex flex-col bg-[#1C2532] z-0"
                style={{ minWidth: 0 }}
              >
                <div className="relative w-full h-28 sm:h-32">
                  <Image
                    src={food.imageOfDonatedFood}
                    alt={food.title}
                    fill
                    className="object-cover border-2 border-[green] rounded-lg"
                    priority
                  />
                </div>
                <div className="p-3 flex flex-col justify-between flex-grow">
                  <div className="flex flex-row justify-between">
                    <h3 className="text-sm font-semibold text-white truncate mb-1 uppercase">{food.title}</h3>
                    <label htmlFor={`modal-${food._id}`} className="cursor-pointer text-red-500 hover:text-red-700 transition">
                      <Trash2 />
                    </label>
                    <input type="checkbox" id={`modal-${food._id}`} className="modal-toggle" />
                    <div className="modal" role="dialog">
                      <div className="modal-box bg-white text-black">
                        <h3 className="font-bold text-lg">Confirm Deletion</h3>
                        <p className="py-4">Are you sure you want to delete <strong>{food.title}</strong>? This action cannot be undone.</p>
                        <div className="modal-action">
                          <label
                            htmlFor={`modal-${food._id}`}
                            className="btn bg-red-600 hover:bg-red-700 text-white border-none"
                            onClick={() => deletefood(food._id)}
                          >
                            Delete
                          </label>
                          <label
                            htmlFor={`modal-${food._id}`}
                            className="btn bg-gray-300 hover:bg-gray-400 text-black border-none"
                          >
                            Cancel
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="flex items-center text-white mb-3 text-xs sm:text-sm">
                    <MdCalendarToday className="mr-1 text-blue-500" size={16} />
                    will expire at : <span> {new Date(food.createdAt).toLocaleDateString()}</span>
                  </p>
                  {new Date(food.createdAt) < new Date(food.expiryDate) ? (
                    <p className="text-white font-bold">Food is not expired</p>
                  ) : (
                    <p className="text-[red] font-bold">Food is expired</p>
                  )}
                  <br />
                  <Link
                    href={`./foodDetails/${food._id}`}
                    className="inline-block text-center bg-[#FFC808] text-[#1F2937] hover:text-[#FFC808] hover:bg-[#1C2532] border-1 hover:border-[#FFC808] transition font-semibold rounded-md py-1.5 px-3 text-xs sm:text-sm"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Page
