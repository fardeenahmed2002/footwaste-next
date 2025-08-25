"use client"
import axios from "axios"
import { BookOpen, PenIcon, Sandwich } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FaBuilding, FaUsers, FaUserShield } from "react-icons/fa"
export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalNgos: 0,
        newNgos: 0,
        totalBannedUsers: 0,
        totalFoods: 0,
        freeDonatedfoods:0
    })

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await axios.get("/api/admin/stats")
                setStats({
                    totalUsers: data.totalUsers,
                    totalNgos: data.totalNgos,
                    newNgos: data.newNgos,
                    totalBannedUsers: data.totalBannedUsers,
                    totalFoods: data.totalFoods,
                    freeDonatedfoods:data.freeDonatedfoods
                })
            } catch (error) {
                console.error("Error fetching stats", error)
            }
        }
        fetchStats()
    }, [])

    const navigate = useRouter()

    const handleClick = (cardTitle) => {
        switch (cardTitle) {
            case "Total Users":
                console.log("Clicked Total Users")
                break
            case "Collectors":
                console.log("Clicked Collectors")
                break

            case "Banned Users":
                navigate.push('/admin/accounts')

                break
            case "New NGO Requests":
                navigate.push('/admin/newNgo')
                break
            case "Outsiders Donated Foods":
                navigate.push('/admin/non-auth-donation')
                break

            case "Submitted Food Requests":
                navigate.push(`/admin/foodRequests`)
                break
            case "Post Blog":
                navigate.push(`/pages/blog`)
                break
            case "Post Ngo":
                navigate.push(`/admin/post-ngo`)
                break
            default:
                break
        }
    }

    const cards = [
        {
            title: "Total Users",
            value: stats.totalUsers, icon: <FaUsers size={28} />, color: "bg-gray-100 text-gray-800"
        },
        {
            title: "Collectors",
            value: stats.totalNgos, icon: <FaBuilding size={28} />, color: "bg-green-100 text-green-700"
        },
        {
            title: "Banned Users",
            value: stats.totalBannedUsers, icon: <FaUserShield size={28} />, color: "bg-red-100 text-red-700"
        },
        {
            title: "New NGO Requests",
            value: stats.newNgos, icon: <FaBuilding size={28} />, color: "bg-yellow-100 text-yellow-700"
        },
        {
            title: "Submitted Food Requests",
            value: stats.totalFoods, icon: <Sandwich size={28} />, color: "bg-yellow-100 text-yellow-700"
        },
        {
            title: "Outsiders Donated Foods",
            value: stats.freeDonatedfoods, icon: <Sandwich size={28} />, color: "bg-yellow-100 text-yellow-700"
        },
        { title: "Post A Ngo", icon: <PenIcon size={28} />, color: "bg-yellow-100 text-yellow-700" },
        { title: "Post Blog", icon: <BookOpen size={28} />, color: "bg-yellow-100 text-yellow-700" },
    ]

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        onClick={() => handleClick(card.title)}
                        className="rounded-xl p-6 shadow-md flex items-center justify-between bg-white hover:shadow-lg hover:cursor-pointer transition-shadow"
                    >
                        <div>
                            <h2 className="text-lg text-gray-600">{card.title}</h2>
                            <p className="text-3xl font-bold mt-2 text-gray-900">{card.value}</p>
                        </div>
                        <div className={`p-4 rounded-full ${card.color} flex items-center justify-center`}>
                            {card.icon}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
