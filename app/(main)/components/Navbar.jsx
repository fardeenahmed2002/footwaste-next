'use client'
import { useContext, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import {
  Home,
  Info,
  Phone,
  UserCircle,
  Settings,
  LogOut,
  LogIn,
  HandHelping,
  FileText,
  Bell,
  Trash2,
  MessageCircle
} from 'lucide-react'
import Loader from '@/app/loader/Loader'
import { Context } from '@/app/contextapi/ContextProvider'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { serverError } from '@/app/Utils/serverError'

const Navbar = () => {
  const { isloggedin, setUser, setIsloggedin, user } = useContext(Context)
  const router = useRouter()
  const [showNotification, setShowNotification] = useState(false)
  const [showRequestPanel, setShowRequestPanel] = useState(false)
  const [countnotifications, setCountnotifications] = useState(user?.notificationcount)
  const [loading, setLoading] = useState(false)

  const navLinkClass =
    'flex items-center gap-1 text-white hover:text-green-950 font-semibold px-4 py-2 rounded-full transition-all bg-[#6baed6]/10 backdrop-blur-md border border-white/30 shadow-sm';

  const handlelogout = async () => {
    try {
      axios.defaults.withCredentials = true
      const { data } = await axios.post('/api/auth/logout')
      if (data.success) {
        setUser(false)
        setIsloggedin(false)
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handlenotification = async () => {
    try {
      axios.defaults.withCredentials = true
      const { data } = await axios.post('/api/user/blog/reportblog')
      if (data.success) {
        setCountnotifications(0)
      }
      if (!data.success) {
        toast.error(serverError(data.message))
      }
    } catch (error) {
      toast.error(serverError(error))
    }
  }

  const handledelete = async (index) => {
    try {
      axios.defaults.withCredentials = true
      setLoading(true)
      const { data } = await axios.post('/api/notify', { index })
      if (data.success) {
        window.location.reload()
      }
      if (!data.success) {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleAccept = async (senderId) => {
    router.push(`/pages/chat/${senderId}`)
  }

  const handleDecline = async (senderId) => {
    console.log('Decline clicked for:', senderId)
    // Implement decline logic here
  }

  return (
    <nav className="bg-[#2171b5]/70 border-b border-[#6baed6] shadow-md px-6 py-3 sticky top-0 z-50 backdrop-blur-md">
      <div className="absolute inset-0 bg-black/10 backdrop-blur-md z-0" />
      {isloggedin && !user?.isVerified && (
        <div className="relative z-10 flex justify-center py-2 mb-2 bg-yellow-100/80 backdrop-blur-sm rounded-md shadow">
          <span className="text-sm text-yellow-900 font-medium">
            Your account isn’t verified. Please{' '}
            <Link href="/pages/verification" className="underline text-yellow-900 hover:text-yellow-700">
              verify now
            </Link>{' '}
            to unlock all features.
          </span>
        </div>
      )}
      <div className="relative z-10 flex flex-wrap justify-between items-center gap-6">
        <div className="flex items-center gap-3 bg-[#6baed6]/10 backdrop-blur-md p-2 px-4 rounded-full border border-white/30 shadow">
          <Link href="/">
            <Image
              src="/sitelogo.jpeg"
              alt="Logo"
              width={44}
              height={44}
              className="rounded-full shadow"
            />
          </Link>
          <h1 className="text-2xl font-extrabold text-white drop-shadow-sm">
            Food Waste Rescue
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/" className={navLinkClass}>
            <Home size={18} /> Home
          </Link>
          <Link href="/pages/about" className={navLinkClass}>
            <Info size={18} /> About
          </Link>
          <Link href="/pages/contactus" className={navLinkClass}>
            <Phone size={18} /> Contact
          </Link>
          <Link href="/pages/allblogs" className={navLinkClass}>
            <FileText size={18} /> Blogs
          </Link>
          {
            user?.isVerified && user?.role === 'user' &&
            <Link href="/user/donate" className={navLinkClass}>
              <HandHelping size={18} /> Donate
            </Link>
          }
          {
            user?.isVerified && user?.role === 'donor' &&
            <Link href="/donor" className={navLinkClass}>
              <HandHelping size={18} /> Donate
            </Link>
          }
        </div>
        <div className='flex flex-row justify-center items-center gap-[30px]'>
          {/* Notification Bell */}
          {isloggedin && (
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
                    {user?.notifications.map((_, i, arr) => {
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
          )}

          {/* Message Request Panel */}
          {isloggedin && (
            <div className="relative group cursor-pointer">
              <MessageCircle
                size={24}
                className="w-10 h-10 text-white bg-[#6baed6]/20 border border-[#6baed6] rounded-full p-2 shadow-md transition duration-300 hover:scale-105 hover:shadow-blue-400/40"
                onClick={() => {
                  setShowRequestPanel((prev) => !prev)
                  setShowNotification(false)
                }}
              />
              {user?.chatRequest?.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center px-1 border border-white shadow">
                  {user.chatRequest.length}
                </span>
              )}
              {showRequestPanel && (
                <div className="absolute top-16 right-[75px] w-80 bg-white border border-[#6baed6] rounded-lg shadow-xl z-[9999] p-4 backdrop-blur-md">
                  <div className="flex items-center justify-between mb-4 px-2">
                    <h3 className="text-lg font-bold text-[#2171b5] tracking-wide">Message Requests</h3>
                  </div>
                  {user?.chatRequest?.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center">No message requests</p>
                  ) : (
                    <ul className="max-h-[300px] overflow-y-auto space-y-4 pr-1 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-200">
                      {user.chatRequest.map((req, i) => (
                        <li key={req.senderId} className="flex justify-between items-center p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                          <span className="text-blue-700 font-semibold truncate max-w-[100px]">{req.name}</span>
                          <div className="flex gap-2">
                            <button
                              className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition"
                              onClick={() => handleAccept(req.senderId)}
                            >
                              Accept
                            </button>
                            <button
                              className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                              onClick={() => handleDecline(req.senderId)}
                            >
                              Decline
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          )}

          {/* User Avatar / Login */}
          <div>
            {isloggedin ? (
              <div className="dropdown dropdown-end">
                <button
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar"
                >
                  {user?.image ? (
                    <Image
                      src={user.image}
                      alt="profile img"
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <UserCircle size={30} />
                  )}
                </button>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 p-2 shadow backdrop-blur-md border border-white/30 rounded-box w-52 z-10"
                >
                  <li>
                    <Link href="/pages/profile" className="flex items-center gap-2 bg-[white] mb-[5px]">
                      <UserCircle size={18} /> Profile
                    </Link>
                  </li>
                  <li>
                    <button className="flex items-center gap-2 w-full text-left bg-[white] mb-[5px]">
                      <Settings size={18} /> Settings
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handlelogout}
                      className="flex items-center gap-2 text-red-500 hover:text-red-700 w-full text-left bg-[white]"
                      type="button"
                    >
                      <LogOut size={18} /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <button
                onClick={() => router.push('/login')}
                className="group flex items-center gap-2 bg-white/30 backdrop-blur-md border border-white/30 text-white px-5 py-2 rounded-full font-semibold shadow hover:scale-105 transition-all"
              >
                <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
