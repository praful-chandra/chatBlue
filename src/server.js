const express = require("express");
const socket = require("socket.io");
const path = require("path");
const http = require("http");

const app = express();

const server = http.createServer(app);

const publicFolder = path.join(__dirname, "../public");

const io = socket(server);


const {joinUser} = require("./utils");

const formtMsg = (name , message) =>{
  return {
    name ,
    message
  }
}

const rooms = [];

io.on("connection", (socket) => {
 socket.on("login",(member)=>{
 
  socket.emit("message",formtMsg("BOT","welcome to chatapp"))

  const user = joinUser(socket.id,member.name,member.roomId);


  console.log(user);
  

  socket.join(user.roomId);

 socket.broadcast.to(user.room).emit("message",formtMsg("BOT",`${user.name} has joined`))
   
 })


 socket.on('disconnect',(socket)=>{
  socket.broadcast.to(user.roomId).emit("message",formtMsg("BOT",`${user.name} has Left`))
 })
  

});

app.use(express.static(publicFolder));

server.listen(3000, () => {
  console.log("listening on port 3000");
});

app.get("/", (req, res) => {
  res.send("index.html");
});
