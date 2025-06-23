'use client';

import { Context } from '@/app/contextapi/ContextProvider';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

const Page = () => {
    const { user } = useContext(Context);
    const router = useRouter();

    return (
        <div className="flex h-[80vh] max-w-6xl mx-auto border shadow-lg mt-6 bg-white">
            {/* Sidebar */}
            <div className="w-1/4 border-r bg-gray-100 p-5 overflow-y-auto">
                <h2 className="text-xl font-semibold text-gray-700 mb-6">Chats</h2>

                {user?.chattedpersons?.length > 0 ? (
                    user.chattedpersons.map((id, index) => (
                        <div
                            key={index}
                            onClick={() => router.push(`/pages/chat/${id.receiverId}`)}
                            className="flex items-center gap-3 p-3 mb-3 rounded-lg cursor-pointer bg-white hover:bg-blue-100 transition duration-200"
                        >
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0" />
                            <span className="text-gray-800 font-medium">{id.name}</span>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No recent chats.</p>
                )}
            </div>

            {/* Main Window Placeholder */}
            <div className="flex-1 flex items-center justify-center bg-gray-50">
                <p className="text-gray-500 text-lg">Select a chat to start messaging</p>
            </div>
        </div>
    );
};

export default Page;
