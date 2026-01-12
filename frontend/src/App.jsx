import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { socket } from "./socket";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PostGig from "./pages/PostGig";
import GigDetails from "./pages/GigDetails";

export default function App() {
  const user = useSelector((state) => state.auth.user);

  // 🔥 SOCKET LIFECYCLE (GLOBAL, STABLE)
  useEffect(() => {
    if (!user?._id) return;

    console.log("✅ Joining socket room ONCE:", user._id);
    socket.emit("join", user._id);

    const onHired = (data) => {
      console.log("🔥 HIRED EVENT RECEIVED:", data);
      alert(`🎉 You have been hired for "${data.gigTitle}"`);
    };

    socket.on("hired", onHired);

    return () => {
      socket.off("hired", onHired);
    };
  }, [user?._id]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post" element={<PostGig />} />
        <Route path="/gig/:id" element={<GigDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
