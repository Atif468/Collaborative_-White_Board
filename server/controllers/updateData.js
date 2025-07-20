import { DrawingCommand } from "../models/drawingCommand.js";
import { Room } from "../models/room.js";

export const updateData = async (data) => {
    try {
        const drawingCommand = new DrawingCommand({
          type: data.type,
          data: {
            image: data.type == "stroke" ? data.data : null,
            color: data.type == "stroke" ? data.color : null,
            lineWidth: data.type == "stroke" ? data.lineWidth : null,
          },

          timestamp: new Date(),
        });
        await drawingCommand.save();

        const room = await Room.findOne({ roomId: data.roomid });
        if (room) {
            room.lastActivity = new Date();
            console.log(room.drawingData);
            room.drawingData.push(drawingCommand._id);
            await room.save();        }
        
    }
    catch (error) {
        console.error("Error updating room:", error);
        throw error; // Re-throw the error for further handling
    }
};
