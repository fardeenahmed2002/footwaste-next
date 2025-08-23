"use client"
import axios from "axios"
import { Mail } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function ForgetPassword() {
  const [email, setEmail] = useState("")
  const [msg, setMsg] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post("/api/auth/forgot-password", { email })
      setMsg(res.data.message)
    } catch (err) {
      setMsg("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-[gray] rounded-2xl shadow-lg p-8 border border-gray-200">
        <Link href={"/"}>
          <img
            src="/logo.png"
            alt="Logo"
            className="w-[170px] h-[70px] mx-auto"
          />
        </Link>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-700 mb-2 block">Email Address</label>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl bg-gray-50 border border-gray-300 text-gray-800 px-4 py-3 pl-11 outline-none focus:ring-2 focus:ring-[#FFC808] placeholder-gray-400"
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold transition duration-300 shadow-md flex items-center justify-center
              ${
                loading
                  ? "bg-[#e6b307]/60 cursor-not-allowed text-white"
                  : "bg-[#FFC808] hover:bg-[#e6b307] text-black"
              }
            `}
          >
            {loading ? (
              <span className="animate-spin border-2 border-black border-t-transparent rounded-full w-5 h-5"></span>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>
        {msg && (
          <p className="mt-4 text-center text-sm text-gray-600">{msg}</p>
        )}
      </div>
    </div>
  )
}
