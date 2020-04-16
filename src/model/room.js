//const User = require("./user");

class Room {

    participants = [];



    addParticipants = (u) =>{
        this.participants.push(u);
    }

    removeParticipant = (u)=>{
     const newList =    this.participants.map(usr=>usr.id !== u.id)
     this.participants = newList;
    }

    getParticipants = ()=>{
        return [...this.participants];
    }



}