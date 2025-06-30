"use client"
import { useState, useEffect } from 'react'
import { ImageIcon, MapPin, Calendar, PencilLine, Package, StickyNote, HandHeart } from "lucide-react"
import axios from 'axios'
import { toast } from 'react-toastify'
import Loader from '@/app/loader/Loader'

export default function Page() {
    const [imageOfDonatedFood, setImageOfDonatedFood] = useState(null)
    const [preview, setPreview] = useState(null)
    const [address, setAddress] = useState("Searching location...")
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        quantity: '',
        location: address,
        expiryDate: '',
        pickupTime: '',
        foodType: '',
        foodCategory: '',
        storageCondition: '',
    })

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        setImageOfDonatedFood(file)
        if (file) {
            setPreview(URL.createObjectURL(file))
        }
    }

    const handleChange = (e) => {
        setError(null)
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords
                try {
                    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
                    const data = await res.json()
                    if (data?.display_name) {
                        setAddress(data.display_name)
                        setFormData(prev => ({ ...prev, location: data.display_name }))
                    } else {
                        setAddress("Address not found")
                    }
                } catch {
                    setAddress("Failed to fetch address")
                }
            },
            () => {
                setAddress("Failed to get current location")
                setFormData(prev => ({ ...prev, location: "Failed to get current location" }))
            }
        )
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const requiredFields = ['title', 'description', 'quantity', 'location', 'expiryDate', 'pickupTime', 'foodType', 'foodCategory', 'storageCondition']
        const hasEmptyField = requiredFields.some(field => !formData[field]) || !imageOfDonatedFood

        if (hasEmptyField) {
            setLoading(false)
            setError("All fields are required")
            return
        }
        try {
            const form = new FormData()
            form.append("title", formData.title)
            form.append("description", formData.description)
            form.append("quantity", formData.quantity)
            form.append("location", formData.location)
            form.append("expiryDate", formData.expiryDate)
            form.append("pickupTime", formData.pickupTime)
            form.append("foodType", formData.foodType)
            form.append("foodCategory", formData.foodCategory)
            form.append("storageCondition", formData.storageCondition)
            form.append("imageOfDonatedFood", imageOfDonatedFood)

            axios.defaults.withCredentials = true
            const { data } = await axios.post("/api/donor/donatedfood", form, {
                headers: { "Content-Type": "multipart/form-data" }
            })

            if (data.success) {
                setFormData({
                    title: '',
                    description: '',
                    quantity: '',
                    location: address,
                    expiryDate: '',
                    pickupTime: '',
                    foodType: '',
                    foodCategory: '',
                    storageCondition: '',
                })
                setImageOfDonatedFood(null)
                setPreview(null)
                setError(null)
                toast.success("Post published successfully")
            } else {
                setError(data.message)
            }

            setLoading(false)
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    }
    return (
        <div className="min-h-screen w-full bg-cover bg-center flex items-center justify-center relative" style={{ backgroundImage: "url('/donatebg.jpg')" }}>
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0"></div>
            <div className="relative z-10 w-[90%] my-[20px] max-w-2xl bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl text-white flex flex-col items-center">
                <h2 className="text-3xl font-bold text-center text-white mb-6">Post a Food For Donation</h2>
                {error && (<p className='text-center text-[red] mb-[20px]'>{error}</p>)}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <Package className="absolute top-3 left-3 text-white" size={18} />
                            <input
                                type="text"
                                name="title"
                                placeholder="Food Title"
                                value={formData.title}
                                onChange={handleChange}
                                className="text-white pl-10 pr-4 py-2 w-full border rounded-lg shadow-sm"
                                autoComplete='off'
                            />
                        </div>
                        <div className="relative">
                            <StickyNote className="absolute top-3 left-3 text-white" size={18} />
                            <input
                                type="text"
                                name="quantity"
                                placeholder="Quantity (e.g. 3 kg)"
                                value={formData.quantity}
                                onChange={handleChange}
                                className="text-white pl-10 pr-4 py-2 w-full border rounded-lg shadow-sm"
                                autoComplete='off'
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <MapPin className="absolute top-3 left-3 text-white" size={18} />
                            <input
                                type="text"
                                name="location"
                                placeholder="Pickup Location"
                                value={formData.location}
                                onChange={handleChange}
                                className="text-white pl-10 pr-4 py-2 w-full border rounded-lg shadow-sm"
                                autoComplete='off'
                            />
                        </div>
                        <div className="relative">
                            <Calendar className="absolute top-3 left-3 text-white" size={18} />
                            <input
                                type="date"
                                name="expiryDate"
                                value={formData.expiryDate}
                                onChange={handleChange}
                                className="text-white pl-10 pr-4 py-2 w-full border rounded-lg shadow-sm"
                                autoComplete='off'
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                name="pickupTime"
                                placeholder="Pickup Time (e.g. 2 PM - 5 PM)"
                                value={formData.pickupTime}
                                onChange={handleChange}
                                className="text-white pl-4 pr-4 py-2 w-full border rounded-lg shadow-sm"
                                autoComplete='off'
                            />
                        </div>
                        <div className="relative">
                            <select
                                name="foodType"
                                value={formData.foodType}
                                onChange={handleChange}
                                className="text-white bg-transparent border py-2 px-4 w-full rounded-lg shadow-sm"
                            >
                                <option value="" className='text-black'>Select Food Type</option>
                                <option value="Cooked" className='text-black'>Cooked</option>
                                <option value="Packaged" className='text-black'>Packaged</option>
                                <option value="Raw" className='text-black'>Raw</option>
                                <option value="Beverage" className='text-black'>Beverage</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <select
                                name="foodCategory"
                                value={formData.foodCategory}
                                onChange={handleChange}
                                className="text-white bg-transparent border py-2 px-4 w-full rounded-lg shadow-sm"
                            >
                                <option value="" className='text-black'>Select Food Category</option>
                                <option value="Vegetarian" className='text-black'>Vegetarian</option>
                                <option value="Non-Vegetarian" className='text-black'>Non-Vegetarian</option>
                                <option value="Vegan" className='text-black'>Vegan</option>
                            </select>
                        </div>
                        <div className="relative">
                            <select
                                name="storageCondition"
                                value={formData.storageCondition}
                                onChange={handleChange}
                                className="text-white bg-transparent border py-2 px-4 w-full rounded-lg shadow-sm"
                            >
                                <option value="" className='text-black'>Select Storage Condition</option>
                                <option value="Refrigerated" className='text-black'>Refrigerated</option>
                                <option value="Room Temperature" className='text-black'>Room Temperature</option>
                                <option value="Frozen" className='text-black'>Frozen</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <PencilLine className="absolute top-3 left-3 text-white" size={18} />
                            <textarea
                                name="description"
                                placeholder="Food description"
                                value={formData.description}
                                onChange={handleChange}
                                className="text-white pl-10 pr-4 pt-2 h-40 w-full resize-none border rounded-lg shadow-sm"
                                autoComplete='off'
                            />
                        </div>
                        <div className="relative w-[290px] h-[160px]">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-full h-full object-cover rounded-xl shadow-md"
                                />
                            ) : (
                                <div className="w-full h-full border border-dashed border-gray-300 rounded-xl flex items-center justify-center text-black">
                                    No Image Selected
                                </div>
                            )}
                            <label className="absolute bottom-[112px] left-[25px] transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-1.5 bg-[#FFF7E6] bg-opacity-80 rounded-md text-sm text-[green] shadow cursor-pointer hover:bg-opacity-100 transition">
                                <ImageIcon size={18} />
                                <input
                                    type="file"
                                    name="imageOfDonatedFood"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-xl font-semibold hover:bg-green-700 active:scale-95 transition-all shadow-md"
                    >
                        {loading ? <Loader message={'Posting food. Please wait....'} /> : <>
                            <HandHeart size={18} />
                            Post Food For Donation
                        </>}
                    </button>
                </form>
            </div>
        </div>
    )
}
