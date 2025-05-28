'use client';
import React, { useContext } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import {
  Home,
  Info,
  Phone,
  UserCircle,
  Settings,
  LogOut,
  LogIn,
  LayoutDashboard,
  FileText,
  Store,
  MessageSquare,
  Users,
  HandCoins,
  MapPin,
} from 'lucide-react';
import { Context } from '@/app/contextapi/ContextProvider';
import { useRouter } from 'next/navigation';
const Navbar = () => {
  const { isloggedin, setUser, setIsloggedin, user } = useContext(Context);
  const navigate = useRouter()
  const navLinkClass =
    'flex items-center gap-1 text-green-800 hover:text-green-900 hover:underline font-semibold transition-colors';

  const handlelogout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post('/api/auth/logout');
      if (data.success) {
        setUser(false);
        setIsloggedin(false);
        navigate.push('/')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <nav className="bg-[#fff7e6] border-b border-green-300 shadow-md px-6 py-4 sticky top-0 z-50">
      {isloggedin && !user?.isVerified && (
        <div className=" flex items-center gap-3 p-4 mt-[-15px]">
          <div className="flex-1 text-center">
            <span className="text-sm font-medium">
              Your account isn’t verified yet. Please <Link href={'/pages/verification'}><span className='underline'>verify</span></Link> it now to unlock all features.  <hr />
            </span>
          </div>
        </div>
      )}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.jpeg"
            alt="Logo"
            width={48}
            height={48}
            className="rounded-full shadow-md border border-green-700"
          />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-green-800 drop-shadow-sm">
            Food Waste Rescue
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-6 text-green-800">
          <>
            <Link href="/" className={navLinkClass}>
              <Home size={18} /> Home
            </Link>
            <Link href="/pages/about" className={navLinkClass}>
              <Info size={18} /> About
            </Link>
            <Link href="/pages/contactus" className={navLinkClass}>
              <Phone size={18} /> Contact
            </Link>

          </>
        </div>
        <div>
          {isloggedin ? (
            <div className="dropdown dropdown-end">
              <button
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar"
                type="button"
                aria-label="User menu"
              >
                {user && user.image ? (
                  <img
                    alt="profile img"
                    src={user.image}
                    className="w-10 rounded-full"
                  />
                ) : (
                  <UserCircle size={30} />
                )}
              </button>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 text-gray-800 rounded-box z-10 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link href="/pages/profile" className="flex items-center gap-2">
                    <UserCircle size={18} /> Profile
                  </Link>
                </li>
                <li>
                  <button className="flex items-center gap-2 w-full text-left" type="button">
                    <Settings size={18} /> Settings
                  </button>
                </li>
                <li>
                  <button
                    onClick={handlelogout}
                    className="flex items-center gap-2 text-red-500 hover:text-red-700 w-full text-left"
                    type="button"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <button
              onClick={() => (window.location.href = '/login')}
              className="group flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full shadow-md hover:scale-105 transition-transform duration-300"
              type="button"
            >
              <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
              <span className="font-semibold">Login</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
