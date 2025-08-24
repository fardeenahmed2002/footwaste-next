'use client'

import axios from 'axios'
import Image from 'next/image'
import {  useEffect, useState } from 'react'
import BlogSkeleton from './BlogSkeleton'

const Page = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showProfileCard, setShowProfileCard] = useState(null)

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
        <BlogSkeleton />
      ) : (
        blogs.map(blog => (
          <article key={blog._id} className="bg-white rounded-lg shadow-sm border border-gray-200 max-w-md mx-auto">
            <header className="flex items-center justify-start p-3">
              <img
                src={blog?.blogger?.image || '/default-profile.png'}
                alt={blog?.blogger?.name}
                className="rounded-full object-cover cursor-pointer w-[40px] h-[40px]"
                onClick={() => setShowProfileCard(prev => prev === blog._id ? null : blog._id)}
              />
              <div className="ml-2">
                <h3 className="font-semibold text-gray-900 text-sm">{blog?.blogger?.name}</h3>
              </div>
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
            </section>
            {showProfileCard === blog._id && (
              <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
                <div
                  className="absolute inset-0"
                  onClick={() => setShowProfileCard(null)}
                ></div>
                <div className="relative bg-white rounded-2xl shadow-xl border border-gray-200 p-6 w-[90vw] max-w-sm z-50 text-center space-y-3">
                  <img
                    src={blog?.blogger?.image || '/default-profile.png'}
                    alt={blog?.blogger?.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-blue-500 shadow-md"
                  />
                  <h3 className="text-lg font-bold text-gray-800">{blog?.blogger?.name}</h3>
                  <p className="text-sm text-gray-600">{blog?.blogger?.email}</p>
                  <p className="text-sm text-gray-500">{blog?.blogger?.address}</p>
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
