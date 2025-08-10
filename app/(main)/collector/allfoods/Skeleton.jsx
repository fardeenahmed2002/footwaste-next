const Skeleton = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow overflow-hidden flex flex-col">
      <div className="w-full h-48 bg-gray-200" />
      <div className="p-5 flex flex-col justify-between flex-grow space-y-4">
        <div>
          <div className="h-5 w-3/4 bg-gray-200 rounded mb-3" />
          <div className="h-4 w-1/2 bg-gray-200 rounded" />
        </div>
        <div className="flex flex-wrap justify-between items-center mt-auto gap-2">
          <div className="h-9 w-32 bg-gray-300 rounded-full" />
          <div className="h-6 w-24 bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export default Skeleton
