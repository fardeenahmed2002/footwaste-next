"use client"
import axios from "axios"
import { Eye, EyeClosed, Lock } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

export default function ResetPassword() {
    const { token } = useParams()
    const router = useRouter()

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [msg, setMsg] = useState("")
    const [loading, setLoading] = useState(false)
    const [seePassword, setSeePassword] = useState(false)
    const [seeConfirmPassword, setSeeConfirmPassword] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMsg("Passwords do not match")
            return
        }
        setLoading(true)
        try {
            const res = await axios.post(`/api/auth/reset-password/${token}`, { password })
            setMsg(res.data.message)
            if (res.data.success) {
                setTimeout(() => router.push("/login"), 2000)
            }
        } catch (err) {
            setMsg("Something went wrong")
            console.log(err)
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
                    Reset Password
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="text-gray-700 mb-2 block">New Password</label>
                        <div className="relative">
                            <input
                                type={seePassword ? "text" : "password"}
                                placeholder="Enter new password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full rounded-xl bg-gray-50 border border-gray-300 text-gray-800 px-4 py-3 pl-11 pr-11 outline-none focus:ring-2 focus:ring-[#BB71FF] placeholder-gray-400"
                            />
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            {seePassword ? (
                                <EyeClosed
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 cursor-pointer"
                                    onClick={() => setSeePassword(false)}
                                />
                            ) : (
                                <Eye
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 cursor-pointer"
                                    onClick={() => setSeePassword(true)}
                                />
                            )}
                        </div>
                    </div>


                    <div>
                        <label className="text-gray-700 mb-2 block">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={seeConfirmPassword ? "text" : "password"}
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="w-full rounded-xl bg-gray-50 border border-gray-300 text-gray-800 px-4 py-3 pl-11 pr-11 outline-none focus:ring-2 focus:ring-[#BB71FF] placeholder-gray-400"
                            />
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            {seeConfirmPassword ? (
                                <EyeClosed
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 cursor-pointer"
                                    onClick={() => setSeeConfirmPassword(false)}
                                />
                            ) : (
                                <Eye
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 cursor-pointer"
                                    onClick={() => setSeeConfirmPassword(true)}
                                />
                            )}
                        </div>
                    </div>


                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-xl font-semibold transition duration-300 shadow-md flex items-center justify-center
                        ${loading ? "bg-[#FFC808]/60 cursor-not-allowed text-white" : "bg-[#FFC808] hover:bg-yellow-500 text-white"}`}
                    >
                        {loading ? (
                            <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
                        ) : (
                            "Reset Password"
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
