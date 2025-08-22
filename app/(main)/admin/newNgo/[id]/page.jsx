'use client'
import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Loader from "./Loader"

const Page = () => {
  const { id } = useParams()
  const [ngo, setNgo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isloading, setIsloading] = useState(false)
  const [error, setError] = useState(null)


  const [showModal, setShowModal] = useState(false)
  const [reason, setReason] = useState("")

  useEffect(() => {
    const fetchNGODetails = async () => {
      try {
        const res = await axios.get(`/api/admin/getDetailsOfNGO/${id}`)
        if (res.data.success) {
          setNgo(res.data.ngo)
        } else {
          setError(res.data.message || "Failed to fetch NGO details")
        }
      } catch (err) {
        console.error(err)
        setError("Server error")
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchNGODetails()
  }, [id])

  const acceptTheNgo = async (ngoid) => {
    setIsloading(true)
    try {
      const { data } = await axios.post(`/api/admin/acceptNGO`, { id: ngoid })
      if (data.success) {
        toast.success(`OTP sent to NGO's email`)
      } else {
        toast.error(data.message || "Failed to accept NGO")
      }
    } catch (error) {
      console.log(error)
      toast.error("Server Error")
    } finally {
      setIsloading(false)
    }
  }

  const rejectTheNgo = async (ngoid) => {
    if (!reason) {
      toast.error("Please provide a reason")
      return
    }
    setIsloading(true)
    try {
      const { data } = await axios.post(`/api/admin/rejectNGO`, { id: ngoid, reason })
      if (data.success) {
        toast.success(`NGO rejected successfully`)
        setShowModal(false)
        setReason("")
      } else {
        toast.error(data.message || "Failed to reject NGO")
      }
    } catch (error) {
      console.log(error)
      toast.error("Server Error")
    } finally {
      setIsloading(false)
    }
  }

  if (loading) return <p className="text-gray-600">Loading...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden w-full max-w-md">

        {ngo?.image && (
          <div className="w-full h-48 bg-gray-200">
            <img
              src={ngo.image}
              alt={ngo.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-6 text-black space-y-2">
          <h1 className="text-2xl font-bold mb-4 text-center">{ngo?.name}</h1>
          <p><span className="font-semibold">Email:</span> {ngo?.email}</p>
          <p><span className="font-semibold">Contact Number:</span> {ngo?.contactNumber}</p>
          <p><span className="font-semibold">Address:</span> {ngo?.address}</p>
          <p><span className="font-semibold">Role:</span> {ngo?.role}</p>
          <p><span className="font-semibold">Collector Type:</span> {ngo?.collectorType}</p>
          <p><span className="font-semibold">City Corporation:</span> {ngo?.cityCorp}</p>
          <p><span className="font-semibold">Area:</span> {ngo?.area}</p>
        </div>

        <div className="flex justify-between gap-4 p-4 border-t">
          {isloading ? (
            <button className="w-1/2 bg-green-500 text-white py-2 rounded-lg">
              <Loader />
            </button>
          ) : (
            <button
              onClick={() => acceptTheNgo(ngo?._id)}
              className="w-1/2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
            >
              Accept
            </button>
          )}

          {isloading ? (
            <button className="w-1/2 bg-red-500 text-white py-2 rounded-lg">
              <Loader />
            </button>
          ) : (
            <button
              onClick={() => setShowModal(true)}
              className="w-1/2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
            >
              Reject
            </button>
          )}
        </div>
      </div>


      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl shadow-lg w-96 p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Reject NGO</h2>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter rejection reason..."
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              rows="4"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => rejectTheNgo(ngo?._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Page
