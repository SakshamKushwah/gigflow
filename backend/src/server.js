import dotenv from "dotenv";
dotenv.config();

import http from "http";
import app from "./app.js";
import connectDB from "./config/db.js";
import { initSocket } from "./config/socket.js";

import authRoutes from "./routes/auth.routes.js";
import gigRoutes from "./routes/gig.routes.js";
import bidRoutes from "./routes/bid.routes.js";

connectDB();

// 1️⃣ Create HTTP server
const server = http.createServer(app);

// 2️⃣ Initialize socket.io
const io = initSocket(server);

// 3️⃣ 🔥 Attach io to req BEFORE routes
app.use((req, res, next) => {
  req.io = io;
  next();
});



app.get("/", (req, res) => {
  res.status(200).send("✅ Backend is running");
});


// 4️⃣ Routes
app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/bids", bidRoutes);

// 5️⃣ Start server
server.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});
