'use client';

import { useEffect, useRef, useState, useContext } from 'react';
import { Context } from '@/app/contextapi/ContextProvider';
import { useParams } from 'next/navigation';
import { io } from 'socket.io-client';
import axios from 'axios';
import { serverError } from '@/app/Utils/serverError';

let socket;

export default function ChatPage() {
  const { user } = useContext(Context);
  const { id: receiverId } = useParams();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const scrollRef = useRef();
  const [isonline, setIsonline] = useState(null);
  useEffect(() => {
    fetch('/api/socket');
  }, []);

  useEffect(() => {
    if (!user?._id || !receiverId) return;

    socket = io('', { path: '/api/socket' });

    socket.on('connect', () => {
      console.log('✅ Socket connected:', socket.id);
      setIsonline(true);
      socket.emit('addUser', user._id);
    });

    socket.on('connect_error', (err) => {
      console.error('❌ Socket error:', err);
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
      console.log('🔌 Socket disconnected');
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
        console.error(err.message);
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

  if (!user) {
    return <div className="p-10 text-center text-gray-500">Loading chat...</div>;
  }

  return (
    <div className="flex h-[80vh] max-w-6xl mx-auto shadow-lg border bg-white mt-6">
      {/* Sidebar */}
      <div className="w-1/4 border-r bg-gray-100 p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Chats</h2>
        {user?.chattedpersons?.map((id) => (
          <div
            key={id.receiverId}
            onClick={() => (window.location.href = `/pages/chat/${id.receiverId}`)}
            className={`p-3 mb-2 rounded-lg cursor-pointer hover:bg-blue-200 transition-colors duration-200 ${receiverId === id.receiverId
              ? 'bg-blue-300 text-white'
              : 'bg-white text-gray-800'
              }`}
          >
            {id.name}
          </div>
        ))}
      </div>

      {/* Chat Section */}
      <div className="flex flex-col flex-1 h-full">
        {/* Header */}
        <div className="border-b px-4 py-3 bg-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-700">
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
                  return (<img
                    src={person?.image}
                    key={index}
                    className="w-[40px] h-[40px] rounded-full border"
                  />)
                }
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
  );
}
