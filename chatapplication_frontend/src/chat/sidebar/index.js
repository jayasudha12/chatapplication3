import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, Tab, Tabs, TextField, Typography } from "@mui/material";
import Header from "./Header";
import React, { Fragment, useState, useEffect } from "react";
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import Badge from '@mui/material/Badge';
import axios from "axios";

const SideBar = ({ user, onlineusers, setroomData, roomData, setallMsg }) => {
  const [value, setValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [onlineTime, setOnlineTime] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      const updatedTime = {};
      onlineusers.forEach((user) => {
        if (user.online) {
          updatedTime[user._id] = calculateOnlineTime(user.lastSeen);
        }
      });
      setOnlineTime(updatedTime);
    }, 1000);
    return () => clearInterval(timer);
  }, [onlineusers]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChatRoom = (user) => {
    setroomData({
      ...roomData,
      room: "test",
      receiver: user,
    });
    axios
      .get(`http://localhost:5001/message/${user._id}`)
      .then((res) => {
        console.log(res);
        setallMsg(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filteredUsers = onlineusers.filter((ele) =>
    ele._id !== user._id &&
    (ele.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ele.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Box sx={{ width: "25vw", display: "flex", flexDirection: "column", height: "100vh", bgcolor:"#f5f5f5"}}>
      <Header user={user} />
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth">
        <Tab icon={<ChatIcon />} fontSize="small" iconPosition="start" label="Chat List" sx={{ minHeight: "inherit" }} />
        <Tab icon={<PersonIcon />} fontSize="medium" iconPosition="start" label="User List" sx={{ minHeight: "inherit" }} />
      </Tabs>
      <TextField
        variant="outlined"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ m: 1 }}
      />
      {value === 0 && (
        <List sx={{ p: 0, overflowY: "auto", flex: "1 0 0" }}>
          {
            filteredUsers.filter((ele) => ele._id !== user._id)
              .map((item) => (
                <Fragment key={item._id}>
                  <ListItem
                    alignItems="flex-start"
                    onClick={() => handleChatRoom(item)}
                  >
                    <ListItemAvatar>
                      <Avatar
                        src="/static/images/avatar/1.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.name}
                      secondary={
                        <Typography variant="caption">{item.email}</Typography>
                      }
                    />
                  </ListItem>
                  <Divider component="li" />
                </Fragment>
              ))}
        </List>
      )}
      {value === 1 && (
        <List sx={{ p: 0, overflowY: "auto", flex: "1 0 0", maxHeight: "calc(100% - 48px)" }}>
          {onlineusers
            .filter((otherUser) => otherUser._id !== user._id) // Exclude current user
            .map((user) => (
              <Fragment key={user._id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      variant="dot"
                      color={user.online ='success'} // Change color based on online status
                    >
                      <Avatar src={user.avatar} />
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={user.name}
                    secondary={user.online = 'Online since 2 minutes'}
                  />
                </ListItem>
                <Divider component="li" />
              </Fragment>
            ))}
        </List>
      )}
    </Box>
  );
};

// Function to calculate online time
const calculateOnlineTime = (lastSeen) => {
  if (!lastSeen) return 'Offline';

  const now = new Date();
  const lastSeenTime = new Date(lastSeen);
  const diff = now.getTime() - lastSeenTime.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m ago`;
  } else if (minutes > 0) {
    return `${minutes}m ago`;
  } else {
    return `${seconds}s ago`;
  }
};

  
  export default SideBar;
  