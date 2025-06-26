import { NextResponse } from "next/server"
import { ChatModel } from "../Models/Chat"
import { Usermodel } from "../Models/User";

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



export const SendMessage = async ({ senderId, receiverId, text }, io, onlineUsers) => {
    try {
        // Save the message in database
        await ChatModel.create({
            sender: senderId,
            receiver: receiverId,
            message: text
        });


        const receiver = await Usermodel.findById(receiverId);
        const sender = await Usermodel.findById(senderId);

        // Add chatted person and chat request if not already added
        if (receiver && sender) {
            const alreadyChatted = sender.chattedpersons.some(
                (entry) => entry.receiverId.toString() === receiverId
            );
            if (!alreadyChatted) {
                sender.chattedpersons.push({ receiverId, name: receiver.name, image: receiver.image });
                await sender.save();
            }

            const alreadyRequested = receiver.chatRequest.some(
                (entry) => entry.senderId.toString() === senderId
            );
            if (!alreadyRequested) {
                receiver.chatRequest.push({ senderId, name: sender.name, image: sender.image });
                await receiver.save();
            }
        }

        // Send real-time message if receiver is online
        const receiverSocketId = onlineUsers.get(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('getMessage', {
                senderId,
                text,
                timestamp: new Date(),
            });
        }
    } catch (err) {
        console.error('❌ Failed to handle sendMessage:', err.message);
    }
};



export const declineAChat = async (userid, index) => {
    try {
        if (!userid) {
            return NextResponse.json({
                success: false,
                message: 'not authed'
            })
        }
        await Usermodel.findByIdAndUpdate(userid, { $unset: { [`chatRequest.${index}`]: 1 } })
        const updateUser = await Usermodel.findByIdAndUpdate(userid, { $pull: { chatRequest: null } }, { new: true })
        return NextResponse.json({
            success: true,
            message: 'message request removed successfully',
            messagerequestes: updateUser.chatRequest
        })
    } catch (error) {
        console.error('Error deleting chat request:', error)
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        )
    }

}