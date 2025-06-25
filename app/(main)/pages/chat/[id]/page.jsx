'use client';

import { useEffect, useRef, useState, useContext } from 'react';
import { Context } from '@/app/contextapi/ContextProvider';
import { useParams, useRouter } from 'next/navigation';
import { io } from 'socket.io-client';
import axios from 'axios';
import { serverError } from '@/app/Utils/serverError';
import { Menu, X } from 'lucide-react';

let socket;

export default function ChatPage() {
  const { user } = useContext(Context);
  const { id: receiverId } = useParams();
  const router = useRouter();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const scrollRef = useRef();
  const [isonline, setIsonline] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    fetch('/api/socket');
  }, []);

  useEffect(() => {
    if (!user?._id || !receiverId) return;

    socket = io('', { path: '/api/socket' });

    socket.on('connect', () => {
      setIsonline(true);
      socket.emit('addUser', user._id);
    });

    socket.on('connect_error', (err) => {
      console.error('Socket error:', err);
    });

    socket.on('getMessage', (data) => {
      setMessages((prev) => [
        ...prev,
        {
          sender: data.senderId,
          message: data.text,
          timestamp: new Date(data.timestamp),
        },
      ]);
    });

    return () => {
      socket.disconnect();
      setIsonline(false);
    };
  }, [user?._id, receiverId]);

  useEffect(() => {
    const getAllMessages = async () => {
      try {
        axios.defaults.withCredentials = true;
        const { data } = await axios.get(`/api/chat/${receiverId}`);
        if (data.success && Array.isArray(data.chats)) {
          setMessages(data.chats);
        } else {
          setMessages([]);
        }
      } catch (err) {
        serverError(err.message);
        setMessages([]);
      }
    };

    if (receiverId) getAllMessages();
  }, [receiverId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    socket.emit('sendMessage', {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    setMessages((prev) => [
      ...prev,
      {
        sender: user._id,
        message: newMessage,
        timestamp: new Date(),
      },
    ]);

    setNewMessage('');
  };

  const handleChatClick = (id) => {
    router.push(`/pages/chat/${id}`);
    setShowSidebar(false);
  };
  if (!user) {
    return <div className="p-10 text-center text-gray-500">Loading chat...</div>;
  }

  return (
    <div className="h-[80vh] w-full flex justify-center bg-gray-50 mt-6">
      <div className="w-full max-w-6xl flex md:flex-row flex-col relative h-full border-2 border-black rounded-md">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-1/4 bg-gray-100 border-r p-5 overflow-y-auto">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Chats</h2>
          {user?.chattedpersons?.map((id) => (
            <div
              key={id.receiverId}
              onClick={() => handleChatClick(id.receiverId)}
              className={`p-3 mb-2 rounded-lg cursor-pointer hover:bg-blue-200 transition-colors ${receiverId === id.receiverId ? 'bg-blue-300 text-white' : 'bg-white text-gray-800'
                }`}
            >
              {id.name}
            </div>
          ))}
        </div>

        {/* Mobile Sidebar */}
        <div
          className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg border-r transform transition-transform duration-300 md:hidden ${showSidebar ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
          <div className="p-4 bg-gray-100 h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700">Chats</h2>
              <button onClick={() => setShowSidebar(false)}>
                <X className="text-gray-700" />
              </button>
            </div>
            {user?.chattedpersons?.map((id) => (
              <div
                key={id.receiverId}
                onClick={() => handleChatClick(id.receiverId)}
                className={`p-3 mb-2 rounded-lg cursor-pointer hover:bg-blue-200 transition-colors ${receiverId === id.receiverId ? 'bg-blue-300 text-white' : 'bg-white text-gray-800'
                  }`}
              >
                {id.name}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setShowSidebar(true)}
          className="md:hidden absolute top-4 left-4 z-40 bg-white p-2 rounded-full shadow"
        >
          <Menu size={20} />
        </button>

        {/* Chat Section */}
        <div className="flex flex-col flex-1 h-full">
          {/* Header */}
          <div className="border-b px-4 py-3 bg-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-700 pl-12 md:pl-0">
              {user?.chattedpersons?.find((id) => id.receiverId === receiverId)?.name || 'Chat'}
            </h3>
            {isonline ? (
              <span className="text-sm text-green-500">● Online</span>
            ) : (
              <span className="text-sm text-red-500">● Offline</span>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                ref={idx === messages.length - 1 ? scrollRef : null}
                className={`flex items-end space-x-2 ${msg.sender === user._id ? 'justify-end' : 'justify-start'
                  }`}
              >
                {user?.chattedpersons?.map((person, index) => {
                  if (msg.sender === person.receiverId) {
                    return (
                      <img
                        src={person?.image}
                        key={index}
                        className="w-[40px] h-[40px] rounded-full border"
                      />
                    );
                  }
                  return null;
                })}
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${msg.sender === user._id
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none border'
                    }`}
                >
                  {msg.message}
                  <div className="text-[10px] mt-1 text-gray-400 text-right">
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="border-t p-4 bg-white flex items-center gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 border rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );

}
