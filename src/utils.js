const users  = [];


joinUser = (id,name,room)=>{
const user = {id,name,room}
users.push(user);
return user;
}  