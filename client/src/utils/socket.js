import { io } from "socket.io-client";

const socket = io("https://collaborative-white-board-2.onrender.com"); // replace with server URL in prod

export default socket;
