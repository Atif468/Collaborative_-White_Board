import mongoose from "mongoose";

const DrawingCommandSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["stroke", "clear"],
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export const DrawingCommand = mongoose.model(
  "DrawingCommand",
  DrawingCommandSchema
);
