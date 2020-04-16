const express = require("express");
const socket = require("socket.io");
const path = require("path");
const http = require("http");

const app = express();

const server = http.createServer(app);

const publicFolder = path.join(__dirname, "../public");

const io = socket(server);

const { joinUser,getUser,exitUser ,getRoomUsers} = require("./utils");

const formtMsg = (name, message) => {
  return {
    name,
    message,
    
  };
};


io.on("connection", (socket) => {
  socket.on("login", (member) => {
    
    socket.emit("message", formtMsg("BOT", "welcome to chatapp"));

    const user = joinUser(socket.id, member.name, member.roomId);

    socket.join(user.room);
    socket.broadcast
      .to(user.room)
      .emit("message", formtMsg("BOT", `${user.name} has joined`));

    
      io.to(user.room).emit("members",getRoomUsers(user.room))

  });

  socket.on("send",(message)=>{
    const user = getUser(socket.id);
    
    io.to(user.room).emit("message",formtMsg(user.name,message))
   
  })

  socket.on('disconnect',()=>{
    const user = exitUser(socket.id);
    if(user){
      io.to(user.room).emit("message",formtMsg("BOT", `${user.name} has Left`))
   
      
      io.to(user.room).emit("members",getRoomUsers(user.room))
    }
    

  })
  
});

app.use(express.static(publicFolder));

const port = process.env.PORT || 3000
server.listen(port, () => {
  console.log("listening on port 3000");
});

app.get("/", (req, res) => {
  res.send("index.html");
});
