const express = require("express");
const { PrismaClient } = require("@prisma/client");
const app = express();
const { v4: uuidv4, v4 } = require("uuid");
const http = require("http");
const music = require("./music.json");
const server = http.createServer(app);
const prisma = new PrismaClient();
const cors = require("cors");

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  methods: ["GET", "PUT", "POST"],
};
app.use(express.json());
app.use(cors(corsOptions));

server.listen(4000, () => {
  console.log("listening on *:4000");
});

app.get("/album/:id", (req, res) => {
  console.log("id req");

  return res.json(music[req.params.id]);
});

app.get("/albums", cors(), (req, res) => {
  console.log("albums req");

  return res.json(music);
});

app.post("/buysong", cors(), async (req, res) => {
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

app.get("/getsongs", cors(), async (req, res) => {
  console.log("getsongs req");
  const user = await prisma.user.findFirst();

  const data = await prisma.userSongs.findMany({ where: { user: user } });

  return res.json(data);
});

app.post("/album", cors(), async (req, res) => {
  console.log("insert album req");
  const data = req.body;
  const user = await prisma.album.create({
    data: {
      title: data.title,
      artist: data.artist,
      image: data.image,
      year_released: data.year_released,
      songs: {
        create: data.songs,
      },
    },
    include: {
      songs: true, // Include all posts in the returned object
    },
  });

  return res.json(user);
});

app.get("/getalbum", cors(), async (req, res) => {
  const albums = await prisma.album.findMany({
    include: {
      songs: true, // Return all fields
    },
  });
  return res.json(albums);
});

app.get("/getsong", cors(), async (req, res) => {
  const song = await prisma.song.findMany();

  return res.json(song);
});

app.post("/song", cors(), async (req, res) => {
  console.log("insert song req");
  const user = await prisma.user.findFirst();

  const data = await prisma.userSongs.findMany({ where: { user: user } });

  return res.json(data);
});

app.get("/users", cors(), async (req, res) => {
  console.log("users req");
  const user = await prisma.user.findMany();

  return res.json(user);
});

app.get("/bought", cors(), async (req, res) => {
  console.log("bought req");

  const data = await prisma.userSongs.findFirst();
  return res.json(true);
});
