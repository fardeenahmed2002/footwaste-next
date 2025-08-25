"use client"
import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import Loader from "@/app/loader/Loader"
import { Context } from "@/app/contextapi/ContextProvider"
import { Calendar, HandHeart, ImageIcon, MapPin, Package, PencilLine, StickyNote } from "lucide-react"

export default function FreeFoodDonation() {
  const [imageOfDonatedFood, setImageOfDonatedFood] = useState(null)
  const [preview, setPreview] = useState(null)
  const [address, setAddress] = useState("Searching location...")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { inEng } = useContext(Context)

  const [formData, setFormData] = useState({
    donorName: "",
    address: "",
    email: "",
    phone: "",
    title: "",
    description: "",
    quantity: "",
    location: address,
    expiryDate: "",
    pickupTime: "",
    foodType: "",
    foodCategory: "",
    storageCondition: "",
    cookedTime: ""
  })

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setImageOfDonatedFood(file)
    if (file) {
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleChange = (e) => {
    setError(null)
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
          const data = await res.json()
          if (data?.display_name) {
            setAddress(data.display_name)
            setFormData(prev => ({ ...prev, location: data.display_name }))
          } else {
            setAddress(inEng ? "Address not found" : "ঠিকানা পাওয়া যায়নি")
          }
        } catch {
          setAddress(inEng ? "Failed to fetch address" : "ঠিকানা আনা যায়নি")
        }
      },
      () => {
        setAddress(inEng ? "Failed to get current location" : "বর্তমান অবস্থান পাওয়া যায়নি")
        setFormData(prev => ({ ...prev, location: inEng ? "Failed to get current location" : "বর্তমান অবস্থান পাওয়া যায়নি" }))
      }
    )
  }, [inEng])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const requiredFields = [
      "donorName", "address", "email", "phone",
      "title", "description", "quantity", "location", 
      "expiryDate", "pickupTime", "foodType", "foodCategory", 
      "storageCondition", "cookedTime"
    ]

    const hasEmptyField = requiredFields.some(field => !formData[field]) || !imageOfDonatedFood
    if (hasEmptyField) {
      setLoading(false)
      setError(inEng ? "All fields are required" : "সব ঘর পূরণ করতে হবে")
      return
    }

    try {
      const form = new FormData()
      Object.keys(formData).forEach(key => {
        form.append(key, formData[key])
      })
      form.append("imageOfDonatedFood", imageOfDonatedFood)

      axios.defaults.withCredentials = true
      const { data } = await axios.post("/api/user/donatedfood", form, {
        headers: { "Content-Type": "multipart/form-data" }
      })

      if (data.success) {
        setFormData({
          donorName: "",
          address: "",
          email: "",
          phone: "",
          title: "",
          description: "",
          quantity: "",
          location: address,
          expiryDate: "",
          pickupTime: "",
          foodType: "",
          foodCategory: "",
          storageCondition: "",
          cookedTime: ""
        })
        setImageOfDonatedFood(null)
        setPreview(null)
        setError(null)
        toast.success(inEng ? "Donation submitted successfully!" : "দান সফলভাবে জমা হয়েছে!")
      } else {
        setError(data.message)
      }
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-cover bg-center flex items-center justify-center relative">
  
      <div className="relative z-10 w-[90%] my-[20px] max-w-3xl bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl text-black flex flex-col items-center">
        <h2 className="text-3xl font-bold text-center text-black mb-6">
          {inEng ? "Donate Food" : "খাবার দান করুন"}
        </h2>
        {error && (<p className='text-center text-[red] mb-[20px]'>{error}</p>)}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* donor info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="donorName" value={formData.donorName} onChange={handleChange} placeholder={inEng ? "Donor Name" : "দানকারীর নাম"} className="text-black px-4 py-2 w-full border rounded-lg shadow-sm" />
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder={inEng ? "Address" : "ঠিকানা"} className="text-black px-4 py-2 w-full border rounded-lg shadow-sm" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder={inEng ? "Email" : "ইমেইল"} className="text-black px-4 py-2 w-full border rounded-lg shadow-sm" />
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder={inEng ? "Phone" : "ফোন"} className="text-black px-4 py-2 w-full border rounded-lg shadow-sm" />
          </div>

          {/* food details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-sm mb-1">{inEng ? "Food Title" : "খাবারের শিরোনাম"}</label>
              <Package className="absolute top-9 left-3 text-black" size={18} />
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder={inEng ? "Food Title" : "খাবারের শিরোনাম"} className="text-black pl-10 pr-4 py-2 w-full border rounded-lg shadow-sm" />
            </div>
            <div className="relative">
              <label className="block text-sm mb-1">{inEng ? "Quantity" : "পরিমাণ"}</label>
              <StickyNote className="absolute top-9 left-3 text-black" size={18} />
              <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} placeholder={inEng ? "Quantity (e.g. 3 kg)" : "পরিমাণ (যেমন: ৩ কেজি)"} className="text-black pl-10 pr-4 py-2 w-full border rounded-lg shadow-sm" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-sm mb-1">{inEng ? "Pickup Location" : "উত্তোলনের স্থান"}</label>
              <MapPin className="absolute top-9 left-3 text-black" size={18} />
              <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder={inEng ? "Pickup Location" : "উত্তোলনের স্থান"} className="text-black pl-10 pr-4 py-2 w-full border rounded-lg shadow-sm" />
            </div>
            <div className="relative">
              <label className="block text-sm mb-1">{inEng ? "Expiry Date" : "মেয়াদোত্তীর্ণ তারিখ"}</label>
              <Calendar className="absolute top-9 left-3 text-black" size={18} />
              <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} className="text-black pl-10 pr-4 py-2 w-full border rounded-lg shadow-sm" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">{inEng ? "Pickup Time" : "উত্তোলনের সময়"}</label>
              <input type="time" name="pickupTime" value={formData.pickupTime} onChange={handleChange} className="text-black pl-4 pr-4 py-2 w-full border rounded-lg shadow-sm" />
            </div>
            <div>
              <label className="block text-sm mb-1">{inEng ? "Food Type" : "খাবারের ধরন"}</label>
              <select name="foodType" value={formData.foodType} onChange={handleChange} className="text-black bg-transparent border py-2 px-4 w-full rounded-lg shadow-sm">
                <option value="" className="text-black">{inEng ? "Select Food Type" : "খাবারের ধরন নির্বাচন করুন"}</option>
                <option value="Cooked" className="text-black">{inEng ? "Cooked" : "রান্না করা"}</option>
                <option value="Packaged" className="text-black">{inEng ? "Packaged" : "প্যাকেটজাত"}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">{inEng ? "Food Category" : "খাবারের বিভাগ"}</label>
              <select name="foodCategory" value={formData.foodCategory} onChange={handleChange} className="text-black bg-transparent border py-2 px-4 w-full rounded-lg shadow-sm">
                <option value="" className="text-black">{inEng ? "Select Food Category" : "খাবারের বিভাগ নির্বাচন করুন"}</option>
                <option value="Vegetarian" className="text-black">{inEng ? "Vegetarian" : "নিরামিষ"}</option>
                <option value="Non-Vegetarian" className="text-black">{inEng ? "Non-Vegetarian" : "আমিষ"}</option>
                <option value="Vegan" className="text-black">{inEng ? "Vegan" : "ভেগান"}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">{inEng ? "Storage Condition" : "সংরক্ষণের অবস্থা"}</label>
              <select name="storageCondition" value={formData.storageCondition} onChange={handleChange} className="text-black bg-transparent border py-2 px-4 w-full rounded-lg shadow-sm">
                <option value="" className="text-black">{inEng ? "Select Storage Condition" : "সংরক্ষণের অবস্থা নির্বাচন করুন"}</option>
                <option value="Refrigerated" className="text-black">{inEng ? "Refrigerated" : "রেফ্রিজারেটেড"}</option>
                <option value="Room Temperature" className="text-black">{inEng ? "Room Temperature" : "কক্ষ তাপমাত্রা"}</option>
                <option value="Frozen" className="text-black">{inEng ? "Frozen" : "জমাট"}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">{inEng ? "Cooked Time" : "রান্নার সময়"}</label>
            <input type="time" name="cookedTime" value={formData.cookedTime} onChange={handleChange} className="text-black pl-4 pr-4 py-2 w-full border rounded-lg shadow-sm" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">{inEng ? "Food Description" : "খাবারের বিবরণ"}</label>
              <PencilLine className="absolute top-175 left-25 text-black" size={18} />
              <textarea name="description" value={formData.description} onChange={handleChange} placeholder={inEng ? "Food description" : "খাবারের বিবরণ"} className="text-black pl-10 pr-4 pt-2 h-40 w-full resize-none border rounded-lg shadow-sm" />
            </div>
            <div className="relative w-[290px] h-[160px]">
              <label className="block text-sm mb-1">{inEng ? "Food Image" : "খাবারের ছবি"}</label>
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-xl shadow-md" />
              ) : (
                <div className="w-full h-full border border-dashed border-gray-300 rounded-xl flex items-center justify-center text-black">
                  {inEng ? "No Image Selected" : "কোনো ছবি নির্বাচন করা হয়নি"}
                </div>
              )}
              <label className="absolute bottom-[80px] left-[30px] transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-1.5 bg-[#FFF7E6] bg-opacity-80 rounded-md text-sm text-[green] shadow cursor-pointer hover:bg-opacity-100 transition">
                <ImageIcon size={18} />
                <input type="file" name="imageOfDonatedFood" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>
          </div>

          <button type="submit" className="w-full flex items-center justify-center gap-2 bg-[#FFC808] text-[#1F2937] hover:text-[#FFC808] hover:bg-[#1C2532] py-2 rounded-xl font-semibold active:scale-95 transition-all shadow-md">
            {loading ? <Loader message={inEng ? "Submitting donation..." : "দান জমা হচ্ছে..."} /> : <>
              <HandHeart size={18} />
              {inEng ? "Submit Donation" : "দান জমা দিন"}
            </>}
          </button>
        </form>
      </div>
    </div>
  )
}
