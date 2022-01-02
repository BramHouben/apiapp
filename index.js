const express = require("express");
const app = express();
const http = require("http");
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

app.get("/product", (req, res) => {
  return res.json({ product: { id: 1, desc: "prod1", price: 165 } });
});
