"use client"

import axios from "axios"
import debounce from "lodash.debounce"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const page = () => {
    const [users, setUsers] = useState([])
    const [searchText, setSearchText] = useState(``)
    const getAllusers = async (searchText = ``) => {
        try {
            const { data } = await axios.get('/api/admin/getUsers', {
                params: {
                    search: searchText
                }
            })
            if (data.success) {
                setUsers(data.usersData)
            }
        } catch (error) {
            console.error("Error fetching stats", error)
        }
    }

    useEffect(() => {
        getAllusers()
    }, [])

    const banAnAccount = async (userID) => {
        try {
            const { data } = await axios.post("/api/admin/banAcc", { userID })
            if (data.success) {
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user._id === userID
                            ? { ...user, isBanned: true }
                            : user
                    )
                )
                toast.success(`user banned`)
            } else {
                console.error(data.message)
            }
        } catch (error) {
            console.error("Error banning user:", error)
        }
    }
    const unbanAnAccount = async (userID) => {
        try {
            const { data } = await axios.post("/api/admin/unbanAcc", { userID })
            if (data.success) {
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user._id === userID
                            ? { ...user, isBanned: false }
                            : user
                    )
                )
                toast.success(`user unbanned`)
            } else {
                console.error(data.message)
            }
        } catch (error) {
            console.error("Error banning user:", error)
        }
    }

    const debouncedSearch = debounce((searchItem) => {
        getAllusers(searchItem)
    }, 500)

    useEffect(() => {
        debouncedSearch(searchText)
        return () => debouncedSearch.cancel()
    }, [debouncedSearch, searchText])

    return (
        <div className="overflow-x-auto">
            <div className="flex justify-center my-6">
                <div className="relative w-full max-w-xl">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-lg shadow-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    />
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
            </div>
            <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                            Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                            Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                            Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                            Ban Count
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                            Suspend
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {users.map((user, i) => (
                        <tr key={i} className="hover:bg-gray-100">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {user.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {user.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {user.role}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {user.banCount || 0}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {user.isBanned ? (
                                    <button className="cursor-pointer" onClick={() => unbanAnAccount(user._id)}>
                                        Unban
                                    </button>
                                ) : (
                                    <button className="cursor-pointer" onClick={() => banAnAccount(user._id)}>
                                        Ban
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}

export default page
