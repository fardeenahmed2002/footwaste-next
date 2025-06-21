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

  // Initialize Socket.IO server on the backend
  useEffect(() => {
    fetch('/api/socket');
  }, []);

  // Setup socket connection
  useEffect(() => {
    if (!user?._id || !receiverId) return;

    socket = io('', { path: '/api/socket' });

    socket.on('connect', () => {
      console.log('✅ Socket connected:', socket.id);
      socket.emit('addUser', user._id);
    });

    socket.on('connect_error', (err) => {
      console.error('❌ Socket error:', err);
    });

    socket.on('getMessage', (data) => {
      console.log('📥 Message received:', data);
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
      console.log('🔌 Socket disconnected');
    };
  }, [user?._id, receiverId]);

  // Fetch existing messages
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

  // Scroll to last message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send a message
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

  return (
    <div className="flex h-[80vh] max-w-6xl mx-auto border rounded-lg shadow mt-[20px]">
      {/* Sidebar */}
      <div className="w-1/4 border-r bg-gray-50 p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Chats</h2>
        {user?.chattedpersons?.map((idObj) => (
          <div
            key={idObj.receiverId}
            onClick={() => (window.location.href = `/chat/${idObj.receiverId}`)}
            className={`p-3 mb-2 rounded cursor-pointer hover:bg-blue-100 ${
              receiverId === idObj.receiverId ? 'bg-blue-200' : ''
            }`}
          >
            {idObj.name}
          </div>
        ))}
      </div>

      {/* Chat Window */}
      <div className="flex flex-col flex-1 p-4">
        {user?._id ? (
          <>
            <div className="flex-1 overflow-y-auto mb-2 space-y-2">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  ref={idx === messages.length - 1 ? scrollRef : null}
                  className={`max-w-[70%] px-4 py-2 rounded-xl break-words ${
                    user?._id && msg.sender === user._id
                      ? 'bg-blue-500 text-white self-end ml-auto'
                      : 'bg-gray-300 text-black self-start mr-auto'
                  }`}
                >
                  {msg.message}
                </div>
              ))}
            </div>

            {/* Input Box */}
            <div className="flex items-center border-t pt-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2"
              />
              <button
                onClick={handleSend}
                className="ml-2 px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <p>Loading chat...</p>
        )}
      </div>
    </div>
  );
}
