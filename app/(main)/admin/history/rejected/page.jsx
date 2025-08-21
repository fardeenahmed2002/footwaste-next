"use client"

import axios from "axios"
import { useEffect, useState } from "react"

const Page = () => {
    const [foods, setFoods] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [fromDate, setFromDate] = useState("")
    const [toDate, setToDate] = useState("")

    useEffect(() => {
        const getFoods = async () => {
            try {
                const { data } = await axios.get(`/api/admin/rejectedFood`)
                if (data.success) {
                    setFoods(data.foods)
                } else {
                    setError("No foods found")
                }
            } catch (err) {
                console.log(err)
                setError("Server error")
            } finally {
                setLoading(false)
            }
        }
        getFoods()
    }, [])

    // Filter foods by date range
    const filteredFoods = foods.filter(food => {
        const expiry = new Date(food.expiryDate)
        const from = fromDate ? new Date(fromDate) : null
        const to = toDate ? new Date(toDate) : null

        if (from && to) {
            return expiry >= from && expiry <= to
        } else if (from) {
            return expiry >= from
        } else if (to) {
            return expiry <= to
        } else {
            return true
        }
    }).sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate))

    if (loading) return <p className="text-center mt-10">Loading...</p>
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>

    return (
        <div className="p-6">
            {/* Date Range Filter */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center">
                <div className="flex flex-col">
                    <label className="font-semibold" htmlFor="fromDate">From:</label>
                    <input
                        type="date"
                        id="fromDate"
                        className="border border-gray-300 rounded px-3 py-1"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="font-semibold" htmlFor="toDate">To:</label>
                    <input
                        type="date"
                        id="toDate"
                        className="border border-gray-300 rounded px-3 py-1"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                    />
                </div>
            </div>

            {/* Foods Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFoods.map((food) => (
                    <div key={food._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                        <img
                            src={food.imageOfDonatedFood}
                            alt={food.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4 flex flex-col gap-2">
                            <h3 className="font-bold text-xl">{food.title}</h3>
                            <p className="text-gray-600">{food.description}</p>
                            <p><span className="font-semibold">Quantity:</span> {food.quantity}</p>
                            <p><span className="font-semibold">Location:</span> {food.location}</p>
                            <p><span className="font-semibold">Pickup Time:</span> {food.pickupTime} hrs</p>
                            <p><span className="font-semibold">Food Type:</span> {food.foodType}</p>
                            <p><span className="font-semibold">Category:</span> {food.foodCategory}</p>
                            <p><span className="font-semibold">Storage:</span> {food.storageCondition}</p>
                            <p><span className="font-semibold">Expiry Date:</span> {new Date(food.expiryDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Page
