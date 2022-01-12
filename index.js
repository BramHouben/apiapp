const express = require("express");
const { PrismaClient } = require("@prisma/client");
const app = express();
const { v4: uuidv4, v4 } = require("uuid");
const http = require("http");
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

app.get("/album/:id", cors(), async (req, res) => {
  console.log("id req" + req.params.id);
  const data = await prisma.album.findUnique({
    where: {
      id: req.params.id,
    },
    include: {
      songs: true,
    },
  });
  // console.log(data);

  if (data === null) {
    return res.sendStatus(404);
  }

  return res.json(data);
});

app.post("/buyalbum", cors(), async (req, res) => {
  console.log("buysong req" + req.query.id);
  const idBuy = req.query.id;
  if (idBuy === null) {
    return res.sendStatus(404);
  }
  var datetime = new Date();
  const user = await prisma.user.findFirst();
  const albumBuy = await prisma.album.findUnique({
    where: {
      id: idBuy,
    },
  });

  if (albumBuy === null) {
    return res.sendStatus(404);
  }

  await prisma.userSongs.create({
    data: {
      albumId: albumBuy.id,
      itemBought: datetime,
      userId: user.id,
    },
  });
  return res.sendStatus(200);
});

// app.get("/song", cors(), async (req, res) => {
//   console.log("getsongs req");
//   const user = await prisma.user.findFirst();

//   const data = await prisma.userSongs.findMany({ where: { user: user } });

//   return res.json(data);
// });

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

app.get("/album", cors(), async (req, res) => {
  const albums = await prisma.album.findMany({
    include: {
      songs: true, // Return all fields
    },
  });
  return res.json(albums);
});

app.get("/song", cors(), async (req, res) => {
  const song = await prisma.song.findMany();

  return res.json(song);
});

// app.post("/song", cors(), async (req, res) => {
//   console.log("insert song req");
//   const user = await prisma.user.findFirst();

//   const data = await prisma.userSongs.findMany({ where: { user: user } });

//   return res.json(data);
// });

app.get("/users", cors(), async (req, res) => {
  console.log("users req");
  const user = await prisma.user.findMany();

  return res.json(user);
});

app.get("/bought/:id", cors(), async (req, res) => {
  console.log("bought req" + req.params.id);
  const idBuy = req.params.id;
  if (idBuy === null) {
    return res.sendStatus(404);
  }
  const data = await prisma.userSongs.findFirst({
    where: {
      albumId: idBuy,
    },
  });
  console.log(data);
  if (data === null) {
    console.log("data send null");
    return res.json(false);
  }
  console.log("true");

  return res.json(true);
});

// app.delete("/delete", cors(), async (req, res) => {
//   console.log("delete req");

//   await prisma.userSongs.deleteMany();
// });
app.get("/usersongs", cors(), async (req, res) => {
  const song = await prisma.userSongs.findMany();

  return res.json(song);
});
