'use client';
import React, { useContext } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { Home, Info, Phone, UserCircle, Search, Settings, LogOut, ScrollText, LogIn } from 'lucide-react';
import { Context } from '@/app/contextapi/ContextProvider';
const Navbar = () => {
    const { isloggedin, setUser, setIsloggedin, user } = useContext(Context)
    const handlelogout = async () => {
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post('/api/auth/logout');
            if (data.success) {
                setUser(false);
                setIsloggedin(false);
            }
        } catch (error) {
        }
    }
    return (
        <div className="navbar justify-between px-[50px] bg-gradient-to-r from-blue-600 to-indigo-700 p-4 shadow-xl border-b border-blue-900 flex flex-col md:flex-row items-center gap-4 md:gap-[100px]">
            <div className='flex flex-row gap-3 items-center'>
                <Link href={`/`}>
                    <Image src="/logo.jpeg" alt="logo" width={50} height={50} className='rounded-full' />
                </Link>
                <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-green-300 via-blue-200 to-indigo-300 bg-clip-text text-transparent drop-shadow-md">
                    Food Waste Rescue
                </h1>
            </div>
            <div className='flex flex-row gap-6 items-center text-white font-medium'>
                <Link href='/' className="flex items-center gap-1 hover:text-yellow-300">
                    <Home size={18} /> Home
                </Link>
                <Link href='/pages/about' className="flex items-center gap-1 hover:text-yellow-300">
                    <Info size={18} /> About
                </Link>
                <Link href='/pages/contactus' className="flex items-center gap-1 hover:text-yellow-300">
                    <Phone size={18} /> Contact Us
                </Link>
                <Link href='#' className="flex items-center gap-1 hover:text-yellow-300">
                    <ScrollText size={18} /> Blog
                </Link>
            </div>

            {isloggedin ? (<div className='flex flex-row items-center gap-4'>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        {user && (<div className="w-10 rounded-full">
                            <img
                                alt="profile img"
                                src={user.image} />
                        </div>)}
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 text-gray-800 rounded-box z-10 mt-3 w-52 p-2 shadow">
                        <li>
                            <Link href="/pages/profile" className="flex items-center gap-2">
                                <UserCircle size={18} /> Profile
                            </Link>
                        </li>
                        <li>
                            <a className="flex items-center gap-2">
                                <Settings size={18} /> Settings
                            </a>
                        </li>
                        <li>
                            <a
                                className="flex items-center gap-2 text-red-500 hover:text-red-700"
                                onClick={handlelogout}>
                                <LogOut size={18} /> Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>) : (
                <div className='flex flex-row items-center gap-3 border-white border-2 h-[45px] px-4 text-white rounded-xl shadow-md bg-transparent'>
                    <Link href="/login" className="flex items-center gap-2 hover:text-yellow-300 transition-colors">
                        <LogIn size={18} />
                        <span className="font-medium">Login</span>
                    </Link>
                    <span className="w-[1px] h-[20px] bg-white"></span>
                    <Link href="/signup" className="flex items-center gap-2 hover:text-yellow-300 transition-colors">
                        <UserCircle size={18} />
                        <span className="font-medium">Signup</span>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Navbar;
