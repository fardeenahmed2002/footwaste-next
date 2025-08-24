'use client';

import { useState, useContext } from 'react';
import { Context } from '@/app/contextapi/ContextProvider';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Search, MessageCircle, UserCheck } from 'lucide-react';

const Page = () => {
  const { user } = useContext(Context);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleChatClick = (id) => {
    router.push(`/pages/chat/${id}`);
  };

  const filteredUsers = user?.chattedpersons?.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-[445px] max-w-6xl mx-auto border shadow-lg mt-6 bg-white flex">
      {/* Sidebar */}
      <div className="w-72 bg-gray-100 border-r p-5 flex flex-col">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <MessageCircle size={24} /> Chats
        </h2>

        {/* Search bar */}
        <div className="mb-4 relative">
          <Search className="absolute top-2 left-2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search persons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 p-2 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Person list */}
        <div className="flex-1 overflow-y-auto">
          {filteredUsers && filteredUsers.length > 0 ? (
            filteredUsers.map((person, index) => (
              <div
                key={index}
                onClick={() => handleChatClick(person.receiverId)}
                className="flex items-center gap-3 p-3 mb-3 rounded-lg cursor-pointer bg-white hover:bg-blue-100 transition duration-200"
              >
                <div className="w-10 h-10 relative rounded-full overflow-hidden">
                  <Image
                    src={person.image || '/default-avatar.png'}
                    alt={person.name}
                    fill
                    className="object-cover"
                  />
                  {/* Online status */}
                  {person.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <span className="text-gray-800 font-medium">{person.name}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 mt-4 flex items-center gap-2">
              <UserCheck size={18} /> No recent chats.
            </p>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg">Select a chat to start messaging</p>
      </div>
    </div>
  );
};

export default Page;
