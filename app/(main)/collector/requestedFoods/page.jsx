"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import Link from "next/link"

const Page = () => {
    const [foods, setFoods] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                axios.defaults.withCredentials = true
                const { data } = await axios.get("/api/collector/reqToRecev")
                if (data.success) {
                    setFoods(data.foods)
                }
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        fetchFoods()
    }, [])

    if (loading) return <p className="text-white">Loading...</p>

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-white mb-4">Requested Foods</h1>
            {foods.length === 0 ? (
                <p className="text-gray-300">No requested foods found.</p>
            ) : (
                <div className="grid grid-cols-3 gap-6">
                    {foods.map(food => (
                        <div
                            key={food._id}
                            className="bg-[#1c2333] rounded-lg shadow overflow-hidden flex flex-col"
                            style={{ width: "300px", height: "300px" }}
                        >

                            <div className="h-[40%] w-full overflow-hidden">
                                <img
                                    src={food.imageOfDonatedFood || "/placeholder.png"}
                                    alt={food.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="p-2 flex-1 flex flex-col justify-between h-[60%]">
                                <div>
                                    <h2 className="text-white font-semibold text-sm">{food.title}</h2>
                                    <p className="text-gray-300 text-xs mt-1 line-clamp-2">{food.description}</p>
                                </div>
                                <div className="text-gray-400 text-xs mt-1">
                                    <p>Quantity: {food.quantity}</p>
                                    <p>Location: {food.location}</p>
                                    <p>
                                        Expiry: {new Date(food.expiryDate).toLocaleDateString("en-US")}
                                    </p> <br />
                                    <p className="font-bold text-xl">
                                        {
                                            food.foodToPick ?
                                                (
                                                    <Link href={`/collector/foodToReceive/${food._id}`}>Collect Now!!</Link>)
                                                :
                                                `Wait...`
                                        }
                                    </p>
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
