"use client"
import { useState } from "react"
import { ImageIcon, Pencil, PenLine } from "lucide-react"
import { toast } from "react-toastify"
import axios from "axios"
import Loader from "@/app/loader/Loader"
import { serverError } from "@/app/Utils/serverError"

export default function Page() {
    const [formData, setFormData] = useState({
        title: "",
        content: ""
    })
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        setImage(file)
        if (file) setPreview(URL.createObjectURL(file))
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setError(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        if (!formData.title || !formData.content || !image) {
            setLoading(false)
            setError("All fields are required.")
            return
        }

        try {
            const form = new FormData()
            form.append("title", formData.title)
            form.append("content", formData.content)
            form.append("image", image)

            const { data } = await axios.post("/api/user/blog", form, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true
            })

            if (data.success) {
                setFormData({ title: "", content: "" })
                setImage(null)
                setPreview(null)
                toast.success("Blog posted successfully!")
            } else {
                setError(serverError(error.message))
            }
        } catch (error) {
            setError(serverError(error))
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="min-h-[calc(100vh-87px)] bg-gradient-to-tr from-slate-900 to-slate-800 flex items-center justify-center px-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl max-w-4xl w-full flex flex-col md:flex-row overflow-hidden">
                <div className="md:w-1/2 relative flex items-center justify-center bg-white/10 p-6">
                    {preview ? (
                        <img src={preview} alt="Preview" className="rounded-xl object-cover w-full h-80 md:h-full" />
                    ) : (
                        <div className="w-full h-80 md:h-full border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-300">
                            No Cover Image Selected
                        </div>
                    )}
                    <label className="absolute top-4 left-4 bg-white/80 px-3 py-1 rounded-md text-sm text-gray-700 flex items-center gap-1 cursor-pointer hover:bg-white">
                        <ImageIcon size={16} />
                        Upload
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </label>
                </div>
                <div className="md:w-1/2 p-8 text-white space-y-6">
                    <h2 className="text-3xl font-bold flex items-center gap-2">
                        <Pencil size={24} />
                        Create a Blog Post
                    </h2>

                    {error && <p className="text-red-400">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <PenLine className="absolute top-3 left-3 text-white" size={18} />
                            <input
                                type="text"
                                name="title"
                                placeholder="Blog Title"
                                value={formData.title}
                                onChange={handleChange}
                                className="pl-10 pr-4 py-2 w-full border bg-transparent border-white/30 rounded-lg shadow-sm placeholder-white/60"
                                autoComplete="off"
                            />
                        </div>

                        <div className="relative">
                            <textarea
                                name="content"
                                placeholder="Write your blog content..."
                                value={formData.content}
                                onChange={handleChange}
                                className="pl-4 pr-4 pt-2 w-full h-40 resize-none border bg-transparent border-white/30 rounded-lg shadow-sm placeholder-white/60"
                                autoComplete="off"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 py-2 rounded-xl font-semibold transition-all shadow-md"
                            disabled={loading}
                        >
                            {loading ? <Loader message="Publishing..." /> : <>Post Blog</>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
