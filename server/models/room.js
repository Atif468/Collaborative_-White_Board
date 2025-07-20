import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    unique: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastActivity: {
    type: Date,
    default: Date.now,
  },
  drawingData: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DrawingCommand",
    },
  ],
});

export const Room = mongoose.model("Room", RoomSchema);
