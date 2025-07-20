import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
 import { connectDB } from "./utils/connection.js";
import { createRoomRoute } from "./routes/createRoom.js";
import { sendMailRoute  } from "./routes/sendMail.js";
import { updateData } from "./controllers/updateData.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("🟢 A user connected:", socket.id);

  socket.on("join-room", (roomid) => {
    socket.join(roomid);
    console.log(`🔗 User ${socket.id} joined room: ${roomid}`);
    socket.to(roomid).emit("user-joined", socket.id);
    console.log(`🔔 Notified room ${roomid} that user ${socket.id} has joined`);
  });

  socket.on("send-drawing", (data) => {
    socket.to(data.roomid).emit("receive-drawing", data);
    updateData(data)
  });

  socket.on("clear", (data) => {
    socket.to(data.roomid).emit("clear-canvas");
    updateData(data);
  })

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send(`Server is running...`);
});

app.use("/api/room", createRoomRoute);
app.use("/api/send-mail", sendMailRoute);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
