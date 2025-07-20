import crypto from "crypto";
import { Room } from "../models/room.js";

const generateRoomId = (length = 6) => {
  return crypto
    .randomBytes(length)
    .toString("base64")
    .replace(/[^a-zA-Z0-9]/g, "")
    .substring(0, length);
};

export const createRoom = async (req,res) => {
  try {
    const roomId = generateRoomId();
    const newRoom = new Room({
      roomId,
      createdAt: new Date(),
      lastActivity: new Date(),
    });

    await newRoom.save();

    res.status(201).json({ roomId });
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
