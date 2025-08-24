'use client';

import { Context } from '@/app/contextapi/ContextProvider';
import { serverError } from '@/app/Utils/serverError';
import axios from 'axios';
import { Menu, X } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import Link from 'next/link';


let socket;
let typingTimeout;

export default function ChatPage() {
  const { user } = useContext(Context);
  const { id: receiverId } = useParams();
  const router = useRouter();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
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

    socket.on('showTyping', (senderId) => {
      if (senderId === receiverId) setIsTyping(true);
    });

    socket.on('hideTyping', (senderId) => {
      if (senderId === receiverId) setIsTyping(false);
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

  const handleTyping = (e) => {
    setNewMessage(e.target.value);

    socket.emit('typing', { senderId: user._id, receiverId });

    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      socket.emit('stopTyping', { senderId: user._id, receiverId });
    }, 2000);
  };

  const handleSend = () => {
    if (!newMessage.trim()) return;

    socket.emit('stopTyping', { senderId: user._id, receiverId });

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
    <div className="h-[450px] w-full flex justify-center mt-6">
      <div className="w-full max-w-6xl flex md:flex-row flex-col relative h-full rounded-2xl overflow-hidden shadow-lg bg-white">
        {/* Sidebar */}
        <div className="hidden md:block w-1/4 bg-gradient-to-b from-gray-100 to-gray-200 border-r overflow-y-auto">
          <Link href={`/pages/chat`}>
            <h2 className="text-xl font-semibold text-gray-700 mb-4 p-4">Chats</h2>
          </Link>
          {user?.chattedpersons?.map((id) => (
            <div
              key={id.receiverId}
              onClick={() => handleChatClick(id.receiverId)}
              className={`flex items-center gap-3 p-3 mb-2 rounded-lg cursor-pointer transition-colors ${receiverId === id.receiverId
                ? 'bg-blue-500 text-white'
                : 'bg-white hover:bg-gray-100'
                }`}
            >
              <img
                src={id.image}
                alt=""
                className="w-10 h-10 rounded-full border object-cover"
              />
              <div>
                <p className="font-semibold">{id.name}</p>
                <p className="text-xs text-gray-500 truncate">
                  {id.lastMessage || 'Start chatting...'}
                </p>
              </div>
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
                className={`p-3 mb-2 rounded-lg cursor-pointer hover:bg-blue-100 ${receiverId === id.receiverId
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-800'
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
          <div className="border-b px-4 py-3 bg-gray-50 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <img
                src={
                  user?.chattedpersons?.find((id) => id.receiverId === receiverId)?.image ||
                  '/default.png'
                }
                alt="avatar"
                className="w-10 h-10 rounded-full border object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  {user?.chattedpersons?.find((id) => id.receiverId === receiverId)?.name ||
                    'Chat'}
                </h3>
                <span
                  className={`text-sm ${isonline ? 'text-green-500' : 'text-red-400'
                    }`}
                >
                  ● {isonline ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                ref={idx === messages.length - 1 ? scrollRef : null}
                className={`flex items-end ${msg.sender === user._id ? 'justify-end' : 'justify-start'
                  }`}
              >
                {msg.sender !== user._id && (
                  <img
                    src={
                      user?.chattedpersons?.find((p) => p.receiverId === msg.sender)?.image ||
                      '/default.png'
                    }
                    className="w-8 h-8 rounded-full border mr-2"
                  />
                )}
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl text-sm shadow ${msg.sender === user._id
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-br-none'
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

            {isTyping && (
              <div className="px-4 py-1 text-gray-500 text-sm italic animate-pulse">
                {user?.chattedpersons?.find((p) => p.receiverId === receiverId)?.name ||
                  'User'}{' '}
                is typing...
              </div>
            )}
          </div>

          {/* Input Box */}
          <div className="border-t p-3 bg-white flex items-center gap-2 shadow-md">
            <input
              type="text"
              value={newMessage}
              onChange={handleTyping}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 border rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSend}
              className="px-5 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
