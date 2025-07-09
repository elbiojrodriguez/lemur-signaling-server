const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  socket.on("join", (room) => socket.join(room));

  socket.on("offer", (data) => socket.to(room).emit("offer", data));
  socket.on("answer", (data) => socket.to(room).emit("answer", data));
  socket.on("candidate", (data) => socket.to(room).emit("candidate", data));
});

server.listen(3000, () => {
  console.log("Servidor de sinalização ativo na porta 3000");
});
