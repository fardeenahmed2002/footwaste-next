"use client"
import { useState, useEffect } from 'react'
import { ImageIcon, MapPin, Calendar, PencilLine, Package, StickyNote, HandHeart } from "lucide-react"
import axios from 'axios'
import { toast } from 'react-toastify'
import Loader from '@/app/loader/Loader'
import { serverError } from '@/app/Utils/serverError'

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
                const { latitude, longitude } = position.coords;
                try {
                    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
                    const data = await res.json();
                    if (data?.display_name) {
                        setAddress(data.display_name);
                        setFormData(prev => ({ ...prev, location: data.display_name }));
                    } else {
                        setAddress("Address not found");
                    }
                } catch {
                    setAddress("Failed to fetch address");
                }
            },
            () => {
                setAddress("Failed to get current location");
                setFormData(prev => ({ ...prev, location: "Failed to get current location" }));
            }
        );
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        if (!formData.title || !formData.quantity || !formData.location || !formData.expiryDate || !formData.description || !imageOfDonatedFood) {
            setLoading(false)
            setError("all field required")
            return;
        }
        try {
            const form = new FormData();
            form.append("title", formData.title)
            form.append("quantity", formData.quantity)
            form.append("location", formData.location)
            form.append("expiryDate", formData.expiryDate)
            form.append("description", formData.description)
            form.append("imageOfDonatedFood", imageOfDonatedFood)
            axios.defaults.withCredentials = true
            const { data } = await axios.post("/api/user/donatedfood", form, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            if (data.success) {
                setFormData({
                    title: '',
                    description: '',
                    quantity: '',
                    location: address,
                    expiryDate: '',
                })
                setLoading(false)
                setImageOfDonatedFood(null)
                setPreview(null)
                setError(null)
                toast.success("post published successfully")
            }
            if (!data.success) {
                setLoading(false)
                setError(data.message)
            }
        } catch (error) {
            setLoading(false)
            toast.error(serverError(error))
        }
    }
    return (
        <div className="min-h-screen w-full bg-cover bg-center flex items-center justify-center relative px-2 sm:px-4"
            style={{ backgroundImage: "url('/donatebg.jpg')" }}>
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0"></div>
            <div className="relative z-10 w-full sm:w-[90%] max-w-2xl bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-8 shadow-xl text-white flex flex-col items-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-white">Post a Food For Donation</h2>
                <br />
                {error && (<p className='text-center text-[red] mb-[20px]'>{error}</p>)}
                <form onSubmit={handleSubmit} className="space-y-6 w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative">
                            <Package className="absolute top-3 left-3 text-white" size={18} />
                            <input
                                type="text"
                                name="title"
                                placeholder="Food Title"
                                value={formData.title}
                                onChange={handleChange}
                                className="text-white pl-10 pr-4 py-2 w-full border rounded-lg shadow-sm bg-transparent"
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
                                className="text-white pl-10 pr-4 py-2 w-full border rounded-lg shadow-sm bg-transparent"
                                autoComplete='off'
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative">
                            <MapPin className="absolute top-3 left-3 text-white" size={18} />
                            <input
                                type="text"
                                name="location"
                                placeholder="Pickup Location"
                                value={formData.location}
                                onChange={handleChange}
                                className="text-white pl-10 pr-4 py-2 w-full border rounded-lg shadow-sm bg-transparent"
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
                                className="text-white pl-10 pr-4 py-2 w-full border rounded-lg shadow-sm bg-transparent"
                                autoComplete='off'
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative">
                            <PencilLine className="absolute top-3 left-3 text-white" size={18} />
                            <textarea
                                name="description"
                                placeholder="Food description"
                                value={formData.description}
                                onChange={handleChange}
                                className="text-white pl-10 pr-4 pt-2 h-40 w-full resize-none border rounded-lg shadow-sm bg-transparent"
                                autoComplete='off'
                            />
                        </div>

                        <div className="relative w-full h-40 sm:w-[290px] sm:h-[160px]">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-full h-full object-cover rounded-xl shadow-md"
                                />
                            ) : (
                                <div className="w-full h-full border border-dashed border-gray-300 rounded-xl flex items-center justify-center text-black bg-white/50 text-sm">
                                    No Image Selected
                                </div>
                            )}
                            <label className="absolute top-2 left-2 sm:top-2 sm:left-2 transform sm:-translate-x-0 sm:-translate-y-0 flex items-center gap-2 px-3 py-1.5 bg-[#FFF7E6] bg-opacity-80 rounded-md text-sm text-[green] shadow cursor-pointer hover:bg-opacity-100 transition">

                                <ImageIcon size={18} />
                                <input
                                    type="file"
                                    name="imageOfDonatedFood"
                                    accept='image/*'
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>

                    {loading ? (
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-xl font-semibold hover:bg-green-700 active:scale-95 transition-all shadow-md"
                        >
                            <Loader message={'Posting food. Please wait....'} />
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-xl font-semibold hover:bg-green-700 active:scale-95 transition-all shadow-md"
                        >
                            <HandHeart size={18} />
                            Post Food For Donation
                        </button>
                    )}
                </form>
            </div>
        </div>
    )
}
