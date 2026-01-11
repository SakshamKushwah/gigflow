import { Server } from "socket.io";

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    socket.on("join", (userId) => {
      socket.join(userId);
    });
  });

  return io;
};
