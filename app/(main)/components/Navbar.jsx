'use client'
import { Context } from '@/app/contextapi/ContextProvider'
import axios from 'axios'
import {
  LogOut,
  MessageCircle,
  UserCircle
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import Chat from './navcomponents/Chat'
import Logo from './navcomponents/Logo'
import NavPages from './navcomponents/NavPages'
import Notification from './navcomponents/Notification'

const Navbar = () => {
  const { isloggedin, setUser, setIsloggedin, user, inEng, toggleLanguage } = useContext(Context)
  const router = useRouter()
  const [mobileMenu, setMobileMenu] = useState(false)


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

  return (
    <nav className="bg-[#1F2937] border-b px-4 py-3 sticky top-0 z-50 backdrop-blur-md">
      <div className="absolute inset-0 bg-black/10 backdrop-blur-md z-0 " />

      <div className="relative z-10 flex items-center justify-between md:justify-between">

        <Logo />

        <div className="hidden md:flex items-center justify-between w-full">

          <div className="flex-1 flex justify-center">
            <NavPages />
          </div>

          <div className="flex items-center gap-6">
            {user?.isVerified && <>
              <Notification />
              <Chat />
            </>}

            {isloggedin ? (
              <div className="dropdown dropdown-end">
                <button tabIndex={0} className="btn btn-ghost btn-circle avatar">
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
                    <Link href="/pages/profile" className="flex items-center gap-2 bg-white mb-2">
                      <UserCircle size={18} /> Profile
                    </Link>
                  </li>
                  
                  {user?.isVerified && (<li>
                    <Link href={'/pages/chat'} className="flex items-center gap-2 w-full text-left bg-white mb-2">
                      <MessageCircle size={18} /> Chats
                    </Link>
                  </li>)}

                  <li>
                    <button
                      onClick={handlelogout}
                      className="flex items-center gap-2 text-red-500 hover:text-red-700 w-full text-left bg-white"
                      type="button"
                    >
                      <LogOut size={18} /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-[#FFC808] backdrop-blur-md rounded-full px-1 py-1 shadow-inner text-sm">
                <button
                  onClick={() => router.push('/login')}
                  className="px-3 py-1 rounded-full font-semibold text-[#1F2937] hover:text-[#FFC808] hover:bg-[#1F2937] transition-colors duration-300"
                >
                  {inEng ? "Login" : "লগ ইন"}
                </button>

                <span className="text-[#1F2937]">|</span>

                <button
                  onClick={() => router.push('/signup')}
                  className="px-3 py-1 rounded-full font-semibold text-[#1F2937] hover:text-[#FFC808] hover:bg-[#1F2937] transition-colors duration-300"
                >
                  {inEng ? "Signup" : "সাইন আপ"}
                </button>
              </div>
            )}

            {/* Language Switch */}
            <div
              onClick={toggleLanguage}
              className={`relative w-24 h-10 rounded-full cursor-pointer transition-colors duration-300 ${inEng ? "bg-purple-600" : "bg-green-600"
                }`}
            >
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-white font-semibold text-sm">
                EN
              </span>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white font-semibold text-sm">
                BN
              </span>
              <div
                className={`absolute top-1 w-8 h-8 bg-white rounded-full shadow-md transition-transform duration-300 flex items-center justify-center font-bold text-black ${inEng ? "left-1" : "right-1"
                  }`}
              >
                {inEng ? "E" : "B"}
              </div>
            </div>
          </div>
        </div>
      </div>

    </nav>
  )
}

export default Navbar
