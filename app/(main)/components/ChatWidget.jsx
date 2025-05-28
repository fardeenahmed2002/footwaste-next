"use client"
import React, { useState } from 'react';
import Chatbot from './Chatbot';
import { MessageCircle } from 'lucide-react';

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-5 right-5 z-50 bg-black text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
            >
                <MessageCircle size={24} />
            </button>
            {isOpen && (
                <div className="fixed bottom-20 right-5 w-[330px] h-[500px] z-50 shadow-xl rounded-xl overflow-hidden border border-gray-300 bg-white">
                    <Chatbot />
                </div>
            )}
        </>
    );
}
