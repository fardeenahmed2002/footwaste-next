'use client';

import { useEffect, useState, useContext, useRef } from 'react';
import io from 'socket.io-client';
import { Context } from '@/app/contextapi/ContextProvider';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

let socket;

export default function ChatPage() {
  const { user } = useContext(Context);
  const { id: receiverId } = useParams();
  const router = useRouter();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const scrollRef = useRef();

  // Connect socket and fetch chat
  useEffect(() => {
    if (!user?._id || !receiverId) return;

    const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000';

    socket = io(SOCKET_URL);

    socket.emit('addUser', user._id);
    socket.on('getMessage', (data) => {
      setMessages((prev) => [
        ...prev,
        { sender: data.senderId, text: data.text, timestamp: new Date() },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [user?._id, receiverId]);

  // Scroll to latest message
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

    setMessages([
      ...messages,
      { sender: user._id, text: newMessage, timestamp: new Date() },
    ]);
    setNewMessage('');
  };

  return (
    <div className="flex h-[80vh] max-w-6xl mx-auto border rounded-lg shadow mt-[20px]">
      {/* Sidebar */}
      <div className="w-1/4 border-r bg-gray-50 p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Chats</h2>
        {user?.chattedpersons?.map((id) => (
          <div
            key={id}
            onClick={() => router.push(`/pages/chat/${id.receiverId}`)}
            className={`p-3 mb-2 rounded cursor-pointer hover:bg-blue-100 ${receiverId === id ? 'bg-blue-200' : ''
              }`}
          >
            {id.name}
          </div>
        ))}
      </div>

      {/* Chat Window */}
      <div className="flex flex-col flex-1 p-4">
        <div className="flex-1 overflow-y-auto mb-2 space-y-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              ref={idx === messages.length - 1 ? scrollRef : null}
              className={`max-w-[70%] px-4 py-2 rounded-xl break-words ${msg.sender === user._id || msg.senderId === user._id
                ? 'bg-blue-500 text-white self-end ml-auto'
                : 'bg-gray-300 text-black self-start mr-auto'
                }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input */}
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
      </div>
    </div>
  );
}
