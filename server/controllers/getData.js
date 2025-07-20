import { Room } from "../models/room.js";


export const getData = async (req,res) => {
    try {
        const roomId = req.params.roomId;
        const room = await Room.findOne({ roomId: roomId }).populate(
          "drawingData"
        );
        if (!room) {
            res.send({ error: "Room not found" });
        }
        res.send(room.drawingData.reverse()[0]);
    }
    catch (error) {
        console.error("Error fetching room data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
 }