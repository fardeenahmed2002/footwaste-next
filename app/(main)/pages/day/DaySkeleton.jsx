'use client'

import React from "react"

const DaySkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="flex flex-wrap justify-center gap-6 w-full">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-md border border-gray-200 flex flex-col overflow-hidden animate-pulse"
            style={{ width: "320px" }}
          >
            <div className="w-full h-48 bg-gray-300" />
            <div className="flex-1 p-4 flex flex-col justify-between space-y-3">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gray-300" />
                <div className="flex flex-col space-y-1">
                  <div className="w-20 h-3 bg-gray-300 rounded" />
                  <div className="w-16 h-2 bg-gray-200 rounded" />
                </div>
              </div>
              <div className="w-3/4 h-4 bg-gray-300 rounded" />
              <div className="w-full h-12 bg-gray-200 rounded" />
              <div className="mt-4 border-t border-gray-200 pt-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-3 bg-gray-300 rounded" />
                  <div className="w-16 h-3 bg-gray-300 rounded" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-8 bg-gray-200 rounded-full" />
                  <div className="w-12 h-8 bg-gray-300 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DaySkeleton
