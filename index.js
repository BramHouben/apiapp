const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const fs = require("fs");
const music = require("./music.json");
// const https = require("https");
const server = http.createServer(app);

// const { Server } = require("socket.io");
// const io = new Server(server);

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

// io.on("connection", (socket) => {
//   console.log("a user connected");
// });
server.listen(4000, () => {
  console.log("listening on *:4000");
});

app.get("/song/:id", (req, res) => {
  return res.json(music[req.params.id]);
});

app.get("/songs", (req, res) => {
  return res.json(music);
});
