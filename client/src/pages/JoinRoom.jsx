import { useState } from "react";
import axios from "axios";

const JoiningRoomComponent = () => {
  const [roomId, setRoomId] = useState("");
  const [loading, setLoading] = useState(false);

  const createRoom = async () => {
    setLoading(true);
    await axios
      .get("https://collaborative-white-board-2.onrender.com/api/room/create")
      .then((res) => {
        window.open(`/whiteboard/${res.data.roomId}`, "_self");
      })
      .catch((err) => {
        console.error("Error creating room:", err);
        alert("Failed to create room. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="w-[350px] bg-white/90 rounded-2xl p-8 flex flex-col gap-6 shadow-2xl border border-gray-200">
      <h1 className="text-2xl font-bold text-center text-blue-700 mb-2 tracking-tight">
        Join a Whiteboard Room
      </h1>
      <input
        onChange={(e) => setRoomId(e.target.value)}
        placeholder="Enter Room ID"
        className="bg-gray-100 w-full p-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 text-base"
        type="text"
        value={roomId}
      />
      <button
        onClick={() => window.open(`/whiteboard/${roomId}`, "_self")}
        className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg shadow transition"
        disabled={!roomId}
      >
        Join Room
      </button>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-px bg-gray-200"></div>
        <span className="text-gray-400 text-xs">or</span>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>
      <button
        onClick={createRoom}
        className="w-full py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold text-lg shadow transition disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create New Room"}
      </button>
      <p className="text-xs text-gray-500 text-center mt-2">
        Enter a room ID to join an existing session, or create a new one.
      </p>
    </div>
  );
};

const JoinRoom = () => {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{
        background:
          "linear-gradient(120deg, #e0e7ff 0%, #f0fdfa 100%)",
      }}
    >
      <div className="flex items-center justify-center w-full h-full py-8">
        <JoiningRoomComponent />
      </div>
    </div>
  );
};

export default JoinRoom;
        