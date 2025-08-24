'use client'

const OrgSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center animate-pulse"
        >
          <div className="w-28 h-28 mb-4 rounded-full bg-gray-300 shadow-lg ring-4 ring-gray-200" />
          <div className="h-6 w-40 bg-gray-300 rounded mb-2" />
          <div className="h-4 w-48 bg-gray-200 rounded mb-4" />
          <div className="h-10 w-32 bg-gray-300 rounded-full" />
        </div>
      ))}
    </div>
  )
}

export default OrgSkeleton
