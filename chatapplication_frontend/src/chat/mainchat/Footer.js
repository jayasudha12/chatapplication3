import { Box, Button, IconButton, TextField, Typography, Popover } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useRef } from "react";
import EmojiPicker from 'emoji-picker-react';

const Footer = ({ handleSendMsg, handleSendImage, replyMsg, setReplyMsg }) => {
  const [msg, setMsg] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const inputFileRef = useRef(null);

  const handleChange = (e) => {
    setMsg(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (msg) {
      handleSendMsg(msg);
    }
    setMsg("");
  };

  const handleEmojiClick = (emojiData) => {
    setMsg((prevMsg) => prevMsg + emojiData.emoji);
    setAnchorEl(null); // Close the emoji picker
  };

  const handleEmojiOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEmojiClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleSendImage(file);
    }
  };

  return (
    <Box sx={{ p: 1, display: "flex", position: "relative" }}>
      {replyMsg && (
        <Box
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: "57px",
            background: "#ddd",
            p: 1,
            borderLeft: "4px solid",
            borderColor: "primary.light"
          }}
        >
          <Typography>{replyMsg.sender.name}</Typography>
          <Typography variant="body1">{replyMsg.msg}</Typography>
          <IconButton
            aria-label="close"
            onClick={() => setReplyMsg(null)}
            sx={{ position: "absolute", right: 0, top: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      )}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Button sx={{ minWidth: "auto", mr: 1 }}>
          <MoreVertIcon />
        </Button>
        <Button sx={{ minWidth: "auto", mr: 1 }} onClick={handleEmojiOpen}>
          <InsertEmoticonIcon />
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleEmojiClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </Popover>
        
      </Box>
      <Box sx={{ display: "flex", flex: 1 }} component="form" onSubmit={handleSubmit}>
        <TextField
          placeholder="Type your message here"
          size="small"
          sx={{
            "&.MuiInputBase-root": {
              borderRadius: 0,
              borderRight: 0
            }
          }}
          fullWidth
          value={msg}
          onChange={handleChange}
        />
        <Button type="submit" variant="outlined" sx={{ borderRadius: 0, minWidth: "auto", height: "100%" }}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Footer;
