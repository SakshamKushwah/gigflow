import { io } from "socket.io-client";

export const socket = io("http://localhost:5000", {
  withCredentials: true,
  transports: ["polling", "websocket"], // ✅ allow fallback
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 500
});
