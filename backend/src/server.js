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

app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/bids", bidRoutes);

const server = http.createServer(app);
const io = initSocket(server);

app.use((req, res, next) => {
  req.io = io;
  next();
});

server.listen(process.env.PORT, () =>
  console.log("Server running on port", process.env.PORT)
);
