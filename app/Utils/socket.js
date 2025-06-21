import { io } from 'socket.io-client';

let socket;

export const connectSocket = () => {
  if (!socket) {
    socket = io({ path: '/api/socket' });
  }
  return socket;
};
