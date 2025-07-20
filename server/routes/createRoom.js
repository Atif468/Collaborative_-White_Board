import express from 'express';
import { createRoom } from '../controllers/createRoom.js';
import { getData } from '../controllers/getData.js';

export const createRoomRoute = express.Router();

createRoomRoute.get("/create", createRoom);
createRoomRoute.get("/:roomId", getData);