"use client"
import Link from "next/link"
import { useState, useContext } from "react"
import { motion } from 'framer-motion'
import { useRouter } from "next/navigation"
import Loader from "../../Loader"
import axios from "axios"
import { Context } from "@/app/contextapi/ContextProvider"
import { Upload } from "lucide-react"
export default function Page() {
    const [formdata, setFormdata] = useState({
        name: '',
        contactNumber: '',
        email: '',
        password: '',
        address: '',
        role: 'organization',
        collectorType: '',
        noOfTeamMember: 0,
        yourCollectingArea: '',
        ngoRegistrationNumber: '',
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [avatar, setAvatar] = useState(null)
    const [certificateimage, setCertificateimage] = useState(null)
    const profileimg = (e) => {
        setAvatar(e.target.files[0])
    }
    const certificateimg = (e) => {
        setCertificateimage(e.target.files[0])
    }
    const router = useRouter()
    const { getuserdata, setIsloggedin } = useContext(Context)
    const navigate = useRouter()
    const handleChange = (e) => {
        setLoading(false)
        setFormdata({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formdata.name || !formdata.email || !formdata.password || !formdata.address || !formdata.contactNumber || !formdata.collectorType || !formdata.yourCollectingArea) {
            setError("All fields are required!");
            setLoading(false)
            return;
        }
        try {
            setError("");
            setLoading(true)
            const form = new FormData();
            form.append("name", formdata.name)
            form.append("email", formdata.email)
            form.append("password", formdata.password)
            form.append("address", formdata.address)
            form.append("contactNumber", formdata.contactNumber)
            form.append("role", formdata.role)
            form.append("certificateimage", certificateimage)
            form.append("avatar", avatar)
            form.append("collectorType", formdata.collectorType)
            form.append("noOfTeamMember", formdata.noOfTeamMember)
            form.append("yourCollectingArea", formdata.yourCollectingArea)
            form.append("ngoRegistrationNumber", formdata.ngoRegistrationNumber)

            axios.defaults.withCredentials = true;
            const { data } = await axios.post("/api/auth/signup/organization", form, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            if (data.success) {
                setLoading(true)
                setIsloggedin(true)
                await getuserdata()
                navigate.push('/')
            }
            if (!data.success) {
                setError(data.message)
                setLoading(false)
            }
        } catch (error) {
            console.log(error.message)
            setError(error.message)
            setLoading(false)
        }
    }
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
                className="relative z-10 w-[90%] my-[20px] max-w-2xl bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl text-white flex flex-col items-center">
                <div className="mb-6">
                    <Link href={'/'}>
                        <img
                            src="/logo.jpeg"
                            alt="Logo"
                            className="w-[70px] h-[70px] rounded-full mx-auto"
                        />
                    </Link>
                </div>
                <h1 className="text-3xl font-bold text-white text-center">Create an Account</h1>
                <br />
                <div className='flex flex-col justify-center items-center'>
                    <label className="block text-black font-semibold">Register as</label>
                    <div className="flex space-x-4">
                        <label className="flex items-center gap-1" onClick={() => router.push('/signup')}>
                            <input type="radio" name="role" />
                            <span>User</span>
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer" onClick={() => router.push('/signup/donor')}>
                            <input type="radio" name="role" />
                            <span>Donor</span>
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer" >
                            <input type="radio" name="role" />
                            <span>Collector</span>
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer" onClick={() => navigate.push('/signup/organization')}>
                            <input type="radio" name="role" defaultChecked />
                            <span>Organization</span>
                        </label>
                    </div>
                </div>
                <motion.p
                    className="text-red-500 text-sm text-center mb-3 font-semibold"
                    initial={{ x: -10 }}
                    animate={{ x: 10 }}
                    transition={{ yoyo: Infinity, duration: 0.2 }}
                >{error}</motion.p>
                <form className="space-y-4 w-full" onSubmit={handleSubmit}>
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="block text-sm font-medium">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formdata.name}
                                onChange={handleChange}
                                placeholder="Your name"
                                className="w-full px-4 py-2 mt-1 bg-white/20 text-white placeholder-white rounded-md border border-white/30 focus:outline-none"
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-sm font-medium">Contact Number</label>
                            <input
                                type="text"
                                name="contactNumber"
                                value={formdata.contactNumber}
                                onChange={handleChange}
                                placeholder="+88"
                                className="w-full px-4 py-2 mt-1 bg-white/20 text-white placeholder-white rounded-md border border-white/30 focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="w-1/2">
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
                        <div className="w-1/2">
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
                    </div>
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="block text-sm font-medium">Type of Registrant</label>
                            <select
                                name="collectorType"
                                value={formdata.collectorType}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 mt-1 bg-white/20 text-white placeholder-white rounded-md border border-white/30 focus:outline-none"
                                autoComplete="off"
                            >
                                <option value="" className="text-black">Select Type</option>
                                <option value="NGO" className="text-black">NGO</option>
                                <option value="Individual Volunteer" className="text-black">Individual Volunteer</option>
                                <option value="Charity Group" className="text-black">Charity Group</option>
                            </select>
                        </div>
                        <div className="w-1/2">
                            {formdata.collectorType === `NGO` && (<div>
                                <label className="block text-sm font-medium">NGO Registration Number</label>
                                <input
                                    type="text"
                                    name="ngoRegistrationNumber"
                                    value={formdata.ngoRegistrationNumber}
                                    onChange={handleChange}
                                    required
                                    placeholder='Registration Number of NGO'
                                    className="w-full px-4 py-2 mt-1 bg-white/20 text-white placeholder-white rounded-md border border-white/30 focus:outline-none"
                                    autoComplete="off"
                                />
                            </div>)}
                            {(formdata.collectorType === `Individual Volunteer` || formdata.collectorType === `Charity Group`) && (<div>
                                <label className="block text-sm font-medium">Number of members in Team</label>
                                <input
                                    type="text"
                                    name="noOfTeamMember"
                                    value={formdata.noOfTeamMember}
                                    onChange={handleChange}
                                    required
                                    placeholder='How many member in your team?'
                                    className="w-full px-4 py-2 mt-1 bg-white/20 text-white placeholder-white rounded-md border border-white/30 focus:outline-none"
                                    autoComplete="off"
                                />
                            </div>)}
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="block text-sm font-medium">Operating region</label>
                            <input
                                type="text"
                                name="yourCollectingArea"
                                value={formdata.yourCollectingArea}
                                onChange={handleChange}
                                placeholder="Regions to collect/distribute food"
                                className="w-full px-4 py-2 mt-1 bg-white/20 text-white placeholder-white rounded-md border border-white/30 focus:outline-none"
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-sm font-medium">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formdata.address}
                                onChange={handleChange}
                                placeholder="123 Street, City"
                                className="w-full px-4 py-2 mt-1 bg-white/20 text-white placeholder-white rounded-md border border-white/30 focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label
                                htmlFor="certificateimage"
                                className="flex items-center justify-center gap-2 px-4 py-2 border border-white/30 rounded-md bg-white/20 text-white cursor-pointer hover:bg-white/30 transition mt-[23px]"
                            >
                                <Upload className="w-5 h-5" />
                                <span>Upload Certificate</span>
                            </label>
                            <input
                                type="file"
                                name="certificateimage"
                                id="certificateimage"
                                accept="image/*"
                                onChange={certificateimg}
                                className="hidden"
                            />
                        </div>
                        <div className="w-1/2">
                            <label
                                htmlFor="avatar"
                                className="flex items-center justify-center gap-2 px-4 py-2 border border-white/30 rounded-md bg-white/20 text-white cursor-pointer hover:bg-white/30 transition mt-[23px]"
                            >
                                <Upload className="w-5 h-5" />
                                <span>Upload Profile Picture</span>
                            </label>
                            <input
                                type="file"
                                name="avatar"
                                id="avatar"
                                accept="image/*"
                                onChange={profileimg}
                                className="hidden"
                            />
                        </div>
                    </div>
                    <div className="text-sm text-right">
                        <a href="#" className="text-white/80 hover:underline">Forgot Password?</a>
                    </div>
                    {loading ? (
                        <button type="submit" className="w-full bg-white/20 text-white py-2 rounded-md">
                            <Loader />
                        </button>
                    ) : (
                        <button type="submit" className="w-full bg-white/20 text-white py-2 rounded-md hover:bg-white/30 transition">
                            Sign up
                        </button>
                    )}
                </form>
                <p className="text-xs text-white/70 mt-3 text-center">
                    By signing up, you agree to our{" "}
                    <Link href="/privacy" className="underline">Privacy Policy</Link> and{" "}
                    <Link href="/terms" className="underline">Terms of Service</Link>.
                </p>
                <div className="mt-6 text-center text-sm text-white/70">
                    Already have an account?{" "}
                    <Link href="/login" className="text-white underline">Login now</Link>
                </div>
            </motion.div>
        </div>
    )
}
