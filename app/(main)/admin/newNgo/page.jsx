"use client"
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'


const Page = () => {
    const [allngos, setAllngos] = useState([])

    const getRequests = async () => {
        try {
            const { data } = await axios.get(`/api/admin/newNgo`)
            if (data.success) {
                setAllngos(data.ngos)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getRequests()
    }, [])

    return (
        <div className="p-6">
            {allngos.length === 0 ? (
                <p className="text-center text-gray-500">No new NGO requests</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-6 text-left border-b">#</th>
                                <th className="py-3 px-6 text-left border-b">Name</th>
                                <th className="py-3 px-6 text-left border-b">Email</th>
                                <th className="py-3 px-6 text-left border-b">Contact Number</th>
                                <th className="py-3 px-6 text-left border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allngos.map((ngo, i) => (
                                <tr key={ngo._id} className="hover:bg-gray-50">
                                    <td className="py-3 px-6 border-b">{i + 1}</td>
                                    <td className="py-3 px-6 border-b">{ngo.name}</td>
                                    <td className="py-3 px-6 border-b">{ngo.email}</td>
                                    <td className="py-3 px-6 border-b">{ngo.contactNumber}</td>
                                    <td className="py-3 px-6 border-b">
                                        <Link href={`/admin/newNgo/${ngo._id}`}
                                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"

                                        >
                                            Show Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default Page
