import { useEffect } from "react";
import { socket } from "../socket";

export default function Dashboard() {

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?._id) {
      socket.emit("join", user._id);
    }

   socket.on("connect", () => {
  console.log("✅ Socket connected:", socket.id);
});

socket.on("hired", (data) => {
  console.log("🔥 HIRED EVENT RECEIVED", data);
  alert(`🎉 You have been hired for "${data.gigTitle}"`);
});

    return () => socket.off("hired");
  }, []);

  return <h2>Dashboard</h2>;
}
