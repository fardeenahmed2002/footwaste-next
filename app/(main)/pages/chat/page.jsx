"use client"
import { Context } from "@/app/contextapi/ContextProvider"
import { useRouter } from "next/navigation"
import { useContext } from "react"

const page = () => {
    const { user } = useContext(Context)
    const router = useRouter()
    return (
        <div className="flex h-[80vh] max-w-6xl mx-auto border rounded-lg shadow mt-[20px]">
            <div className="w-1/4 border-r bg-gray-50 p-4 overflow-y-auto">
                <h2 className="text-lg font-semibold mb-4">Chats</h2>
                {user?.chattedpersons?.map((id) => (
                    <div
                        key={id}
                        onClick={() => router.push(`/pages/chat/${id.receiverId}`)}
                        className={`p-3 mb-2 rounded cursor-pointer hover:bg-blue-100`}
                    >
                        {id.name}
                    </div>
                ))}
            </div>
            <p>open chat window</p>
        </div>
    )
}

export default page
