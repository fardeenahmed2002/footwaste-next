"use client"


import Loader from "@/app/loader/Loader"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const Page = () => {
    const { id } = useParams()
    const [food, setFood] = useState(null)
    const [place, setPlace] = useState('')
    const [loading, setLoading] = useState(true)
    const [input, setInput] = useState('')
    const [receiverDetails, setReceiverDetails] = useState(null)
    const [receving, setReceiving] = useState(null)

    useEffect(() => {
        const fetchFood = async () => {
            try {
                const { data } = await axios.get(`/api/collector/${id}`)
                if (data.success) {
                    setFood(data.food)
                    setPlace(data.food.location)
                } else {
                    console.error(data.message)
                }
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        if (id) fetchFood()
    }, [id])

    const handleSearch = () => {
        if (input.trim() !== "") {
            setPlace(input.trim())
        }
    }

    const handleRecive = async () => {
        try {
            setReceiving(true)
            axios.defaults.withCredentials = true
            const { data } = await axios.put('/api/collector', { foodid: id })
            if (data.success) {
                setReceiverDetails(data.receiversDetails?.pickedBy)
                setReceiving(false)
                toast.success("food recevied")
            }
        } catch (error) {
            console.error("Receive error:", error)
        }
    }

    if (loading) return <Loader />

    if (!food) return <div className="text-center text-red-500">Food not found</div>

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-[50px]">
                {/* Map Section */}
                <div className="w-full md:w-1/2">
                    <div className="overflow-hidden rounded-xl border border-white/30 h-full">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Search location..."
                            className="w-full px-4 py-2 rounded-t-lg border border-black outline-none"
                        />
                        <button
                            onClick={handleSearch}
                            className="bg-white text-blue-600 px-4 py-2 w-full font-semibold"
                        >
                            Search
                        </button>
                        <iframe
                            title="Google Map"
                            src={`https://www.google.com/maps?q=${encodeURIComponent(place)}&output=embed`}
                            width="100%"
                            height="400"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="rounded-b-xl w-full h-[400px]"
                        />
                    </div>
                </div>

                {/* Food Details Section */}
                <div className="w-full md:w-1/2 flex flex-col gap-6">
                    {/* Image and Receiver Info Side by Side */}
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Food Image */}
                        <div className="md:w-1/2">
                            {food.imageOfDonatedFood && (
                                <Image
                                    src={food.imageOfDonatedFood}
                                    alt={food.title}
                                    width={400}
                                    height={300}
                                    className="rounded-lg shadow object-cover w-full h-auto"
                                />
                            )}
                        </div>

                        {/* Receiver Info */}
                        {receiverDetails && (
                            <div className="md:w-1/2 bg-green-100 text-green-900 p-4 rounded-xl shadow h-fit">
                                <h2 className="font-bold text-lg mb-2">Receiver Information:</h2>
                                <p><span className="font-semibold">Name:</span> {receiverDetails.name}</p>
                                <p><span className="font-semibold">Email:</span> {receiverDetails.email || "Not available"}</p>
                            </div>
                        )}
                    </div>

                    {/* Food Text Details */}
                    <div>
                        <h1 className="text-2xl font-bold mb-2">{food.title}</h1>
                        <p className="text-gray-600 mb-2">
                            Posted on: {new Date(food.createdAt).toLocaleString()}
                        </p>
                        <p className="text-gray-700 mb-4">{food.description}</p>
                        <p className="text-sm text-gray-500">
                            Donor: {food.donorOfThisFood?.name || 'Unknown'} <br />
                            Email: {food.donorOfThisFood?.email} <br />
                            Address: {food.location}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                        {receving ? (
                            <button className="bg-blue-600 text-white px-4 py-2 rounded">
                                <Loader />
                            </button>
                        ) : (
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                                onClick={handleRecive}
                            >
                                Receive
                            </button>
                        )}

                        <Link
                            href={`/pages/chat/${food.donorOfThisFood?._id}`}
                            target="_blank"
                            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
                        >
                            Message
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Page
