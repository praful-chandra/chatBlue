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

  const chatBody = document.getElementById("chatBody");
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
});

sendMsg = () => {
  const message = document.getElementById("message");
  socket.emit("send", message.value);
  message.value = "";
  message.focus();
};

addToMembers = (data) => {

  let div = "";

  data.map((usr) => {
    
    div += `
    <div class="loggedUser">
    <div class="loggedUserIcon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="50rem"
        fill="white"
      >
        <path
          d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z"
        />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    </div>
    <div class="loggedUserName">
      ${usr.name}
    </div>
    </div> `;
    

  });

  const loggedInUsers =   document.getElementById("loggedInUsers");

loggedInUsers.innerHTML = div;

};

socket.on("members", (data) => {
  
  addToMembers(data);
});
