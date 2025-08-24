'use client'
import { Context } from "@/app/contextapi/ContextProvider"
import Image from "next/image"
import Link from "next/link"
import { useContext } from "react"
import ProfileSkeleton from "./ProfileSkeleton"

export default function ProfileCard() {
  const { user, loading } = useContext(Context)

  if (loading) {
    return <ProfileSkeleton />
  }

  return (
    <div
      className="min-h-[calc(100vh-87px)] bg-cover bg-center flex items-center justify-center px-4 py-6 relative"
      style={{ backgroundImage: "url('/loginbg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0" />

      {user && (
        <div className="relative z-10 bg-white/10 backdrop-blur-md text-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-5xl flex flex-col md:grid md:grid-cols-3">
          <div className="flex items-center justify-center p-6">
            <Image
              src={user.image}
              alt="Profile"
              width={160}
              height={160}
              className="rounded-full border-4 border-cyan-400 shadow-md object-cover"
            />
          </div>

          <div className="md:col-span-2 p-4 sm:p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-cyan-300">{user.name}</h2>
                  <p className="text-gray-200">({user.role})</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-gray-300 font-semibold">Email</h4>
                  <p className="text-white break-all">{user.email}</p>
                </div>
                <div>
                  <h4 className="text-gray-300 font-semibold">Contact</h4>
                  <p className="text-white">{user.contactNumber}</p>
                </div>
                <div>
                  <h4 className="text-gray-300 font-semibold">User Type</h4>
                  <p className="text-white">{user.role}</p>
                </div>
                <div>
                  <h4 className="text-gray-300 font-semibold">City Corporation</h4>
                  <p className="text-white">{user.cityCorp || "Unknown"}</p>
                </div>
                <div>
                  <h4 className="text-gray-300 font-semibold">Area</h4>
                  <p className="text-white">{user.area || "Unknown"}</p>
                </div>
              </div>
            </div>

            {/* Activity Links */}
            <div className="flex flex-col sm:flex-row justify-between gap-6">
              <div className="sm:w-1/2">
                <h3 className="text-white font-semibold mb-2">Your Activity</h3>
                <ul className="space-y-2">
                  {(user.role === "user" || user.role === "donor") && (
                    <li>
                      <Link
                        href={user.role === "user" ? "/user/donate/donatedfoods" : "/donor/donatedfoods"}
                        className="text-cyan-300 hover:text-cyan-100 hover:underline"
                      >
                        Donated Foods
                      </Link>
                    </li>
                  )}
                  {user.role === "collector" && (
                    <li>
                      <Link
                        href="/collector/receivedfoods"
                        className="text-cyan-300 hover:text-cyan-100 hover:underline"
                      >
                        📝 Received Foods
                      </Link>
                    </li>
                  )}
                  {user.role === "admin" && (
                    <>
                      <li>
                        <Link
                          href="/admin/history"
                          className="text-cyan-300 hover:text-cyan-100 hover:underline"
                        >
                          Food History
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/user/blog"
                          className="text-cyan-300 hover:text-cyan-100 hover:underline"
                        >
                          Post Blog
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}
