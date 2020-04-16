const socket = io();

onLoad = ()=>{
    
    const pram = location.search;
    
    const urlParams = new URLSearchParams(pram);
    const name = urlParams.get('nickname');
    const roomId = urlParams.get('roomId')
    
    document.getElementById("room").innerHTML = `${roomId}`

    socket.emit("login",{name,roomId})
}

socket.on("message",(data)=>{
    console.log("joi");
    
    const div = document.createElement('div');

    div.innerHTML = `

    <div class="chat">
          <div class="chatuser">
            <span class="chatusername">${data.name}</span>
            <span class="chattime">2.35 PM</span>
          </div>
          <div class="chatmessage">
            <span>
            ${data.message}
            </span>
          </div>
        </div>

    `

    document.getElementById("chatBody").appendChild(div)

})



// <div class="chat">
//           <div class="chatuser">
//             <span class="chatusername">user name</span>
//             <span class="chattime">2.35 PM</span>
//           </div>
//           <div class="chatmessage">
//             <span>
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
//               debitis officiis magni, quam, itaque eligendi delectus quo numquam
//               nesciunt laborum qui blanditiis beatae laboriosam necessitatibus
//               placeat earum velit. Labore, cumque.
//             </span>
//           </div>
//         </div>