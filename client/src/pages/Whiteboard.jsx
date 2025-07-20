import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import socket from "../utils/socket";
import { LuEraser } from "react-icons/lu";
import { IoBrushOutline, IoPencilOutline } from "react-icons/io5";
import { RingLoader } from "react-spinners";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WhiteBoard = () => {
  const { roomid } = useParams();
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const presetColors = [
    "#000000",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#FFA500",
    "#800080",
    "#FFC0CB",
    "#A52A2A",
    "#808080",
    "#000080",
    "#008000",
    "#800000",
  ];
  const shareModalRef = useRef(null);

  // socekt.io connection
  useEffect(() => {
    if (roomid) {
      socket.emit("join-room", roomid);
      console.log(`Joined room: ${roomid}`);
    }

    socket.on("user-joined", (userId) => {
      console.log(`➕🧸 ${userId}`);
    });

    socket.on("receive-drawing", (data) => {
      const savedImage = data.data;
      const image = new Image();
      image.onload = () => contextRef.current.drawImage(image, 0, 0);
      image.src = savedImage;
    });

    socket.on("clear-canvas", () => {
      contextRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const [loading, setLoading] = useState(false);
  const sendInviteEmail = async () => {
    try {
      setLoading(true);
      const res = await axios.post("https://collaborative-white-board-2.onrender.com/api/send-mail", {
        email: inviteEmail,
        roomid,
      });
      
      setLoading(false);
      toast.success("Invite sent!");
      setInviteEmail("");
      setShowShareModal(false);
    } catch (error) {
      console.error("Failed to send invite:", error);
      toast.error("Failed to send invite.");
    }
  };

  const getImage = async () => {
    await axios
      .get(`https://collaborative-white-board-2.onrender.com/api/room/${roomid}`)
      .then((res) => {
        setIsLoading(false);
        if (res.data?.error == "Room not found") {
          toast.error("Room not found");
          window.open("/", "_self");
        } else {
          const savedImage = res.data.data.image;
          const image = new Image();
          image.onload = () => contextRef.current.drawImage(image, 0, 0);
          image.src = savedImage;
        }
      })
      .catch((err) => {
        console.log("Error fetching image:", err);
        // toast.error("Error fetching image");
      });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    contextRef.current = context;
    getImage();
  }, []);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = color;
      contextRef.current.lineWidth = lineWidth;
    }
  }, [color, lineWidth]);

  const sendData = () => {
    const image = canvasRef.current.toDataURL();
    socket.emit("send-drawing", {
      roomid: roomid,
      type: "stroke",
      data: image,
      color,
      lineWidth,
    });
    console.log("✅ Data sent");
  };

  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const stopDrawing = (e) => {
    contextRef.current.closePath();
    setIsDrawing(false);
    sendData();
  };

  const clearCanvas = () => {
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    socket.emit("clear", {
      roomid: roomid,
      type: "clear",
    });
  };

  useEffect(() => {
    if (!showShareModal) return;
    const handleClick = (e) => {
      if (
        shareModalRef.current &&
        !shareModalRef.current.contains(e.target)
      ) {
        setShowShareModal(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showShareModal]);

  return (
    <div className="h-screen flex flex-col bg-[#f7f8fa]">
      <ToastContainer position="bottom-right" autoClose={2500} />
      {isLoading && (
        <div className="absolute top-0 left-0 z-10 bg-white w-screen h-screen flex items-center justify-center">
          <RingLoader size={80} className="text-black" color="" />
        </div>
      )}
      <div className="flex h-[72px] w-full items-center gap-6 bg-white px-8 shadow-sm border-b">
        <div className="flex items-center gap-2">
          <IoPencilOutline color="#222" size={22} />
          <span className="text-[#222] font-semibold text-lg">Whiteboard</span>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-[#444] text-sm">Size</label>
          <input
            className="slider h-2 rounded-lg appearance-none cursor-pointer"
            type="range"
            min="1"
            max="20"
            value={lineWidth}
            onChange={(e) => setLineWidth(e.target.value)}
            style={{
              width: 120,
              background: `linear-gradient(to right, ${color} ${
                lineWidth * 5
              }%, #e5e7eb ${lineWidth * 5}%)`,
            }}
          />
          <span className="text-xs text-gray-500">{lineWidth}px</span>
        </div>
        <div className="flex gap-2 items-center ml-6">
          {presetColors.map((c) => (
            <button
              className={`h-6 w-6 rounded-full border-2 ${
                color === c ? "border-black" : "border-white"
              } shadow`}
              key={c}
              onClick={() => setColor(c)}
              style={{
                backgroundColor: c,
                cursor: "pointer",
                outline: "none",
                transition: "border 0.2s",
              }}
            ></button>
          ))}
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-7 h-7 rounded-full border-none p-0 cursor-pointer"
            style={{ background: "none" }}
          />
        </div>
        <button
          className="ml-auto flex items-center gap-2 px-5 py-2 rounded bg-[#EF4444] text-white font-medium hover:bg-[#dc2626] transition border-none shadow"
          onClick={clearCanvas}
        >
          <LuEraser size={18} /> Clear
        </button>
        <button
          className="ml-4 flex items-center gap-2 px-5 py-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 transition border-none shadow"
          onClick={() => setShowShareModal(true)}
        >
          📤 Share
        </button>
      </div>
      {showShareModal && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black/20">
          <div
            ref={shareModalRef}
            className="bg-neutral-950 p-4 sm:p-6 rounded-xl shadow-md w-[95vw] max-w-[400px] flex flex-col gap-4"
          >
            <h2 className="text-lg font-semibold text-white">Share Whiteboard</h2>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <input
                type="text"
                value={`${window.location.origin}/whiteboard/${roomid}`}
                readOnly
                className="flex-1 border px-3 py-1 rounded text-sm break-all"
              />
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${window.location.origin}/${roomid}`
                  );
                  toast.success("Link copied!");
                }}
                className="px-3 py-1 bg-green-500 rounded hover:bg-black text-white text-sm transition"
              >
                Copy
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendInviteEmail();
              }}
              className="flex flex-col gap-2"
            >
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="Enter email to invite"
                required
                className="border px-3 py-2 rounded text-sm"
              />
              <button
                type="submit"
                className="bg-green-600 text-white py-2 rounded hover:bg-green-700 text-sm"
              >
                {loading ? "Sending.." : "Send Invite" }
              </button>
            </form>
            <button
              onClick={() => setShowShareModal(false)}
              className="text-sm text-gray-400 hover:underline mt-2 self-end"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <div className="flex-1 bg-[#e5e7eb] flex items-center justify-center relative px-2 sm:px-0">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="w-full max-w-[1000px] h-[50vh] sm:h-[600px] bg-white rounded-2xl shadow-lg outline-none"
          style={{
            maxWidth: "100vw",
            minHeight: "300px",
            cursor: `url('data:image/svg+xml;utf8,<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 26.586V30h3.414L24.707 10.707l-3.414-3.414L2 26.586zM28.293 7.707c.39-.39.39-1.024 0-1.414l-2.586-2.586a1 1 0 00-1.414 0l-2.121 2.121 4 4 2.121-2.121z" fill="black"/></svg>') 0 32, auto`,
          }}
        />
      </div>
    </div>
  );
};

export default WhiteBoard;