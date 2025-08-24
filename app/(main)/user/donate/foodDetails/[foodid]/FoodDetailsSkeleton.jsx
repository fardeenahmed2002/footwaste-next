'use client'

const FoodDetailsSkeleton = () => {
  return (
    <div className="relative min-h-[calc(100vh-87px)] flex justify-center items-center p-4">
      <div className="max-w-4xl w-full bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 overflow-hidden animate-pulse">
        <div className="flex flex-col sm:flex-row">
          {/* Image placeholder */}
          <div className="sm:w-1/2 w-full h-64 bg-gray-600 rounded-t-3xl sm:rounded-tr-none sm:rounded-l-3xl" />

          {/* Info placeholder */}
          <div className="sm:w-1/2 w-full p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              {/* Title */}
              <div className="h-6 w-3/4 bg-gray-500 rounded"></div>
              {/* Status */}
              <div className="h-4 w-1/4 bg-gray-400 rounded-full"></div>
              {/* Info List */}
              <div className="space-y-2">
                <div className="h-3 w-1/2 bg-gray-400 rounded"></div>
                <div className="h-3 w-1/3 bg-gray-400 rounded"></div>
                <div className="h-3 w-2/3 bg-gray-400 rounded"></div>
                <div className="h-3 w-1/2 bg-gray-400 rounded"></div>
                <div className="h-16 w-full bg-gray-500 rounded"></div>
              </div>
            </div>
            {/* Biters button placeholder */}
            <div className="h-10 w-10 bg-gray-500 rounded-full self-end mt-2"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FoodDetailsSkeleton
