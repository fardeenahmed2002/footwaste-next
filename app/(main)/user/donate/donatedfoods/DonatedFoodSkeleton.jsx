'use client'

const DonatedFoodSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-lg shadow-md overflow-hidden flex flex-col bg-black/10 backdrop-blur-sm animate-pulse"
          style={{ minWidth: 0 }}
        >
   
          <div className="w-full h-28 sm:h-32 bg-gray-600 rounded-t-lg" />

          <div className="p-3 flex flex-col justify-between flex-grow space-y-2">
            <div className="h-4 w-3/4 bg-gray-500 rounded"></div>
            <div className="h-3 w-1/2 bg-gray-500 rounded"></div>
            <div className="h-3 w-full bg-gray-500 rounded"></div>
            <div className="h-8 w-full bg-gray-400 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DonatedFoodSkeleton
