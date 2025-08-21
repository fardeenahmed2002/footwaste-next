"use client"
import { Context } from "@/app/contextapi/ContextProvider";
import axios from "axios";
import { motion } from 'framer-motion';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Loader from "../Loader";
export default function page() {
  const { getuserdata, setIsloggedin, user } = useContext(Context)
  const [loading, setLoading] = useState(false)
  const [formdata, setFormdata] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const navigate = useRouter()
  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      if (!formdata.email || !formdata.password) {
        setError("all fields are require")
        return
      }
      setError("")
      axios.defaults.withCredentials = true
      const { data } = await axios.post('/api/auth/login',
        { email: formdata.email, password: formdata.password })
      if (data.success) {
        setLoading(true)
        setIsloggedin(true)
        await getuserdata()
      }
      else {
        setError(data.message)
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    if (user?.role === `admin`) {
      navigate.push('/admin')
    }
    if (user?.role === `user`) {
      navigate.push('/user/donate')
    }
    if (user?.role === `collector`) {
      navigate.push('/collector/allfoods')
    }
    if (user?.role === `donor`) {
      navigate.push('/donor')
    }
  }, [user, navigate])
  return (

    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: "url('/loginbg.jpg')" }}
    >

      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-[90%] max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl text-white flex flex-col items-center">
        <div className="mb-6">
          <Link href={'/'}>
            <img
              src="/logo.png"
              alt="Logo"
              className="w-[170px] h-[70px] mx-auto"
            />
          </Link>
        </div>
        <h1 className="text-3xl font-extrabold text-center text-white mb-6">Welcome user</h1>
        <motion.p
          className="text-red-500 text-sm text-center mb-3 font-semibold"
          initial={{ x: -10 }}
          animate={{ x: [0, -10, 10, 0] }}
          transition={{ yoyo: Infinity, duration: 0.2 }}
        >
          {error}
        </motion.p>
        <form className="space-y-4 w-full" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formdata.email}
              onChange={handleChange}
              placeholder="username@gmail.com"
              className="w-full px-4 py-2 mt-1 bg-white/20 text-white placeholder-white rounded-md border border-white/30 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formdata.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-2 mt-1 bg-white/20 text-white placeholder-white rounded-md border border-white/30 focus:outline-none"
            />
          </div>
          <div className="text-sm text-right">
            <a href="#" className="text-white/80 hover:underline">
              Forgot Password?
            </a>
          </div>
          {loading ? (<button
            type="submit"
            className="w-full bg-white/20 text-white py-2 rounded-md hover:bg-white/30 transition"
          >
            <Loader />
          </button>) : (<button
            type="submit"
            className="w-full bg-white/20 text-white py-2 rounded-md hover:bg-white/30 transition"
          >
            Sign in
          </button>)}
        </form>

        <div className="mt-6 text-center text-sm text-white/70">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-white underline">
            Register for free
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
