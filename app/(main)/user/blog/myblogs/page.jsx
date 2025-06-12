"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import Image from "next/image"
import { MdCalendarToday } from "react-icons/md"
import { Trash2 } from "lucide-react"
import Link from "next/link"
import Loader from "@/app/loader/Loader"
import { toast } from "react-toastify"
import { serverError } from "@/app/Utils/serverError"
const Page = () => {
    const [listOfBlogs, setListOfBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const fetchBlogs = async () => {
        try {
            axios.defaults.withCredentials = true
            const { data } = await axios.get("/api/user/blog")
            if (data.success) {
                setListOfBlogs(data.blog)
            } else {
                toast.error(serverError(data.message))

            }
        } catch (error) {
            toast.error(serverError(error))
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    const deleteBlog = async (id) => {
        try {
            axios.defaults.withCredentials = true
            const { data } = await axios.delete(`/api/user/blog/blogbyid/${id}`)
            if (data.success) {
                setListOfBlogs((old) => old.filter((blog) => blog._id !== id))
                toast.success("Blog deleted successfully")
            }
            if (!data.success) {
                toast.error(serverError(data.message))
            }
        } catch (error) {
            toast.error(serverError(error))
        }
    }

    useEffect(() => {
        fetchBlogs()
    }, [])

    return (
        <div
            className="p-6 relative bg-[#FFF7E6] bg-[url('/background-veggie-pattern.png')] 
            bg-repeat min-h-[calc(100vh-87px)]">
            <div className="absolute inset-0 bg-black/50 z-0" />
            <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-8 text-center text-white">All Blogs</h2>
                {loading ? (
                    <div className="flex justify-center items-center" style={{ height: '200px' }}>
                        <Loader message="Loading blogs..." />
                    </div>
                ) : listOfBlogs.length === 0 ? (
                    <p className="text-center text-white font-black">No blogs yet</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                        {listOfBlogs.map((blog) => (
                            <div
                                key={blog._id}
                                className="rounded-xl bg-white/10 backdrop-blur-md shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-white/20"
                            >
                                <div className="relative w-full h-40">
                                    <Image
                                        src={blog.image}
                                        alt={blog.title}
                                        fill
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div className="p-4 flex flex-col gap-2 text-white">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-md font-bold uppercase truncate">{blog.title}</h3>
                                        <div className="flex flex-col items-end gap-1">
                                            <label htmlFor={`modal-${blog._id}`} className="cursor-pointer text-red-500 hover:text-red-700">
                                                <Trash2 size={16} />
                                            </label>
                                            <Link
                                                href={`/edit-blog/${blog._id}`}
                                                className="text-blue-400 text-xs hover:underline"
                                            >
                                                Edit
                                            </Link>
                                        </div>
                                    </div>
                                    <p className="flex items-center text-xs text-white/80">
                                        <MdCalendarToday className="mr-1 text-green-400" size={16} />
                                        {new Date(blog.createdAt).toLocaleDateString()}
                                    </p>
                                    <p className="text-sm text-white line-clamp-4">{blog.content}</p>
                                </div>

                                <input type="checkbox" id={`modal-${blog._id}`} className="modal-toggle" />
                                <div className="modal" role="dialog">
                                    <div className="modal-box bg-white text-black">
                                        <h3 className="font-bold text-lg">Confirm Deletion</h3>
                                        <p className="py-4">
                                            Are you sure you want to delete <strong>{blog.title}</strong>? This cannot be undone.
                                        </p>
                                        <div className="modal-action">
                                            <label
                                                htmlFor={`modal-${blog._id}`}
                                                className="btn bg-red-600 hover:bg-red-700 text-white"
                                                onClick={() => deleteBlog(blog._id)}
                                            >
                                                Delete
                                            </label>
                                            <label htmlFor={`modal-${blog._id}`} className="btn bg-gray-300 text-black">Cancel</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Page
