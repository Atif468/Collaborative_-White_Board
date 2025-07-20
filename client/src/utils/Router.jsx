import { Route, Routes } from "react-router-dom";
import JoinRoom from "../pages/JoinRoom";
import Whiteboard from "../pages/Whiteboard";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<JoinRoom />} />
      <Route path="/whiteboard/:roomid" element={<Whiteboard />} />
    </Routes>
  );
};

export default Router;
