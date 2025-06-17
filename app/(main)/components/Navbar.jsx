'use client'
import { useContext, useEffect, useState } from 'react'
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
  Trash2
} from 'lucide-react'

import { Context } from '@/app/contextapi/ContextProvider'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { serverError } from '@/app/Utils/serverError'
import { set } from 'date-fns'

const Navbar = () => {
  const { isloggedin, setUser, setIsloggedin, user } = useContext(Context)
  const router = useRouter()
  const [showNotification, setShowNotification] = useState(false)
  const [countnotifications, setCountnotifications] = useState(user?.notificationcount)
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
    setShowNotification(!showNotification)
    try {
      axios.defaults.withCredentials = true
      const { data } = await axios.post('/api/user/blog/reportblog')
      if (data.success) {
        setCountnotifications(0)
      }
      if (!data.success) {
        setCountnotifications(0)
        toast.error(serverError(data.message))
      }
    } catch (error) {
      console.error(error)
      toast.error(serverError(error))
    }
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
            user?.isVerified &&
            (user?.role === 'user') &&
            <Link href="/user/donate" className={navLinkClass}>
              <HandHelping size={18} /> Donate
            </Link>
          }
          {
            user?.isVerified &&
            (user?.role === 'donor') &&
            <Link href="/donor" className={navLinkClass}>
              <HandHelping size={18} /> Donate
            </Link>
          }
        </div>

        <div className='flex flex-row justify-center align-middle items-center gap-[40px]'>


          {isloggedin && (<div className="relative group cursor-pointer" onClick={() => { handlenotification() }}>
            <Bell
              size={24}
              className="w-10 h-10 text-white bg-[#6baed6]/20 border border-[#6baed6] rounded-full p-2 shadow-md transition duration-300 group-hover:scale-105 group-hover:shadow-blue-400/40"
            />
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center px-1 border border-white shadow">
              {countnotifications === 0 ? 0 : user?.notificationcount}
            </span>
            {showNotification && (
              <div className="absolute top-16 right-10 w-80 bg-white border border-[#6baed6] rounded-lg shadow-xl z-[9999] p-4 backdrop-blur-md">
                <h3 className="font-bold text-lg mb-2 text-[#2171b5]">Notifications</h3>
                <ul className="max-h-60 overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-200 space-y-3">
                  {user?.notifications?.slice().reverse().map((notif, index) => (
                    <li
                      key={index}
                      className="bg-white hover:bg-blue-50 transition-colors duration-300 p-4 rounded-lg shadow border border-gray-300 flex justify-between items-start"
                      role="listitem"
                    >
                      <p className="text-gray-900 font-semibold mb-1 break-words max-w-[90%]">
                        {notif}
                      </p>
                      <button
                        aria-label="Delete notification"
                        className="text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                      >
                        <Trash2 size={25} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>)}
          <div>
            {isloggedin ? (
              <div className="dropdown dropdown-end">
                <button
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar"
                  type="button"
                  aria-label="User menu"
                >
                  {user?.image ? (
                    <div>
                      <Image
                        src={user.image}
                        alt="profile img"
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                    </div>
                  ) : (
                    <UserCircle size={30} />
                  )}
                </button>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 p-2 shadow  backdrop-blur-md border border-white/30 rounded-box w-52 z-10"
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
                type="button"
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
