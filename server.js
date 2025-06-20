// server.js
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import next from 'next';
import connectToDB from './app/Utils/database.js';
import { ChatModel } from './app/Models/Chat.js';
import { Usermodel } from './app/Models/User.js';

const port = process.env.PORT || 3000 || 10000;
const dev = process.env.NODE_ENV !== 'production'

const nextApp = next({ dev });
const handle = nextApp.getRequestHandler()

nextApp.prepare().then(async () => {
  await connectToDB()

  const app = express()
  const server = http.createServer(app)
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  const onlineUsers = new Map()

  io.on('connection', (socket) => {
    console.log('🟢 Socket connected:', socket.id)

    socket.on('addUser', (userId) => {
      onlineUsers.set(userId, socket.id)
      console.log('Online Users:', [...onlineUsers.keys()])
    });

    socket.on('sendMessage', async ({ senderId, receiverId, text }) => {
      const receiverSocketId = onlineUsers.get(receiverId)

      // ✅ Save to MongoDB
      try {
        await ChatModel.create({
          sender: senderId,
          receiver: receiverId,
          message: text,
        })
        const receiver = await Usermodel.findById(receiverId)
        const receivername = receiver.name
        const sender = await Usermodel.findById(senderId)
        const sendername = sender.name

        const alreadyChatted = sender.chattedpersons.some(
          (entry) => entry.receiverId.toString() === receiverId
        )
        if (!alreadyChatted) {
          sender.chattedpersons.push({ receiverId, name: receivername })
          await sender.save();
        }

        const alreadyMsgRequested = receiver.chatRequest.some(
          (id) => id.senderId.toString() === senderId
        )
        if (!alreadyMsgRequested) {
          receiver.chatRequest.push({ senderId, name: sendername })
          await receiver.save();
        }

        console.log('💾 Message saved')
      } catch (err) {
        console.error('❌ Failed to save message:', err.message)
      }

      // ✅ Emit message to receiver
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('getMessage', {
          senderId,
          text,
          timestamp: new Date(),
        });
      }
    });

    socket.on('disconnect', () => {
      for (const [userId, sockId] of onlineUsers.entries()) {
        if (sockId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
      console.log('🔴 Socket disconnected:', socket.id);
    });
  });

  // ✅ Forward all unmatched routes to Next.js
  app.use((req, res) => handle(req, res));

  server.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
  });
});
