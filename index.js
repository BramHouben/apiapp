const express = require("express");
const { PrismaClient } = require("@prisma/client");
const app = express();
const { v4: uuidv4, v4 } = require("uuid");
const http = require("http");
const music = require("./music.json");
const server = http.createServer(app);
const prisma = new PrismaClient();

server.listen(4000, () => {
  console.log("listening on *:4000");
});

app.get("/album/:id", (req, res) => {
  console.log("id req");

  return res.json(music[req.params.id]);
});

app.get("/albums", (req, res) => {
  console.log("albums req");

  return res.json(music);
});

app.post("/buysong", async (req, res) => {
  console.log("buysong req");
  var datetime = new Date();
  const user = await prisma.user.findFirst();

  await prisma.userSongs.create({
    data: {
      songId: uuidv4(),
      itemBought: datetime,
      userId: user.id,
    },
  });
  return res.sendStatus(200);
});

app.get("/getsongs", async (req, res) => {
  console.log("getsongs req");
  const user = await prisma.user.findFirst();

  const data = await prisma.userSongs.findMany({ where: { user: user } });

  return res.json(data);
});
