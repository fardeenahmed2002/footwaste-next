"use client"
import { Context } from "@/app/contextapi/ContextProvider"
import axios from "axios"
import { motion } from 'framer-motion'
import { Upload } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import Loader from "../../Loader"

export default function Page() {
  const [formdata, setFormdata] = useState({
    name: '',
    contactNumber: '',
    email: '',
    password: '',
    address: '',
    role: 'collector',
    collectorType: '',
    noOfTeamMember: 0,
    cityCorp: 'Dhaka North City Corporation',
    area: '',
    organizationID: '',
  })

  const [cityData, setCityData] = useState([]) // all areas
  const [filteredAreas, setFilteredAreas] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [avatar, setAvatar] = useState(null)

  const router = useRouter()
  const { getuserdata, setIsloggedin } = useContext(Context)

  // Load city/area data from public folder
  useEffect(() => {
    fetch("/city_corp.json")
      .then(res => res.json())
      .then(data => setCityData(data))
      .catch(err => console.log(err))
  }, [])

  // Update filtered areas when cityCorp changes
  useEffect(() => {
    const areas = cityData.filter(item => item.city_corporation === formdata.cityCorp)
    setFilteredAreas(areas)
    setFormdata(prev => ({ ...prev, area: areas[0]?.area_name.en || '' }))
  }, [formdata.cityCorp, cityData])

  const profileimg = (e) => {
    setAvatar(e.target.files[0])
  }

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // 1. Basic validation
    if (
      !formdata.name ||
      !formdata.contactNumber ||
      !formdata.email ||
      !formdata.password ||
      !formdata.address ||
      !formdata.area ||
      !formdata.collectorType
    ) {
      setError("All fields are required!");
      return;
    }

    if (formdata.collectorType === "NGO" && !formdata.ngoRegistrationNumber) {
      setError("NGO Registration Number is required");
      return;
    }

    if (
      (formdata.collectorType === "Individual Volunteer" || formdata.collectorType === "Charity Group") &&
      (!formdata.noOfTeamMember || Number(formdata.noOfTeamMember) <= 0)
    ) {
      setError("Number of team members must be a positive number");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const form = new FormData();
      form.append("name", formdata.name);
      form.append("contactNumber", formdata.contactNumber);
      form.append("email", formdata.email);
      form.append("password", formdata.password);
      form.append("address", formdata.address);
      form.append("role", formdata.role);
      form.append("collectorType", formdata.collectorType);
      form.append("cityCorp", formdata.cityCorp);
      form.append("area", formdata.area);
      form.append("organizationID", formdata.organizationID);

      if (formdata.collectorType === "NGO") {
        form.append("ngoRegistrationNumber", formdata.ngoRegistrationNumber);
      } else {
        form.append("noOfTeamMember", formdata.noOfTeamMember);
      }

      if (avatar) form.append("avatar", avatar);

      // 4. Axios request
      axios.defaults.withCredentials = true;
      const { data } = await axios.post("/api/auth/signup/collector", form, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      // 5. Handle response
      if (data.success) {
        setIsloggedin(true);
        await getuserdata();
        router.push("/"); 
      } else {
        setError(data.message || "Signup failed");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "Something went wrong");
      setLoading(false);
    }
  };


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
        className="relative z-10 w-[90%] my-[20px] max-w-2xl bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl text-white flex flex-col items-center"
      >
        <div className="mb-6">
          <Link href={'/'}>
            <img
              src="/logo.png"
              alt="Logo"
              className="w-[170px] h-[70px] rounded-full mx-auto"
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
              <span>Donor</span>
            </label>

            <label className="flex items-center gap-1 cursor-pointer" >
              <input type="radio" name="role" defaultChecked />
              <span>Collector</span>
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
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formdata.name}
                onChange={handleChange}
                placeholder="Name"
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
              <label className="block text-sm font-medium">City Corporation</label>
              <select
                name="cityCorp"
                value={formdata.cityCorp}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 bg-white/20 text-white rounded-md border border-white/30 focus:outline-none"
              >
                <option value="Dhaka North City Corporation" className="text-black">Dhaka North City</option>
                <option value="Dhaka South City Corporation" className="text-black">Dhaka South City</option>
              </select>
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium">Area</label>
              <select
                name="area"
                value={formdata.area}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 bg-white/20 text-black rounded-md border border-white/30 focus:outline-none"
              >
                {filteredAreas.map(area => (
                  <option key={area.id} value={area.area_name.en}>{area.area_name.en}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium">Address Details</label>
              <input
                type="text"
                name="address"
                value={formdata.address}
                onChange={handleChange}
                placeholder="House No, Road No, Block, etc."
                className="w-full px-4 py-2 mt-1 bg-white/20 text-white placeholder-white rounded-md border border-white/30 focus:outline-none"
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
                <option value="Organization" className="text-black">Organization</option>
              </select>
            </div>
            <div className="w-1/2">
              {formdata.collectorType === `NGO` && (

                <div>
                  <label className="block text-sm font-medium">NGO Registration Number</label>
                  <input
                    type="number"
                    name="ngoRegistrationNumber"
                    value={formdata.ngoRegistrationNumber}
                    onChange={handleChange}
                    required
                    placeholder='Registration Number of NGO'
                    className="w-full px-4 py-2 mt-1 bg-white/20 text-white placeholder-white rounded-md border border-white/30 focus:outline-none"
                    autoComplete="off"
                  />
                </div>

              )}
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
