import React from 'react'

const page = () => {
  return (
    isloggedin && (
      <div className="relative group cursor-pointer">
        <Bell
          size={24}
          className="w-10 h-10 text-white bg-[#6baed6]/20 border border-[#6baed6] rounded-full p-2 shadow-md transition duration-300 hover:scale-105 hover:shadow-blue-400/40"
          onClick={() => {
            setShowNotification((prev) => !prev)
            setShowRequestPanel(false)
          }}
        />
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center px-1 border border-white shadow">
          {countnotifications === 0 ? 0 : user?.notificationcount}
        </span>
        {showNotification && (
          <div className="absolute top-16 right-[-104px] w-80 h-[500px] bg-white border border-[#6baed6] rounded-lg shadow-xl z-[9999] p-4 backdrop-blur-md">
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="text-lg font-bold text-[#2171b5] tracking-wide">Notifications</h3>
              <p
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline cursor-pointer transition-all duration-200"
                onClick={handlenotification}
              >
                Mark all as read
              </p>
            </div>
            <ul className="h-[400px] overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-200 space-y-3">
              {
                user?.notifications.map((_, i, arr) => {
                  const reversedIndex = arr.length - 1 - i
                  const notif = arr[reversedIndex]
                  return (
                    <li
                      key={reversedIndex}
                      className="bg-white hover:bg-blue-50 transition-colors duration-300 p-4 rounded-lg shadow border border-gray-300 flex justify-between items-start"
                    >
                      <div className="flex-1">
                        <h4 className="font-bold text-blue-600">{notif.title}</h4>
                        <p className="text-gray-700">{notif.message}</p>
                      </div>
                      <button
                        className="text-gray-400 hover:text-red-600 transition-colors"
                        onClick={() => handledelete(reversedIndex)}
                      >
                        <Trash2 size={25} />
                      </button>
                    </li>
                  )
                })}
            </ul>
          </div>
        )}
      </div>
    )


  )
}

export default page
