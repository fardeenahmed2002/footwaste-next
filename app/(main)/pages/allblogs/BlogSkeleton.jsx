'use client'
import React from 'react'

const BlogSkeleton = () => {
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      {[1, 2, 3].map(i => (
        <article
          key={i}
          className="bg-white rounded-lg shadow-sm border border-gray-200 max-w-md mx-auto animate-pulse"
        >
  
          <header className="flex items-center justify-between p-3">
            <div className="flex items-center space-x-2">
  
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>

      
              <div className="space-y-1">
                <div className="w-24 h-3 bg-gray-300 rounded"></div>
                <div className="w-16 h-2 bg-gray-200 rounded"></div>
              </div>
            </div>

            <div className="w-6 h-6 bg-gray-300 rounded"></div>
          </header>


          <section className="px-3 pb-3 space-y-3">

            <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
            <div className="w-full h-3 bg-gray-200 rounded"></div>
            <div className="w-5/6 h-3 bg-gray-200 rounded"></div>
            <div className="w-full h-40 bg-gray-300 rounded-lg"></div>
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50 rounded-b-md">
              <div className="w-24 h-4 bg-gray-300 rounded"></div>
              <div className="w-20 h-4 bg-gray-300 rounded"></div>
            </div>
          </section>
        </article>
      ))}
    </div>
  )
}

export default BlogSkeleton
