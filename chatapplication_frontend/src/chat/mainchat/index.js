import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import Header from "./Header";
import ChatArea from "./ChatArea";
import Footer from "./Footer";
import Navbar from "./Navbar";
import logo from "./G03.jpg";


const ChatBox = ({ roomData, handleSendMsg, allMsg, user, handleDelete, replyMsg, setReplyMsg, onlineUsers }) => {
    const [notificationCount, setNotificationCount] = useState(0);
    const [unreadMessages, setUnreadMessages] = useState([]);
    const handleSendImage = (file) => {
        console.log("Image file:", file);
      };
    useEffect(() => {
        if (!roomData.room && onlineUsers && onlineUsers.length > 0) {
            const otherUsers = onlineUsers.filter(onlineUser => onlineUser !== user.name);
            if (otherUsers.length > 0) {
                setNotificationCount(otherUsers.length);
                setUnreadMessages(prev => [...prev, ...otherUsers.map(onlineUser => `${onlineUser} is online`)]);
            }
        }
    }, [onlineUsers, user.name, roomData.room]);

    useEffect(() => {
        if (allMsg && allMsg.length > 0) {
            const lastMsg = allMsg[allMsg.length - 1];
            if (lastMsg.sender !== user.name) {
                setUnreadMessages(prev => [...prev, lastMsg]);
                setNotificationCount(prev => prev + 1);
            }
        }
    }, [allMsg, user.name]);

    const handleSendMessage = (message) => {
        handleSendMsg(message);
        setUnreadMessages([]);
        setNotificationCount(0);
    };

    const handleClearNotifications = () => {
        setNotificationCount(0);
        setUnreadMessages([]);
    };

    return (
        <Box sx={{ width: "50vw", display: "flex", height: "100%", flexDirection: "column" }}>
            {!roomData.room && (
                <Navbar notificationCount={notificationCount} clearNotifications={handleClearNotifications} />
            )}
            {roomData.room ? (
                <>
                    <Header roomData={roomData} allMsg={allMsg} user={user} />
                    <ChatArea allMsg={allMsg} user={user} handleDelete={handleDelete} replyMsg={replyMsg} setReplyMsg={setReplyMsg} />
                    <Footer replyMsg={replyMsg} handleSendMsg={handleSendMessage} handleSendImage={handleSendImage} setReplyMsg={setReplyMsg} />
                </>
            ) : (
                <img src={logo} alt="Select a user to chat" />
            )}
        </Box>
    );
};

export default ChatBox;
