'use client'

import { serverError } from '@/app/Utils/serverError'
import Loader from '@/app/loader/Loader'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Skeleton from './Skeleton'

const Page = () => {
  const [foods, setFoods] = useState([])
  const [loading, setLoading] = useState(true)
  const [receivingId, setReceivingId] = useState(null)

  useEffect(() => {
    const fetchReceivedFoods = async () => {
      try {
        const { data } = await axios.get('/api/collector/receivedfoods')
        if (data.success) {
          setFoods(data.receivedfoods)
        } else {
          toast.error(data.message)
        }
      } catch (err) {
        console.error('Error fetching received foods:', err)
        toast.error('Failed to load foods')
      } finally {
        setLoading(false)
      }
    }

    fetchReceivedFoods()
  }, [])

  const receivethefood = async (foodid) => {
    try {
      setReceivingId(foodid)
      const { data } = await axios.put('/api/collector/receivedfoods', { foodid })

      if (data.success) {
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(serverError(error.message))
    } finally {
      setReceivingId(null)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-700">
        📦 Received Foods
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array(foods.length || 6).fill(null).map((_, i) => <Skeleton key={i} />)
          : foods.length === 0
            ? <p className="text-center text-gray-500 col-span-full">No received foods found.</p>
            : foods.map((food) => (
              <div
                key={food._id}
                className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col"
              >
                {food.imageOfDonatedFood && (
                  <Image
                    src={food.imageOfDonatedFood}
                    alt={food.title || 'Donated Food'}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                )}

                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h2 className="text-xl font-semibold text-green-800">
                      {food.title || 'No Title'}
                    </h2>
                    <p className="text-sm text-gray-600 mt-2">
                      📍 <span className="italic">{food.location || 'Unknown'}</span>
                    </p>
                  </div>

                  <div className="mt-4">
                    {food.status === 'received' ? (
                      <button className="bg-gray-400 text-white px-4 py-2 rounded-full text-sm w-full cursor-not-allowed opacity-70">
                        ✅ Already Received
                      </button>
                    ) : (
                      <button
                        onClick={() => receivethefood(food._id)}
                        className="bg-green-600 text-white px-4 py-2 rounded-full text-sm w-full hover:bg-green-700 transition"
                        disabled={receivingId === food._id}
                      >
                        {receivingId === food._id ? <Loader /> : 'Receive Food'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  )
}

export default Page
