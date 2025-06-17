'use client'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { MoreVertical } from 'lucide-react'
import Loader from '@/app/loader/Loader'
import { serverError } from '@/app/Utils/serverError'
import { Context } from '@/app/contextapi/ContextProvider'
const Page = () => {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { user, isloggedin } = useContext(Context)
    const [displayStar, setDisplayStar] = useState(new Set())
    useEffect(() => {
        if (user?.starredBlogs?.length) {
            const setOfStarred = new Set(user.starredBlogs.map(blog => blog._id))
            setDisplayStar(setOfStarred)
        }
    }, [user])
    const star = async (blogid, isChecked) => {
        try {
            const status = isChecked ? "starred" : "unstarred"
            axios.defaults.withCredentials = true
            const { data } = await axios.post(`/api/user/blog/blogbyid/${blogid}`, { status }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (data.success) {
                setBlogs((prevBlogs) =>
                    prevBlogs.map((blog) =>
                        blog._id === blogid
                            ? { ...blog, stars: isChecked ? blog.stars + 1 : blog.stars - 1 }
                            : blog
                    )
                );
            }
            else {
                setError(serverError(data.message))
            }
        } catch (error) {
            setError(serverError(error.message))
        }
    }
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('/api/user/blog/allblogs')
                setBlogs(response.data.blogs || [])
            } catch (err) {
                setError('Failed to load blogs')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchBlogs()
    }, [])
    if (error) return <div className="p-4 text-red-500">{error}</div>
    return (
        <div className="max-w-3xl mx-auto p-4 space-y-6">
            {loading ? (
                <Loader message="getting blogs" />
            ) : (
                blogs.map(blog => (
                    <article
                        key={blog._id}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 max-w-md mx-auto"
                    >
                        <header className="flex items-center justify-between p-3">
                            <div className="flex items-center">
                                <img
                                    src={blog.blogger.image || '/default-profile.png'}
                                    alt={blog.blogger.name}
                                    width={32}
                                    height={32}
                                    className="rounded-full object-cover"
                                />
                                <div className="ml-2">
                                    <h3 className="font-semibold text-gray-900 text-sm">{blog.blogger.name}</h3>
                                    <time className="text-xs text-gray-500" dateTime={blog.createdAt}>
                                        {new Date(blog.createdAt).toLocaleDateString()}
                                    </time>
                                </div>
                            </div>
                            {isloggedin && (<div className="dropdown dropdown-end">
                                <button tabIndex={0} className="btn btn-ghost btn-sm">
                                    <MoreVertical size={18} className="text-gray-500" />
                                </button>
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40"
                                >
                                    <Link href={`/pages/report/${blog._id}`}>Report</Link>
                                </ul>
                            </div>)}
                        </header>
                        <section className="px-3 pb-3">
                            <h2 className="text-md font-semibold mb-1 line-clamp-1">{blog.title}</h2>
                            <p className="text-gray-800 text-sm mb-2 line-clamp-3">{blog.content}</p>
                            {blog.image && (
                                <div className="rounded-lg overflow-hidden mb-2">
                                    <Image
                                        src={blog.image}
                                        alt={blog.title}
                                        width={320}
                                        height={180}
                                        className="w-full object-cover rounded"
                                    />
                                </div>
                            )}
                            {
                                isloggedin ? (
                                    <nav className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50 text-gray-700 text-sm rounded-b-md">
                                        <label className="cursor-pointer flex items-center gap-2 group">
                                            <input
                                                type="checkbox"
                                                className="hidden"
                                                onChange={(e) => star(blog._id, e.target.checked)}
                                            />
                                            {displayStar.has(blog._id) ? (
                                                <span className="text-yellow-400 text-xl group-hover:scale-110 transition-transform">⭐</span>
                                            ) : (
                                                <span className="text-yellow-400 text-xl group-hover:scale-110 transition-transform">☆</span>
                                            )}
                                            <span className="group-hover:text-yellow-600 transition">Star ({blog.stars})</span>
                                        </label>

                                        <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition">
                                            💬 <span className="font-medium">Comment</span>
                                        </button>
                                    </nav>
                                ) : (
                                    <p className="text-sm text-gray-500 italic mt-2">Login to see star and comment options.</p>
                                )
                            }
                        </section>
                    </article>
                ))
            )}
        </div>
    )

}

export default Page
