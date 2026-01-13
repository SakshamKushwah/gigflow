import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_API_URL, {
  transports: ["websocket"], // 🔥 ONLY correct option on Render
  withCredentials: true,
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
});
