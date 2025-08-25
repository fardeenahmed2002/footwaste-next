"use client"
import { Context } from "@/app/contextapi/ContextProvider"
import axios from "axios"
import { useContext, useState } from "react"
import { toast } from "react-toastify"

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    contactNumber: "",
    image: null,
    role: "volunteer"
  })

  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const { inEng } = useContext(Context)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData({ ...formData, image: file })
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const data = new FormData()
      data.append("name", formData.name)
      data.append("email", formData.email)
      data.append("password", formData.password)
      data.append("address", formData.address)
      data.append("contactNumber", formData.contactNumber)
      data.append("role", formData.role)
      if (formData.image) {
        data.append("image", formData.image)
      }

      const res = await axios.post("/api/add-volunteer", data, {
        headers: { "Content-Type": "multipart/form-data" }
      })

      setMessage(res.data.message || (inEng ? "Volunteer added successfully!" : "স্বেচ্ছাসেবক সফলভাবে যোগ করা হয়েছে!"))
      toast.success(res.data.message)
      setFormData({
        name: "",
        email: "",
        password: "",
        address: "",
        contactNumber: "",
        image: null,
        role: "volunteer"
      })
      setPreview(null)
    } catch (error) {
      setMessage(error.response?.data?.message || (inEng ? "Something went wrong" : "কিছু একটা সমস্যা হয়েছে"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-[400px] space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">
          {inEng ? "Add Volunteer" : "স্বেচ্ছাসেবক যোগ করুন"}
        </h2>

        <input
          type="text"
          name="name"
          placeholder={inEng ? "Name" : "নাম"}
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder={inEng ? "Email" : "ইমেইল"}
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder={inEng ? "Password" : "পাসওয়ার্ড"}
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="address"
          placeholder={inEng ? "Address" : "ঠিকানা"}
          value={formData.address}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="contactNumber"
          placeholder={inEng ? "Contact Number" : "যোগাযোগ নম্বর"}
          value={formData.contactNumber}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border p-2 rounded"
        />

        {preview && (
          <div className="flex justify-center">
            <img
              src={preview}
              alt={inEng ? "Preview" : "প্রিভিউ"}
              className="w-24 h-24 object-cover rounded-full border"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading
            ? (inEng ? "Adding..." : "যোগ করা হচ্ছে...")
            : (inEng ? "Add Volunteer" : "স্বেচ্ছাসেবক যোগ করুন")}
        </button>

        {message && <p className="text-center text-sm mt-2">{message}</p>}
      </form>
    </div>
  )
}

export default Page
