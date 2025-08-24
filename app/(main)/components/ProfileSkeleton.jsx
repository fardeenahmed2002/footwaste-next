'use client'

const ProfileSkeleton = () => {
  return (
    <div className="min-h-[calc(100vh-87px)] flex items-center justify-center px-4 py-6 relative">
      <div className="relative z-10 w-full max-w-5xl flex flex-col md:grid md:grid-cols-3 gap-4 animate-pulse">
        
        <div className="flex items-center justify-center p-6">
          <div className="w-40 h-40 rounded-full bg-gray-600" />
        </div>

        <div className="md:col-span-2 p-4 sm:p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
              <div className="space-y-2">
                <div className="h-8 w-40 bg-gray-600 rounded"></div>
                <div className="h-4 w-20 bg-gray-600 rounded"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-4 w-24 bg-gray-600 rounded"></div>
                <div className="h-4 w-48 bg-gray-600 rounded"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-24 bg-gray-600 rounded"></div>
                <div className="h-4 w-48 bg-gray-600 rounded"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-28 bg-gray-600 rounded"></div>
                <div className="h-4 w-40 bg-gray-600 rounded"></div>
                <div className="h-4 w-32 bg-gray-600 rounded"></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-6">
            <div className="sm:w-1/2 space-y-2">
              <div className="h-5 w-32 bg-gray-600 rounded"></div>
              <div className="h-4 w-48 bg-gray-600 rounded"></div>
              <div className="h-4 w-40 bg-gray-600 rounded"></div>
            </div>
            <div className="sm:w-1/2 space-y-2">
              <div className="h-5 w-24 bg-gray-600 rounded"></div>
              <div className="h-4 w-32 bg-gray-600 rounded"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProfileSkeleton
