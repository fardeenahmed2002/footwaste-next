'use client'
import { useContext, useState } from 'react'
import { Context } from '@/app/contextapi/ContextProvider'
import { ShieldCheck, MailCheck } from "lucide-react"
import axios from 'axios'
import Loader from './Loader'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
const Page = () => {
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useRouter()
  const getOTP = async () => {
    setLoading(true)
    try {
      axios.defaults.withCredentials = true
      const { data } = await axios.post('/api/auth/accountverification/sendOTPtoMail')
      if (data.success) {
        setLoading(true)
        navigate.push("/pages/verification/otp")
      }
      if(!data.success){
        setLoading(false)
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      setError(error)
      setLoading(false)
    }
  }
  return (
    <div className="h-[484px] relative flex items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-[url('/verify.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-[#fff7e6]/50 backdrop-blur-sm" />
      </div>
      <div className="relative z-10 w-full max-w-md shadow-2xl rounded-2xl p-6 max-h-[calc(100vh-2rem)] overflow-y-auto">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold text-center mb-2">Verify Your Account</h2>
          <p className="text-center text-gray-600 mb-4">
            Hello <span className="font-semibold">{user?.name}</span>,
          </p>
          <p className="text-gray-700 text-sm text-center mb-6">
            To complete your setup with <span className="font-semibold text-green-700">Food Waste Rescue</span>, we need to verify your email. This ensures your data stays secure and unlocks all platform features.
          </p>

          {loading ?
            (<button className='flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-full transition duration-300'>
              <Loader />
            </button>
            ) :
            (
              <button
                onClick={getOTP}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-full transition duration-300">
                <MailCheck size={18} />
                Verify My Email
              </button>
            )}
        </div>

        <div className="mt-8">
          <h3 className="uppercase text-lg font-bold mb-2">Why Verification Matters?</h3>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <ShieldCheck className="text-green-600 mt-1" size={20} />
              <span>
                <span className="font-semibold underline">Enhanced Security:</span><br />
                Prevents unauthorized access and keeps your data safe.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <ShieldCheck className="text-green-600 mt-1" size={20} />
              <span>
                <span className="font-semibold underline">Compliance:</span><br />
                Meets regulations to ensure a trusted experience for all users.
              </span>
            </li>
          </ul>
        </div>
        {error && (<p className='text-center text-[red] font-bold'>{error}</p>)}
      </div> 
    </div>
  )
}

export default Page
