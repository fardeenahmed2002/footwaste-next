'use client'
import { serverError } from "@/app/Utils/serverError";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../Loader";
export default function OTPPage() {
    const navigate = useRouter();
    const [input, setInput] = useState({ input1: "", input2: "", input3: "", input4: "", input5: "", input6: "" });
    const [loading, setLoading] = useState(false)
    const refs = {
        input1: useRef(),
        input2: useRef(),
        input3: useRef(),
        input4: useRef(),
        input5: useRef(),
        input6: useRef()
    }
    const handleChange = (e, nextRef) => {
        const { name, value } = e.target;
        if (!/^[0-9]?$/.test(value)) return;
        setInput(prev => ({ ...prev, [name]: value }));
        if (value && nextRef) nextRef.current.focus();
    }
    const handleBack = (e, prevRef, name) => {
        if (e.key === "Backspace" && !input[name] && prevRef) prevRef.current.focus();
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const fullotp = input.input1 + input.input2 + input.input3 + input.input4 + input.input5 + input.input6;
        const otp = fullotp.toString()
        setLoading(true)
        try {
            axios.defaults.withCredentials = true
            const { data } = await axios.post("/api/auth/accountverification/receiveOTP", { otp })
            if (data.success) {
                setLoading(false)
                toast.success('account verified successfully. please login your account')
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
                navigate.push('/login')
            }
            if (!data.success) {
                setLoading(false)
                toast.error(data.message)
            }
        } catch (error) {
            setLoading(false)
            toast.error(serverError(error))
        }
    }
    return (
        <div className="h-screen mt-[-125px] flex items-center justify-center px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/verify.jpg')] bg-cover bg-center z-0" />
            <div className="absolute inset-0 bg-white/30 backdrop-blur-md z-0" />
            <div className="relative z-10 bg-white/40 backdrop-blur-md border border-white/40 shadow-lg rounded-2xl p-6 w-full max-w-sm flex flex-col items-center">
                <p className="text-sm text-center mb-4 text-black">
                    An OTP has been sent to your email. Please check your{" "}
                    <Link target="_blank" href="https://mail.google.com/mail/u/0/#inbox" className="font-semibold underline">
                        inbox
                    </Link>{" "}
                    and enter the code below to verify your email address.
                </p>
                <h1 className="text-2xl font-bold mb-4 text-black text-center">Enter Your OTP</h1>
                <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
                    <div className="flex gap-2 mb-4">
                        <input autoComplete="off" ref={refs.input1} name="input1" value={input.input1} onChange={(e) => handleChange(e, refs.input2)} onKeyDown={(e) => handleBack(e, null, "input1")} className="w-10 h-12 text-center text-xl font-bold border border-gray-500 rounded-md" maxLength={1} />
                        <input autoComplete="off" ref={refs.input2} name="input2" value={input.input2} onChange={(e) => handleChange(e, refs.input3)} onKeyDown={(e) => handleBack(e, refs.input1, "input2")} className="w-10 h-12 text-center text-xl font-bold border border-gray-500 rounded-md" maxLength={1} />
                        <input autoComplete="off" ref={refs.input3} name="input3" value={input.input3} onChange={(e) => handleChange(e, refs.input4)} onKeyDown={(e) => handleBack(e, refs.input2, "input3")} className="w-10 h-12 text-center text-xl font-bold border border-gray-500 rounded-md" maxLength={1} />
                        <input autoComplete="off" ref={refs.input4} name="input4" value={input.input4} onChange={(e) => handleChange(e, refs.input5)} onKeyDown={(e) => handleBack(e, refs.input3, "input4")} className="w-10 h-12 text-center text-xl font-bold border border-gray-500 rounded-md" maxLength={1} />
                        <input autoComplete="off" ref={refs.input5} name="input5" value={input.input5} onChange={(e) => handleChange(e, refs.input6)} onKeyDown={(e) => handleBack(e, refs.input4, "input5")} className="w-10 h-12 text-center text-xl font-bold border border-gray-500 rounded-md" maxLength={1} />
                        <input autoComplete="off" ref={refs.input6} name="input6" value={input.input6} onChange={(e) => handleChange(e, null)} onKeyDown={(e) => handleBack(e, refs.input5, "input6")} className="w-10 h-12 text-center text-xl font-bold border border-gray-500 rounded-md" maxLength={1} />
                    </div>
                    {loading ? (
                        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold">
                            <Loader />
                        </button>
                    ) : (
                        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold">
                            Submit OTP
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
}
