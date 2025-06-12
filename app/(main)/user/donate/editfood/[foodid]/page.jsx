"use client"
import { useState, useEffect } from 'react'
import { ImageIcon, MapPin, Calendar, PencilLine, Package, StickyNote, FileEdit } from "lucide-react"
import axios from 'axios'
import { toast } from 'react-toastify'
import Loader from '@/app/loader/Loader'
import { useParams } from 'next/navigation'
import { serverError } from '@/app/Utils/serverError'
export default function Page() {
    const { foodid } = useParams()
    const [imageOfDonatedFood, setImageOfDonatedFood] = useState(null)
    const [preview, setPreview] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        quantity: '',
        location: '',
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
    const foodsList = async () => {
        try {
            axios.defaults.withCredentials = true
            const { data } = await axios.get(`/api/user/donatedfoodbyid/${foodid}`)
            if (data.success) {
                setFormData({
                    ...data.food,
                    expiryDate: data.food.expiryDate.split("T")[0]
                })
                setPreview(data.food.imageOfDonatedFood)
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
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const form = new FormData();
            form.append("title", formData.title)
            form.append("quantity", formData.quantity)
            form.append("location", formData.location)
            form.append("expiryDate", formData.expiryDate)
            form.append("description", formData.description)
            form.append("imageOfDonatedFood", imageOfDonatedFood)
            console.log(form)
            axios.defaults.withCredentials = true
            const { data } = await axios.put(`/api/user/donatedfoodbyid/${foodid}`, form, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            if (data.success) {
                setFormData({
                    title: '',
                    description: '',
                    quantity: '',
                    location: '',
                    expiryDate: '',
                })
                setLoading(false)
                setImageOfDonatedFood(null)
                setPreview(null)
                setError(null)
                toast.success("post updated successfully")
            }
            
        } catch (error) {
            setError(serverError(error))
            setLoading(false)
        }
    }
    return (
        <div className="min-h-screen w-full bg-cover bg-center flex items-center justify-center relative"
            style={{ backgroundImage: "url('/donatebg.jpg')" }}>
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0"></div>
            <div className="relative z-10 w-[90%] my-[20px] max-w-2xl bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl text-white flex flex-col items-center">
                <div className="">
                    <h2 className="text-3xl font-bold text-center text-white">Edit Post</h2> <br />
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
                                    className="text-white pl-10 pr-4 py-2 w-full border rounded-lg shadow-sm "
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
                                    className=" text-white pl-10 pr-4 py-2 w-full border rounded-lg shadow-sm "
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
                                    className=" text-white pl-10 pr-4 py-2 w-full border rounded-lg shadow-sm "
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
                                    className=" text-white pl-10 pr-4 py-2 w-full border rounded-lg shadow-sm "
                                    autoComplete='off'
                                />
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
                                    className=" text-white pl-10 pr-4 pt-2 h-40 w-full resize-none border rounded-lg shadow-sm "
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
                                    <div className="w-full h-full bg-[] border border-dashed border-gray-300 rounded-xl flex items-center justify-center text-black">
                                        No Image Selected
                                    </div>
                                )}
                                <label className="absolute bottom-[112px] left-[25px] transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-1.5 bg-[#FFF7E6] bg-opacity-80 rounded-md text-sm text-[green] shadow cursor-pointer hover:bg-opacity-100 transition">
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
                                <Loader message={'updating data...'}/>
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-xl font-semibold hover:bg-green-700 active:scale-95 transition-all shadow-md"
                            >
                                <FileEdit size={18} />
                                Update
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}
