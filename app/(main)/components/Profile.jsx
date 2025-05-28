"use client"
import { Context } from "@/app/contextapi/ContextProvider";
import Image from "next/image";
import { useContext } from "react";
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
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-700 flex items-center justify-center p-4">
            {user && (
                <div className="flex bg-gray-900 text-white rounded-xl overflow-hidden shadow-2xl max-w-5xl w-full">
                    <div className="w-1/2 flex items-center justify-center p-8">
                        <Image
                            src={user.image}
                            width={400}
                            height={400}
                            alt="Profile"
                            className="object-cover rounded-full border-4 border-[green]"
                        />
                    </div>
                    <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between items-center flex-wrap gap-2">
                                    <h2 className="text-3xl font-bold text-cyan-400">{user.name}</h2>
                                    <span className="text-sm text-cyan-400">online <span className="text-green-500">●</span></span>
                                </div>
                                <p className="text-cyan-200">({user.role})</p>
                                <div>
                                    <h3 className="text-cyan-400 text-xl font-semibold">Bio</h3>
                                    <p className="text-sm text-gray-300 mt-1 text-justify break-words">
                                        Nothing lasts forever, we can create the future.
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                                    <div>
                                        <h3 className="text-cyan-400 text-xl font-semibold">Email</h3>
                                        <p className="text-sm text-gray-300 break-all">{user.email}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-cyan-400 text-xl font-semibold">Contact</h3>
                                        <p className="text-sm text-gray-300 break-all">{user.contactNumber}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-cyan-400 text-xl font-semibold">Location</h3>
                                        <p className="text-sm text-gray-300">{user.address || 'unknown'}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-cyan-400 text-xl font-semibold">Social Links</h3>
                                        <p className="text-sm text-gray-300">—</p> {/* placeholder for links */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6">
                            <button className="bg-cyan-400 hover:bg-cyan-500 text-gray-900 font-semibold py-2 px-6 rounded-full w-full sm:w-auto">
                                Message
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}