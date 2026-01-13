import { Server } from "socket.io";

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: [
        "https://gigflow-navy.vercel.app",
        "http://localhost:5173"
      ],
      credentials: true,
    },
    transports: ["websocket"], // 🔥 REQUIRED ON RENDER
  });

  io.on("connection", (socket) => {
    console.log("🟢 Socket connected:", socket.id);

    socket.on("join", (userId) => {
      socket.join(userId);
      console.log("👤 User joined room:", userId);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Socket disconnected:", socket.id);
    });
  });

  return io;
};
