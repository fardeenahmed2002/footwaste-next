'use client';

import { useState, useContext } from 'react';
import { Context } from '@/app/contextapi/ContextProvider';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const Page = () => {
  const { user } = useContext(Context);
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(false);

  const handleChatClick = (id) => {
    router.push(`/pages/chat/${id}`);
    setShowSidebar(false); // close sidebar on mobile after selecting
  };

  return (
    <div className="h-[80vh] max-w-6xl mx-auto border shadow-lg mt-6 bg-white flex relative">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden absolute top-4 left-4 z-50 p-2 bg-gray-100 rounded-md shadow"
        onClick={() => setShowSidebar(true)}
        aria-label="Open sidebar"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-gray-100 border-r p-5 overflow-y-auto transition-transform duration-300 z-40 ${
          showSidebar ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        {/* Close button on mobile */}
        <div className="flex justify-end mb-4 md:hidden">
          <button
            onClick={() => setShowSidebar(false)}
            aria-label="Close sidebar"
            className="p-2 rounded-md hover:bg-gray-300"
          >
            <X size={24} />
          </button>
        </div>

        <h2 className="text-xl font-semibold text-gray-700 mb-6">Chats</h2>

        {user?.chattedpersons?.length > 0 ? (
          user.chattedpersons.map((id, index) => (
            <div
              key={index}
              onClick={() => handleChatClick(id.receiverId)}
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
      <div className="flex-1 flex items-center justify-center bg-gray-50 overflow-y-auto">
        <p className="text-gray-500 text-lg">Select a chat to start messaging</p>
      </div>
    </div>
  );
};

export default Page;
