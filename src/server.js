const express = require("express");
const socket = require("socket.io");
const path = require("path");
const http = require("http");

const app = express();

const server = http.createServer(app);

const publicFolder = path.join(__dirname, "../public");

const io = socket(server);

io.on("connect", (socket) => {
  console.log("new client connected");
});

app.use(express.static(publicFolder));

server.listen(3000, () => {
  console.log("listening on port 3000");
});

app.get("/", (req, res) => {
  res.send("index.html");
});
