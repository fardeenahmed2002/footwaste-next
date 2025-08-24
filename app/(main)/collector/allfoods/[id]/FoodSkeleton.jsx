"use client"

const FoodSkeleton = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto animate-pulse">
      <div className="flex flex-col md:flex-row gap-[50px]">
        {/* Map Section Skeleton */}
        <div className="w-full md:w-1/2">
          <div className="rounded-xl border border-white/30 h-full">
            <div className="h-10 bg-gray-700 rounded-t-lg" />
            <div className="h-10 bg-gray-700" />
            <div className="h-[400px] bg-gray-700 rounded-b-xl" />
          </div>
        </div>

        {/* Food Details Section Skeleton */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
   
          
          {/* Text Details */}
          <div>
            <div className="w-48 h-8 bg-gray-700 rounded mb-2" />
            <div className="w-36 h-5 bg-gray-700 rounded mb-2" />
            <div className="w-full h-4 bg-gray-700 rounded mb-1" />
            <div className="w-2/3 h-4 bg-gray-700 rounded mb-1" />
            <div className="w-1/2 h-4 bg-gray-700 rounded" />
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <div className="w-28 h-10 bg-gray-700 rounded" />
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default FoodSkeleton
