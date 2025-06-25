"use client"
import { Context } from "@/app/contextapi/ContextProvider"
import Image from "next/image"
import Link from "next/link"
import { useContext } from "react"

export default function ProfileCard() {
  const { user, loading } = useContext(Context)

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-black text-white">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  return (
    <div
      className="min-h-[calc(100vh-87px)] bg-cover bg-center flex items-center justify-center px-4 py-6 relative"
      style={{ backgroundImage: "url('/loginbg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0" />
      {user && (
        <div className="relative z-10 bg-white/10 backdrop-blur-md text-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-5xl flex flex-col md:grid md:grid-cols-3">
          {/* Profile Image */}
          <div className="bg-white/10 backdrop-blur-md flex items-center justify-center p-6">
            <Image
              src={user.image}
              alt="Profile"
              width={160}
              height={160}
              className="rounded-full border-4 border-cyan-400 shadow-md object-cover"
            />
          </div>

          {/* Profile Info */}
          <div className="md:col-span-2 p-4 sm:p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Name and Role */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-cyan-300">{user.name}</h2>
                  <p className="text-gray-200">({user.role})</p>
                </div>
                <span className="text-green-400 font-semibold">● Online</span>
              </div>

              {/* Bio */}
              <div>
                <h3 className="text-lg text-white font-semibold mb-1">Bio</h3>
                <p className="text-sm text-gray-300 italic">
                  Nothing lasts forever, we can create the future.
                </p>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-white font-semibold">Email</h4>
                  <p className="text-sm text-gray-300 break-all">{user.email}</p>
                </div>
                <div>
                  <h4 className="text-white font-semibold">Contact</h4>
                  <p className="text-sm text-gray-300 break-all">{user.contactNumber}</p>
                </div>
                <div>
                  <h4 className="text-white font-semibold">Location</h4>
                  <p className="text-sm text-gray-300">{user.address || "Unknown"}</p>
                </div>
              </div>
            </div>

            {/* Activities and Contribution */}
            <div className="flex flex-col sm:flex-row justify-between gap-6">
              <div className="sm:w-1/2">
                <h3 className="text-white font-semibold mb-2">Your Activity</h3>
                <ul className="space-y-2">
                  <li>
                    {(user.role === "user" || user.role === "donor") && (
                      <Link
                        href={user.role === "user" ? "/user/donate/donatedfoods" : "/donor/donatedfoods"}
                        className="text-cyan-300 hover:text-cyan-100 hover:underline"
                      >
                        📦 Donated Foods
                      </Link>
                    )}
                  </li>
                  <li>
                    <Link
                      href="/user/blog/myblogs"
                      className="text-cyan-300 hover:text-cyan-100 hover:underline"
                    >
                      📝 My Blogs
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="sm:w-1/2">
                <h3 className="text-white font-semibold mb-2">Contribute</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/user/blog"
                      className="text-cyan-300 hover:text-cyan-100 hover:underline"
                    >
                      ✍️ Post Blog
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Message Button */}
            <div className="pt-4 flex justify-center sm:justify-start">
              <button className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-2 px-6 rounded-full shadow">
                ✉️ Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
