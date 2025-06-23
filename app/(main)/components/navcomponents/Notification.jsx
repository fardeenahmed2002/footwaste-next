"use client"

import { Context } from "@/app/contextapi/ContextProvider"
import { useContext, useState, useEffect } from "react"
import { Bell, Trash2 } from "lucide-react"
import axios from "axios"
import { toast } from "react-toastify"
const Notification = () => {
    const { user, isloggedin } = useContext(Context)
    const [showNotification, setShowNotification] = useState(false)
    const [loading, setLoading] = useState(false)
    const [allnotifications, setAllnotifications] = useState(user?.notifications || [])
    const handledelete = async (e, index) => {
        e.preventDefault()
        setLoading(true)
        try {
            axios.defaults.withCredentials = true

            const { data } = await axios.post('/api/notify', { index })
            if (data.success) {


                setAllnotifications((prev) => {
                    return prev.filter((_, i) => {
                        return i !== index
                    });
                });
                toast.success('Deleted successfully');
            }
            if (!data.success) {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (user?.notifications) {
            setAllnotifications(user.notifications);
        }
    }, [user]);
    return (
        isloggedin && (
            <div className="relative cursor-pointer">
                <Bell
                    size={24}
                    className="w-10 h-10 text-white bg-[#6baed6]/20 border border-[#6baed6] rounded-full p-2 shadow-md transition duration-300 hover:scale-105 hover:shadow-blue-400/40"
                    onClick={() => { setShowNotification((prev) => !prev) }} />

                {showNotification && (
                    <div className="absolute top-16 right-[-104px] w-80 h-[500px] bg-white border border-[#6baed6] rounded-lg shadow-xl z-[9999] p-4 backdrop-blur-md">
                        <div className="flex items-center justify-between mb-4 px-2">
                            <h3 className="text-lg font-bold text-[#2171b5] tracking-wide">Notifications</h3>
                            <p className="text-sm text-blue-600 hover:text-blue-800 hover:underline cursor-pointer transition-all duration-200">mark all as read</p>
                        </div>

                        <ul className="h-[400px] overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-200 space-y-3">
                            {allnotifications.length === 0 ? (
                                <p className="text-center text-gray-500">No notifications</p>
                            ) :
                                allnotifications.map((notif, index) => {
                                    return { notif, originalIndex: index };
                                }).reverse().map(({ notif, originalIndex }) => {
                                    return (
                                        <li
                                            key={originalIndex}
                                            className="bg-white hover:bg-blue-50 transition-colors duration-300 p-4 rounded-lg shadow border border-gray-300 flex justify-between items-start"
                                        >
                                            <div className="flex-1">
                                                <p className="text-gray-700">{notif}</p>
                                            </div>
                                            <button
                                                className="text-gray-400 hover:text-red-600 transition-colors"
                                                onClick={(e) => handledelete(e, originalIndex)}
                                            >
                                                <Trash2 size={25} />
                                            </button>
                                        </li>
                                    )
                                })
                            }

                        </ul>
                    </div>
                )}
            </div>
        )
    )
}

export default Notification
