# 🧑‍🎨 Collaborative Whiteboard

A real-time collaborative whiteboard built with **React**, **Socket.IO**, **Express**, and **MongoDB**. Users can join rooms, draw together live, and persist whiteboard sessions.

---

## 🚀 Features

- 🎨 Live drawing with others in real-time
- 📦 Rooms with unique IDs
- 🖌️ Pencil tool with adjustable stroke width and color
- 🔄 Canvas sync using Socket.IO
- 💾 MongoDB persistence (drawing history saved)
- 🧹 Clear canvas option
- 📱 Responsive UI

---

## 📂 Project Structure

collaborative-whiteboard/
│
├── client/ # React frontend
│ ├── components/ # Canvas, UI controls
│ ├── App.jsx
│ └── main.jsx
│
├── server/ # Node.js backend
│ ├── models/ # Mongoose schemas (Room, DrawingCommand)
│ ├── routes/ # Room-related API routes
│ ├── socket.js # Socket.IO logic
│ └── server.js # Entry point
│
└── README.md


---

## ⚙️ Tech Stack

- Frontend: **React**, **Tailwind CSS**
- Backend: **Express.js**, **Socket.IO**
- Database: **MongoDB** with **Mongoose**
- Realtime: **WebSockets (Socket.IO)**

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/ayush-singh09/collaborative-whiteboard.git
cd collaborative-whiteboard
cd server
npm install
```
## Create a .env file:
```ini
npm run dev
```

## Setup Client

```bash
cd ../client
npm install
npm run dev
```

### The app will run at: http://localhost:5173
### Backend runs at: http://localhost:5000

## 🔌 Socket Events

### 📤 Client → Server

- `join-room` — join a room by roomId
    
- `drawing` — send canvas stroke data
    
- `clear-canvas` — request to clear whiteboard
    

### 📥 Server → Client

- `drawing` — broadcast drawing to other clients
    
- `user-joined` — notify when someone joins
    
- `clear-canvas` — clear canvas across all users

# 📘 API Endpoints  

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| POST   | `/api/rooms`     | Create a new room |
| GET    | `/api/rooms/:id` | Get room by ID    |

## 📌 Todos & Improvements

- ✅ Drawing sync via sockets
    
- ✅ Room creation + persistence
    
- 🔲 Usernames in room
    
- 🔲 Show user list
    
- 🔲 Export drawing as image
    
- 🔲 Whiteboard chat feature
    

---

## 🤝 Contributing

Feel free to open issues or submit pull requests!  
Star ⭐ this repo if you find it useful.