'use client'
import { useContext, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import {
  UserCircle,
  Settings,
  LogOut,
  LogIn,
  Menu,
  X,
} from 'lucide-react'
import { Context } from '@/app/contextapi/ContextProvider'
import { useRouter } from 'next/navigation'
import Verify from './navcomponents/Verify'
import Logo from './navcomponents/Logo'
import NavPages from './navcomponents/NavPages'
import Notification from './navcomponents/Notification'
import Chat from './navcomponents/Chat'

const Navbar = () => {
  const { isloggedin, setUser, setIsloggedin, user } = useContext(Context)
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
    <nav className="bg-[#2171b5]/70 border-b border-[#6baed6] shadow-md px-4 py-3 sticky top-0 z-50 backdrop-blur-md">
      <div className="absolute inset-0 bg-black/10 backdrop-blur-md z-0" />
      {isloggedin && !user?.isVerified && <Verify />}

      <div className="relative z-10 flex items-center justify-between md:justify-between">
        {/* Left side: Logo */}
        <Logo />

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenu(!mobileMenu)} className="text-white">
            {mobileMenu ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <NavPages />
          <Notification />
          <Chat />
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
                <li>
                  <button className="flex items-center gap-2 w-full text-left bg-white mb-2">
                    <Settings size={18} /> Settings
                  </button>
                </li>
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

      {/* Mobile Menu (Dropdown Style) */}
      {mobileMenu && (
        <div className="md:hidden mt-4 flex flex-col gap-4">
          <NavPages />
          <div className="flex justify-around items-center gap-4">
            <Notification />
            <Chat />
            {isloggedin ? (
              <div className="dropdown dropdown-end">
                <button tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  {user?.image ? (
                    <Image
                      src={user.image}
                      alt="profile img"
                      width={36}
                      height={36}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <UserCircle size={28} />
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
                  <li>
                    <button className="flex items-center gap-2 w-full text-left bg-white mb-2">
                      <Settings size={18} /> Settings
                    </button>
                  </li>
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
              <button
                onClick={() => router.push('/login')}
                className="group flex items-center gap-2 bg-white/30 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-full font-semibold shadow hover:scale-105 transition-all"
              >
                <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
