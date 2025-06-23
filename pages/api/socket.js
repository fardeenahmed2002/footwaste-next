import { Server } from 'socket.io';
import connectToDB from '@/app/Utils/database';
import { SendMessage } from '@/app/controllers/chatController';
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
      console.log('🟢 Socket connected:', socket.id)

      socket.on('addUser', (userId) => {
        onlineUsers.set(userId, socket.id)
        console.log('✅ Online user added:', userId)
      })

      socket.on('sendMessage', (data) => {
        SendMessage(data, io, onlineUsers)
      })

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
