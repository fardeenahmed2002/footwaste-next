"use client"
import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const FoodDetailsPage = () => {
    const { id } = useParams()
    const [food, setFood] = useState(null)
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const [reason, setReason] = useState("")

    useEffect(() => {
        const fetchFood = async () => {
            try {
                const { data } = await axios.get(`/api/admin/getFoods/${id}`)
                if (data.success) {
                    setFood(data.food)
                }
            } catch (error) {
                console.error("Error fetching food details", error)
            }
        }
        fetchFood()
    }, [id])

    const accept = async (id) => {
        try {
            const { data } = await axios.post(`/api/admin/acceptFood`, { id })
            if (data.success) {
                toast.success("Food accepted successfully")

            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error("Something went wrong")
        }
    }
    const reject = async (id) => {

        try {
            const { data } = await axios.post(`/api/admin/rejectFood`, { id, reason })
            if (data.success) {
                toast.success(`rejected successfully`)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (!food) return <p>Loading...</p>

    return (
        <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow space-y-4">
            <img
                src={food.imageOfDonatedFood}
                alt={food.title}
                className="w-full h-64 object-cover rounded-md"
            />

            <h2 className="text-2xl font-bold">{food.title}</h2>
            <p className="text-gray-600">{food.description}</p>

            <div className="space-y-1">
                <p><strong>Quantity:</strong> {food.quantity}</p>
                <p><strong>Location:</strong> {food.location}</p>
                <p><strong>Will expire at:</strong> {food.pickupTime}</p>
                <p><strong>Expiry Date:</strong> {new Date(food.expiryDate).toLocaleDateString()}</p>
                <p><strong>Food Type:</strong> {food.foodType}</p>
                <p><strong>Category:</strong> {food.foodCategory}</p>
                <p><strong>Storage Condition:</strong> {food.storageCondition}</p>
                <p><strong>Status:</strong> {food.status}</p>
            </div>

            <div className="p-3 bg-gray-100 rounded-md">
                <h3 className="font-semibold text-lg">Donor Info</h3>
                <p><strong>Name:</strong> {food.donorOfThisFood?.name}</p>
                <p><strong>Email:</strong> {food.donorOfThisFood?.email}</p>
                <p><strong>Contact:</strong> {food.donorOfThisFood?.contactNumber}</p>
                <p><strong>Address:</strong> {food.donorOfThisFood?.address}</p>
            </div>

            <div className="flex gap-4 mt-4">
                <button
                    onClick={() => accept(id)}
                    disabled={loading || food.isApproved === "approved"}
                    className="flex-1 bg-[green] text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                    Accept
                </button>
                <button
                    onClick={() => setModal(true)}
                    disabled={loading || food.status === "rejected"}
                    className="flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
                >
                    Reject
                </button>
                {modal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-96 space-y-4">
                            <h3 className="text-lg font-semibold">Reject Food Post</h3>
                            <textarea
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                placeholder="Enter rejection reason..."
                                className="w-full p-2 border rounded-md resize-none h-24"
                            />
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setModal(false)}
                                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => reject(id)}
                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                    disabled={loading}
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default FoodDetailsPage
