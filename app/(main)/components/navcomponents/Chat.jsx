import { Context } from "@/app/contextapi/ContextProvider"
import { useRouter } from "next/navigation"
import { useContext, useState, useEffect } from "react"
import { MessageCircle } from "lucide-react"
import axios from "axios"
import { toast } from "react-toastify"
import { serverError } from "@/app/Utils/serverError"

const Chat = () => {
  const { user, isloggedin } = useContext(Context)
  const [allchats, setAllchats] = useState(user?.chatRequest || [])
  const [showRequestPanel, setShowRequestPanel] = useState(false)
  const router = useRouter()

  const handleAccept = async (senderId, index) => {
    try {
      axios.defaults.withCredentials = true
      const { data } = await axios.post('/api/chat', { index })
      if (data.success) {
        setAllchats((prev) => {
          return prev.filter((_, i) => {
            return i !== index
          })
        })
        setShowRequestPanel((prev) => !prev)
        router.push(`/pages/chat/${senderId}`)
      }
      if (!data.success) {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(serverError(error))
    }
  }

  const handleDecline = async (index) => {
    try {
      axios.defaults.withCredentials = true
      const { data } = await axios.post('/api/chat', { index })
      if (data.success) {
        setAllchats((prev) => {
          return prev.filter((_, i) => {
            return i !== index
          })
        })
        toast.success(data.message)
      }
      if (!data.success) {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(serverError(error))
    }
  }

  useEffect(() => {
    if (user?.chatRequest) {
      setAllchats(user.chatRequest)
    }
  }, [user])

  return (
    isloggedin && (
      <div className="relative">
        {/* Chat Icon */}
        <MessageCircle
          size={24}
          className="w-10 h-10 text-white bg-[#6baed6]/20 border border-[#6baed6] rounded-full p-2 shadow-md transition duration-300 hover:scale-105 hover:shadow-blue-400/40 cursor-pointer"
          onClick={() => setShowRequestPanel((prev) => !prev)}
        />

        {/* Red notification bubble */}
        {allchats.length > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center px-1 border border-white shadow">
            {allchats.length}
          </span>
        )}

        {/* Dropdown Panel */}
        {showRequestPanel && (
          <div className="absolute top-14 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-0 w-[92vw] max-w-[350px] md:w-80 bg-white border border-[#6baed6] rounded-lg shadow-xl z-50 p-4 backdrop-blur-md">
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="text-lg font-bold text-[#2171b5] tracking-wide">
                Message Requests
              </h3>
            </div>

            {allchats.length === 0 ? (
              <p className="text-gray-500 text-sm text-center">
                No message requests
              </p>
            ) : (
              <ul className="max-h-[300px] overflow-y-auto space-y-4 pr-1 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-200">
                {allchats.map((req, index) => {
                  return { req, originalindex: index }
                }).reverse().map(({ req, originalindex }) => {
                  return <li
                    key={req.senderId}
                    className="flex justify-between items-center p-3 bg-white border border-gray-200 rounded-lg shadow-sm"
                  >
                    <span className="text-blue-700 font-semibold truncate max-w-[100px]">
                      {req.name}
                    </span>
                    <div className="flex gap-2">
                      <button
                        className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition"
                        onClick={() => handleAccept(req.senderId, originalindex)}
                      >
                        Accept
                      </button>
                      <button
                        className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                        onClick={() => handleDecline(originalindex)}
                      >
                        Decline
                      </button>
                    </div>
                  </li>
                })

                }
              </ul>
            )}
          </div>
        )}
      </div>
    )
  )
}

export default Chat
