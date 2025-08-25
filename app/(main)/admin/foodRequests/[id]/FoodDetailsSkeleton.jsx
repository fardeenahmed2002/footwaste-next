const FoodDetailsSkeleton = () => {
  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow space-y-4 animate-pulse">
      {/* Image */}
      <div className="w-full h-64 bg-gray-300 rounded-md" />

      {/* Title & description */}
      <div className="h-6 w-3/4 bg-gray-300 rounded" />
      <div className="h-4 w-full bg-gray-200 rounded" />

      {/* Food info */}
      <div className="space-y-2 mt-2">
        <div className="h-4 w-1/2 bg-gray-200 rounded" />
        <div className="h-4 w-2/3 bg-gray-200 rounded" />
        <div className="h-4 w-1/3 bg-gray-200 rounded" />
        <div className="h-4 w-1/4 bg-gray-200 rounded" />
      </div>

      {/* Donor info */}
      <div className="p-3 bg-gray-100 rounded-md space-y-2">
        <div className="h-4 w-1/2 bg-gray-300 rounded" />
        <div className="h-4 w-2/3 bg-gray-300 rounded" />
        <div className="h-4 w-1/3 bg-gray-300 rounded" />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-4">
        <div className="h-10 flex-1 bg-green-300 rounded-md" />
        <div className="h-10 flex-1 bg-red-300 rounded-md" />
      </div>
    </div>
  )
}

export default FoodDetailsSkeleton
