import { Server } from 'socket.io';
import connectToDB from '@/app/Utils/database';
import { ChatModel } from '@/app/Models/Chat';
import { Usermodel } from '@/app/Models/User';

let io;

export default async function handler(req, res) {
  if (!res.socket.server.io) {
    console.log('✅ Initializing Socket.IO server...');
    await connectToDB();

    io = new Server(res.socket.server, {
      path: '/api/socket',
      addTrailingSlash: false,
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

    res.socket.server.io = io;

    const onlineUsers = new Map();

    io.on('connection', (socket) => {
      console.log('🟢 Socket connected:', socket.id);

      socket.on('addUser', (userId) => {
        onlineUsers.set(userId, socket.id);
        console.log('✅ Online user added:', userId);
      });

      socket.on('sendMessage', async ({ senderId, receiverId, text }) => {
        console.log('📤 Message received from client:', senderId, '→', receiverId, text);
        console.log('💾 Trying to save message...');

        try {
          // ✅ match schema field name
          await ChatModel.create({
            sender: senderId,
            receiver: receiverId,
            message: text, // ✅ correct key
          });

          const receiver = await Usermodel.findById(receiverId);
          const sender = await Usermodel.findById(senderId);
          if (receiver && sender) {
            const alreadyChatted = sender.chattedpersons.some(
              (entry) => entry.receiverId.toString() === receiverId
            );
            if (!alreadyChatted) {
              sender.chattedpersons.push({ receiverId, name: receiver.name });
              await sender.save();
            }

            const alreadyRequested = receiver.chatRequest.some(
              (entry) => entry.senderId.toString() === senderId
            );
            if (!alreadyRequested) {
              receiver.chatRequest.push({ senderId, name: sender.name });
              await receiver.save();
            }
          }

          const receiverSocketId = onlineUsers.get(receiverId);
          if (receiverSocketId) {
            io.to(receiverSocketId).emit('getMessage', {
              senderId,
              text, // keeping `text` in payload to client
              timestamp: new Date(),
            });
          }

          console.log('✅ Message saved');
        } catch (err) {
          console.error('❌ Failed to save message:', err.message);
        }
      });

      socket.on('disconnect', () => {
        for (const [userId, sockId] of onlineUsers.entries()) {
          if (sockId === socket.id) {
            onlineUsers.delete(userId);
            console.log('🔴 User disconnected:', userId);
            break;
          }
        }
      });
    });
  }

  res.end();
}
