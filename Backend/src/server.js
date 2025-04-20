const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
require('dotenv').config();
const cors = require("cors");
const app = express(); // ✅ Define app early

const http = require("http").createServer(app); // ✅ Attach express app to http server
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// API ROUTES
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

// SOCKET.IO Handling
const users = {}; // { username: socket.id }

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("join", (username) => {
    users[username] = socket.id;
    console.log(`${username} connected with socket ID ${socket.id}`);
  });

  socket.on("group-message", (data) => {
    io.emit("group-message", data);
  });

  socket.on("private-message", ({ from, to, text }) => {
    const toSocketId = users[to];
    if (toSocketId) {
      io.to(toSocketId).emit("private-message", { from, text });
    }
  });



 socket.on("group-file", (data) => {
  io.emit("group-file", data);
});


socket.on("private-file", ({ from, to, file, fileName, fileType }) => {
  const toSocketId = users[to];
  if (toSocketId) {
    io.to(toSocketId).emit("private-file", { from, file, fileName, fileType });
  }
});
  

  socket.on("disconnect", () => {
    for (const [user, id] of Object.entries(users)) {
      if (id === socket.id) {
        delete users[user];
        break;
      }
    }
    console.log("Client disconnected");
  });
});

// Start the server
const port = 3000;
http.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
