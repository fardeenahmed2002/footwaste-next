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
  const [showProfileCard, setShowProfileCard] = useState(null)

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
        headers: { 'Content-Type': 'application/json' }
      })
      if (data.success) {
        setBlogs(prev =>
          prev.map(blog =>
            blog._id === blogid
              ? { ...blog, stars: isChecked ? blog.stars + 1 : blog.stars - 1 }
              : blog
          )
        );
      } else {
        setError(serverError(data.message))
      }
    } catch (error) {
      setError(serverError(error.message))
    }
  }

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('/api/user/blog/allblogs')
        setBlogs(res.data.blogs || [])
      } catch (err) {
        setError('Failed to load blogs')
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
          <article key={blog._id} className="bg-white rounded-lg shadow-sm border border-gray-200 max-w-md mx-auto">
            <header className="flex items-center justify-between p-3">
              <div className="flex items-center space-x-2">
                {/* Blogger Avatar */}
                <img
                  src={blog.blogger.image || '/default-profile.png'}
                  alt={blog.blogger.name}
                  className="rounded-full object-cover cursor-pointer w-[40px] h-[40px]"
                  onClick={() => setShowProfileCard(prev => prev === blog._id ? null : blog._id)}
                />

                {/* Blogger Name & Time */}
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{blog.blogger.name}</h3>
                  <time className="text-xs text-gray-500" dateTime={blog.createdAt}>
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </time>
                </div>
              </div>

              {/* Report Dropdown */}
              {isloggedin && (
                <div className="dropdown dropdown-end">
                  <button tabIndex={0} className="btn btn-ghost btn-sm">
                    <MoreVertical size={18} className="text-gray-500" />
                  </button>
                  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40">
                    <Link href={`/pages/report/${blog._id}`}>Report</Link>
                  </ul>
                </div>
              )}
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

            {/* Profile Card Modal - Shown on avatar click */}
            {showProfileCard === blog._id && (
              <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
                {/* Close area */}
                <div
                  className="absolute inset-0"
                  onClick={() => setShowProfileCard(null)}
                ></div>

                {/* Card content */}
                <div className="relative bg-white rounded-2xl shadow-xl border border-gray-200 p-6 w-[90vw] max-w-sm z-50 text-center space-y-3">
                  <img
                    src={blog.blogger.image || '/default-profile.png'}
                    alt={blog.blogger.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-blue-500 shadow-md"
                  />
                  <h3 className="text-lg font-bold text-gray-800">{blog.blogger.name}</h3>
                  <p className="text-sm text-gray-600">{blog.blogger.email}</p>
                  <p className="text-sm text-gray-500">{blog.blogger.address}</p>
                  <Link
                    href={`/pages/chat/${blog.blogger._id}`}
                    className="inline-block mt-3 px-6 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition"
                  >
                    Message
                  </Link>
                </div>
              </div>
            )}
          </article>
        ))
      )}
    </div>
  )



}

export default Page
