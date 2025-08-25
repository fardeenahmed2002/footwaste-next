'use client'
import { serverError } from '@/app/Utils/serverError'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import CountDown from './CountDown'
import PickupTimer from './PickupTimer'
import Skeleton from './Skeleton'

const Page = () => {
    const [foods, setFoods] = useState([])
    const [loading, setLoading] = useState(true)
    const fetchFoodPosts = async () => {
        try {
            const { data } = await axios.get('/api/collector')
            if (data.success) {
                setFoods(data.posts)
            } else {
                console.error(data.message)
            }
        } catch (error) {
            serverError(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchFoodPosts()
    }, [])

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6 text-center">🍱 All Donated Foods</h1>

            {loading ? (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {Array(6).fill(null).map((_, i) => <Skeleton key={i} />)}
                </div>
            ) :
                foods.length === 0 ? (
                    <p className="text-center text-gray-500">No food posts available.</p>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {foods.map((food) => (
                            <div
                                key={food._id}
                                className="bg-white border border-gray-200 rounded-2xl shadow hover:shadow-lg transition duration-300 overflow-hidden flex flex-col"
                            >
                                {food.imageOfDonatedFood && (
                                    <div className="w-full h-48 overflow-hidden">
                                        <Image
                                            src={food.imageOfDonatedFood}
                                            alt={food.title || 'Donated food'}
                                            width={500}
                                            height={300}
                                            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                                        />
                                    </div>
                                )}

                                <div className="p-5 flex flex-col justify-between flex-grow">
                                    <div>

                                        <h2 className="text-xl font-bold text-green-700 mb-2">
                                            {food.title.toUpperCase() || 'No Title'}
                                        </h2>


                                        <p className="text-sm text-gray-500 mb-4">
                                            📅 Posted on:{" "}
                                            <span className="italic">
                                                {new Date(food.createdAt).toLocaleDateString()}
                                            </span>
                                        </p>
                                        <CountDown expiryDate={food.expiryDate} />
                                        <PickupTimer createdAt={food.createdAt} pickupTime={food.pickupTime} /> <br />
                                    </div>
                                    <div className="flex flex-wrap justify-between items-center mt-auto">
                                        {food.pickedBy ? (
                                            <button
                                                className="bg-gray-400 text-white px-4 py-2 rounded-full text-sm font-medium cursor-not-allowed opacity-60"
                                                disabled
                                            >
                                                Already Picked
                                            </button>
                                        ) : (
                                            <Link
                                                href={`/collector/allfoods/${food._id}`}
                                                className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-700 transition"
                                            >
                                                View Details
                                            </Link>
                                        )}

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
        </div>
    )
}

export default Page
