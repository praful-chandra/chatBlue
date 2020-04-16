const socket = io();

onLoad = () => {
  const pram = location.search;

  const urlParams = new URLSearchParams(pram);
  const name = urlParams.get("nickname");
  const roomId = urlParams.get("roomId");

  document.getElementById("room").innerHTML = `${roomId}`;

  socket.emit("login", { name, roomId });
};

socket.on("message", (data) => {
  console.log("joi");

  const div = document.createElement("div");

  div.innerHTML = `

    <div class="chat">
          <div class="chatuser">
            <span class="chatusername">${data.name}</span>
          </div>
          <div class="chatmessage">
            ${data.message}
          </div>
        </div>

    `;

  document.getElementById("chatBody").appendChild(div);
});


sendMsg = ()=>{
  const message = document.getElementById('message');
  socket.emit("send",message.value);
  message.value = "";
  message.focus()
}