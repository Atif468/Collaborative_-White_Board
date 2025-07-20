import { io } from "socket.io-client";

const socket = io("https://collaborative-whiteboard-ysxd.onrender.com"); // replace with server URL in prod

export default socket;
