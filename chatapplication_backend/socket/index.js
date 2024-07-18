const socket = require("socket.io");
const { saveMsg } = require("../controller/message");
const onlineusers = [];
const adduser = (user,socketId)=>{
    
        const isExist = onlineusers.findIndex((item) => item._id === user._id);
        if (isExist !== -1) {
          onlineusers.splice(isExist, 1);
        }
        user.socketId = socketId;
        onlineusers.push(user);
    
}
const removeUser = (socketId)=>{
    const isExist = onlineusers.findIndex((item) => item.socketId === socketId);
    if(isExist !== -1){
        onlineusers.splice(isExist,1)
    }

}
const socketInit = (server)=>{
    const io = socket(server,{
        cors:{
            origin:"http://localhost:3000"
        },
    });
    io.on("connection",(socket)=>{
        console.log(socket.id);
        socket.on("ADD_USER",(user)=>{
            adduser(user,socket.id);
            io.emit("USER_ADDED",onlineusers);
        })
        socket.on("SEND_MSG",async(msg)=>{
            console.log(msg,"MSG FROM FRONTEND");
            const isSaved = await saveMsg(msg);
            io
            .to(msg.receiver.socketId)
            .to(msg.sender.socketId)
            .emit("RECEIVED_MSG",isSaved)
        })

        socket.on("DELETE_MSG",(msg)=>{
            socket.to(msg.receiver.socketId).emit("DELETED_MSG",msg)
        })

        socket.on("disconnect",()=>{
            removeUser(socket.id);
            io.emit("USER_ADDED",onlineusers);
        })
    })
}
module.exports = socketInit;