"use client"
import { useState } from 'react';
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    TypingIndicator
} from "@chatscope/chat-ui-kit-react";
const api = process.env.NEXT_PUBLIC_GEMINI_API
const train = process.env.NEXT_PUBLIC_GEMINI_TRAIN
const Chatbot = () => {
    const [messages, setMessages] = useState([
        {
            message: `Hello! How can I help you today?`,
            sender: `bot`,
            direction: `incoming`
        }
    ]);
    const [istyping, setIstyping] = useState(false);
    const sendmsg = async (msg) => {
        const userMessage = {
            message: msg,
            sender: 'user',
            direction: 'outgoing'
        };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setIstyping(true);
        await processMessageToBot(updatedMessages);
    };
    
    async function processMessageToBot(chatHistory) {
        const formattedMessages = chatHistory.map(m => ({
            role: m.sender === "user" ? "user" : "model",
            parts: [{ text: m.message }]
        }));
        const systemInstruction = {
            role: "user",
            parts: [{
                text: train
            }]
        };
        const body = {
            contents: [
                systemInstruction,
                ...formattedMessages
            ]
        };
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${api}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });
            const data = await response.json();
            const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";
            const botMessage = {
                message: reply,
                sender: "bot",
                direction: "incoming"
            };
            setMessages(prev => [...prev, botMessage]);
        } catch (err) {
            console.error("Error from Gemini:", err);
        } finally {
            setIstyping(false);
        }
    }

    return (
        <div>
            <div className='w-[330px] h-[500px]'>
                <MainContainer>
                    <ChatContainer>
                        <MessageList typingIndicator={istyping ? <TypingIndicator content='replying...' /> : null}>
                            {messages.map((msg, i) => (
                                <Message key={i} model={msg} />
                            ))}
                        </MessageList>
                        <MessageInput placeholder='Type your message here...' onSend={sendmsg} />
                    </ChatContainer>
                </MainContainer>
            </div>
        </div>
    );
}

export default Chatbot
