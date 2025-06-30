'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { serverError } from '@/app/Utils/serverError'
import Loader from '@/app/loader/Loader'
import Image from 'next/image'
import Link from 'next/link'

const Page = () => {
    const [foods, setFoods] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
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

        fetchFoodPosts()
    }, [])

    if (loading) return <Loader message='getting requests....' />

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6 text-center">🍱 All Donated Foods</h1>

            {foods.length === 0 ? (
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
                                        {food.title || 'No Title'}
                                    </h2>
                                    <p className="text-sm text-gray-500 mb-4">
                                        📅 Posted on:{" "}
                                        <span className="italic">
                                            {new Date(food.createdAt).toLocaleDateString()}
                                        </span>
                                    </p>
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
                                    <span
                                        className={`text-xs font-medium px-3 py-1 rounded-full mt-2 md:mt-0 ${food.pickedBy?.name
                                            ? 'bg-blue-100 text-blue-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                            }`}
                                    >
                                        {food.pickedBy?.name || 'Not picked yet'}
                                    </span>
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
