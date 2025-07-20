import { useState } from "react";
import axios from "axios";

const JoiningRoomComponent = () => {
  const [roomId, setRoomId] = useState("");
  const createRoom = async () => {
    await axios
      .get("https://collaborative-whiteboard-ysxd.onrender.com/api/room/create")
      .then((res) => {
        console.log(res.data.roomId);
        window.open(`/whiteboard/${res.data.roomId}`, "_self");
      })
      .catch((err) => {
        console.error("Error creating room:", err);
      });
  };
  return (
    <div className="w-[300px] bg-[#111519] rounded-lg p-4 flex flex-col gap-4">
      <h1 className="text-xl text-center">JOIN ROOM</h1>
      <input
        onChange={(e) => {
          setRoomId(e.target.value);
        }}
        placeholder="enter room ID"
        className="bg-base-200 w-full p-2 px-4 rounded "
        type="text"
      />
      <button
        onClick={() => window.open(`/whiteboard/${roomId}`, "_self")}
        className="btn w-full"
      >
        JOIN
      </button>
      <h1 onClick={createRoom} className="text-sm text-center text-blue-500">
        don't have any room? create one
      </h1>
      
    </div>
  );
};

const JoinRoom = () => {
  const [creating, setCreating] = useState(false);
  return (
    <div className="h-full w-full flex">
      <div className="h-full w-[40%] flex items-center justify-center">
        <JoiningRoomComponent />
      </div>
      <div className="h-full w-[60%]">
        <img
          className="h-full w-full object-cover"
          src="https://cdn.pixabay.com/photo/2016/12/30/19/33/children-1941336_1280.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default JoinRoom;
