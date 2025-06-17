"use client"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { serverError } from "@/app/Utils/serverError"

const reasonsList = [
  "Spam or misleading",
  "Hate speech or abuse",
  "Violence or threats",
  "Sexual content",
  "Copyright infringement",
  "Other"
]

const ReportBlogPage = () => {
  const { blogid } = useParams()
  const [selectedReason, setSelectedReason] = useState("")
  const [loading, setLoading] = useState(false)
  const [blogdata, setBlogdata] = useState({})

  const getblog = async () => {
    try {
      const { data } = await axios.get(`/api/user/blog/reportblog/${blogid}`, {
        withCredentials: true
      })
      if (data.success) {
        setBlogdata(data.blog)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(serverError(error.message))
    }
  }

  useEffect(() => {
    getblog()
  }, [blogid])

  const handleSubmit = async () => {
    if (!selectedReason) {
      toast.error("Please select a reason")
      return
    }

    try {
      setLoading(true)
      const { data } = await axios.post(`/api/user/blog/reportblog/${blogid}`,
        { report: selectedReason, userid: blogdata?.blogger?._id },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      )

      toast.success(data.message || "Report submitted")
    } catch (err) {
      console.error(err)
      toast.error(serverError(err.message))
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h1 className="text-2xl font-bold mb-4">Report Blog</h1>
      <p className="mb-4 text-gray-600">
        Select a reason for reporting blog by: <span className="font-semibold text-black">{blogdata?.blogger?.name || "..."}</span>
      </p>
      <div className="space-y-3">
        {reasonsList.map((reason, i) => (
          <label
            key={i}
            className={`block p-3 border rounded cursor-pointer hover:bg-gray-50 transition ${selectedReason === reason ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
          >
            <input
              type="radio"
              value={reason}
              checked={selectedReason === reason}
              onChange={() => setSelectedReason(reason)}
              className="mr-2"
            />
            {reason}
          </label>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        {loading ? "Reporting..." : "Submit Report"}
      </button>
    </div>
  )
}

export default ReportBlogPage
