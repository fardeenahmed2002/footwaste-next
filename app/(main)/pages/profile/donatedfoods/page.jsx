"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import Image from "next/image"
import { MdCalendarToday } from "react-icons/md"
import Link from "next/link"
import Loader from "../../../components/Loader"
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
  useEffect(() => {
    foodsList()
  }, [])
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-700">All Donated Foods</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {loading ? (
          <div className="col-span-full flex justify-center items-center" style={{ height: '200px' }}>
            <Loader message={'getting your data'}/>
          </div>
        ) : listOfDonatedFoods.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">No food donated yet</p>
        ) : (
          listOfDonatedFoods.map((food) => (
            <div
              key={food._id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
              style={{ minWidth: 0 }}
            >
              <div className="relative w-full h-28 sm:h-32">
                <Image
                  src={food.imageOfDonatedFood}
                  alt={food.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-3 flex flex-col justify-between flex-grow">
                <h3 className="text-sm font-semibold text-gray-900 truncate mb-1 uppercase">{food.title}</h3>
                <p className="flex items-center text-gray-600 mb-3 text-xs sm:text-sm">
                  <MdCalendarToday className="mr-1 text-blue-500" size={16} />
                  {new Date(food.createdAt).toLocaleDateString()}
                </p>
                <Link
                  href={`/pages/foodDetails/${food._id}`}
                  className="inline-block text-center bg-green-600 hover:bg-green-700 transition text-white font-semibold rounded-md py-1.5 px-3 text-xs sm:text-sm"
                >
                  Details
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
export default Page
