class User{
     name;
    room;
    id;

    User(id,name , room ){
        this.name = name;
        this.room = room;
        this.id = id;
    }

    getUser  = ()=>{
        return {
            name,
            room,
            id
        }
    }

}

module.exports = User;