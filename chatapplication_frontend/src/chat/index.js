import { Paper } from "@mui/material";
import SideBar from "./sidebar";
import ChatBox from "./mainchat";
import Profile from "./profile";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import axios from "axios";



const PATH = "http://localhost:5001"

const Chat = ()=>{
    const socketRef = useRef();
    const [issocketconnected,setConnected] = useState(false);
    const [onlineusers, setOnlineUsers] = useState([]);
    const [roomData,setroomData] = useState({
        room:null,
        receiver:null,

    })
    const[allMsg,setallMsg] = useState([]);
    const[replyMsg,setReplyMsg] = useState(null);
    const navigate = useNavigate();
    const { state } = useLocation();
    console.log(state);
    useEffect(()=>{
        if(!state) navigate("/login");
        const socket = io.connect(PATH);
        socketRef.current = socket;
        socket.on("connect",()=>setConnected(true))
        socket.off("disconnected",()=>setConnected(false))
    },[])

    useEffect(()=>{
        if(issocketconnected){
            socketRef.current.emit("ADD_USER",state)
            socketRef.current.on("USER_ADDED",(data)=>{
                
                setOnlineUsers(data);
            });


            socketRef.current.on("RECEIVED_MSG", (data) => {
                console.log('RECEIVED_MSG event received:', data, 'from another user');
                setallMsg((prevState) => [...prevState, data]);
            });
            socketRef.current.on("DELETED_MSG", (data) => {
                
              setallMsg((prevState)=>
                    prevState.filter((item)=>item._id != data.msg._id
                   )
              );
            });

            
            return ()=>socketRef.current.disconnect();

            
        }

    },[issocketconnected]);
    const handleSendMsg = (msg) => {
        
        if (socketRef.current.connected) {
            let sender = state;
            sender.socketId = socketRef.current.id;
            const data = {
                msg,
                receiver:roomData.receiver,
                sender,
        };
          if(replyMsg){
            data.replyMsg=replyMsg;
          }
            socketRef.current.emit("SEND_MSG",data);
            // setallMsg((prevState) => [...prevState, data]);
            setReplyMsg(null);
        }
      };
      const handleDelete =(id)=>{

        axios.delete(`http://localhost:5001/message/${id}`)
        .then((res)=>{
         
          if (socketRef.current.connected) {
            const data = {
                msg : res.data.data,
                receiver:roomData.receiver,
                
        }
            socketRef.current.emit("DELETE_MSG",data);
            setallMsg((prevState)=>
                prevState.filter((data)=>data._id != res.data.data._id

                )
          );
            
        }

        })
        .catch((err)=>{
          console.log(err)
        })
    
       }
     

    if (!state) return null;
    console.log(replyMsg)
   
    return(
        <Paper square elevation = {0} sx={{height:"100vh",display:"flex"}}>
            <SideBar user={state} onlineusers={onlineusers} roomData={roomData} setroomData={setroomData}
            setallMsg={setallMsg} />
            <ChatBox roomData={roomData} handleSendMsg={handleSendMsg} 
            allMsg={allMsg} user={state} handleDelete={handleDelete}
            replyMsg={replyMsg}
            setReplyMsg={setReplyMsg}/>
          
            <Profile user={state}/>
            
            


        </Paper>
    );
};
export default Chat;