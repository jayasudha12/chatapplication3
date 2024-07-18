import { Avatar, Box, Chip, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, Stack, Typography } from "@mui/material";
import ReplyIcon from '@mui/icons-material/Reply';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const formatTime = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return "Invalid date";
    }
    return new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    }).format(date);
};

const ChatArea = ({ allMsg, user, handleDelete, replyMsg, setReplyMsg }) => {
    return (
        <Box sx={{ overflowY: "auto", flex: "1 0 0", background: "#f9f9f9" }}>
            <Stack direction="row" justifyContent="center" sx={{ py: 2, position: "sticky", top: 0, zIndex: 2, background: "#f9f9f9" }}>
                <Chip label="Today" />
            </Stack>
            <List sx={{ p: 0, overflowY: "auto", flex: "1 0 0" }}>
                {allMsg.map((item) => (
                    <ListItem key={item._id} sx={item.sender._id === user._id ? { flexDirection: "row-reverse", mb: 2 } : { mb: 2 }}>
                        <Box sx={item.sender._id === user._id ? { display: "flex", width: "80%", flexDirection: "row-reverse" } : { display: "flex", width: "80%" }}>
                            <ListItemAvatar sx={item.sender._id === user._id && { display: "flex", flexDirection: "row-reverse" }}>
                                <Avatar src={item.sender.avatar} />
                            </ListItemAvatar>
                            <Paper sx={item.sender._id === user._id ? { width: "100%", p: 1.5, bgcolor: "primary.light" } : { width: "100%", p: 1.5 }}>
                                {item.replyMsg && (
                                    <Paper sx={item.sender._id !== user._id ? { p: 1.5, mb: 1, bgcolor: "primary.light" } : { p: 1.5, mb: 1 }}>
                                        <ListItemText
                                            sx={item.sender._id !== user._id ? { m: 0, color: "primary.contrastText" } : { m: 0 }}
                                            primary={item.replyMsg.sender.name}
                                            secondary={<Typography component="span" variant="body2">{item.replyMsg.msg}</Typography>}
                                        />
                                    </Paper>
                                )}
                                {item.msg && (
                                    <ListItemText
                                        sx={item.sender._id === user._id ? { m: 0, color: "primary.contrastText" } : { m: 0 }}
                                        primary={item.sender.name}
                                        secondary={<Typography component="span" variant="body2">{item.msg}</Typography>}
                                    />
                                )}
                                {item.image && (
                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                        <img src={item.image} alt="Image" style={{ maxWidth: "100%", maxHeight: "200px" }} />
                                    </Box>
                                )}
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 1 }}>
                                    <Typography variant="body2" sx={item.sender._id === user._id && { color: "primary.contrastText" }}>
                                        {formatTime(item.createdAt)}
                                    </Typography>
                                    <Box>
                                        <IconButton onClick={() => setReplyMsg(item)} size="small">
                                            <ReplyIcon fontSize="small" />
                                        </IconButton>
                                        {item.sender._id === user._id && (
                                            <IconButton size="small" onClick={() => handleDelete(item._id)}>
                                                <DeleteOutlineIcon fontSize="small" />
                                            </IconButton>
                                        )}
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default ChatArea;
