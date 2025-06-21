import { NextResponse } from "next/server"
import { ChatModel } from "../Models/Chat"

export const getallchat = async (userid, receiverid) => {
    try {
        if (!userid || !receiverid) {
            return NextResponse.json({
                success: false,
                message: "Missing user ID or receiver ID"
            });
        }

        const messages = await ChatModel.find({
            $or: [
                { sender: userid, receiver: receiverid },
                { sender: receiverid, receiver: userid },
            ],
        }).sort({ timestamp: 1 }); // Sort by time (oldest first)

        return NextResponse.json({
            success: true,
            message: "Chat loaded",
            chats: messages,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "Server error"
        }, { status: 500 });
    }
};
