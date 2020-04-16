const users  = [];


joinUser = (id,name,room)=>{
const user = {id,name,room}
users.push(user);
return user;
}  

getUser = id=>{

    return users.find(u=>u.id === id);
}

exitUser = (id)=>{
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
      return users.splice(index, 1)[0];
    }
}

module.exports={
    joinUser,
    getUser,
    exitUser
}