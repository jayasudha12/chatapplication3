import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Typography,
  Box,
  AppBar,
  Toolbar,
  Avatar,
  IconButton,
  Modal,
  TextField
} from "@mui/material";
import {
  AccountCircle,
  Chat,
  Notifications,
  Backup,
  DataUsage,
  Help,
  PersonAdd,
  QrCode,
  Search
  
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";

const Setting = () => {
  const navigate = useNavigate();
  const [openQRModal, setOpenQRModal] = useState(false); // State to control the QR code modal
  const [openEmailModal, setOpenEmailModal] = useState(false); // State to control the email modal
  const [recipientEmail, setRecipientEmail] = useState(""); // State to store recipient's email address

  // Define a shareable link
  const shareableLink = 'http://localhost:3000/login';

  const handleAgreeAndContinue = () => {
    navigate("/app");
  };

  const handleInviteFriend = () => {
    setOpenQRModal(true); // Open the QR code modal
  };

  const handleCloseQRModal = () => {
    setOpenQRModal(false); // Close the QR code modal
  };

  const handleOpenEmailModal = () => {
    setOpenEmailModal(true); // Open the email modal
  };

  const handleCloseEmailModal = () => {
    setOpenEmailModal(false); // Close the email modal
  };

  const handleSendEmail = () => {
    const templateParams = {
      to_email: recipientEmail,
      message: `You have been invited! Click the link to join: ${shareableLink}`
    };

    emailjs
      .send("service_x1cb5yo", "template_zfcm80e", templateParams,"USER_ID")
      .then(
        response => {
          console.log("SUCCESS!", response.status, response.text);
          setOpenEmailModal(false); // Close the email modal
        },
        err => {
          console.log("FAILED...", err);
        }
      );
  };

  return (
    <div
      style={{
        backgroundImage: `url('https://cdni.iconscout.com/illustration/premium/thumb/messages-and-clipboard-3178496-2670437.png')`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <AppBar position="static">
        <Toolbar>
        <IconButton color="inherit" aria-label="profile">
      <AccountCircle />
    </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Settings
          </Typography>
          <IconButton color="inherit" aria-label="search">
            <Search />
          </IconButton>
          <IconButton color="inherit" aria-label="qr-code">
            <QrCode />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div
        style={{
          maxWidth: "1500px",
          margin: "auto",
          padding: "9px",
          backgroundColor: "rgba(255, 255, 255, 0.7)"
        }}
      >
        <List>
          <ListItem>
            <AccountCircle
              sx={{ width: "40px", height: "40px", marginRight: "10px" }}
            />
            <ListItemText
              primary={<Typography variant="h6">Account</Typography>}
              secondary="Privacy, security, change number. Manage your privacy, security, and change your number easily."
            />
            <Button color="primary">Manage</Button>
          </ListItem>
          <Divider />

          <ListItem>
            <Chat sx={{ width: "40px", height: "40px", marginRight: "10px" }} />
            <ListItemText
              primary={<Typography variant="h6">Chats</Typography>}
              secondary="Backup, history, wallpaper. Backup your conversations, view chat history, and customize wallpapers."
            />
            <Button color="primary">Manage</Button>
          </ListItem>
          <Divider />

          <ListItem>
            <Notifications
              sx={{ width: "40px", height: "40px", marginRight: "10px" }}
            />
            <ListItemText
              primary={<Typography variant="h6">Notifications</Typography>}
              secondary="Message, group & call tones. Control message, group, and call tones for your notifications."
            />
            <Button color="primary">Manage</Button>
          </ListItem>
          <Divider />

          <ListItem>
            <Backup
              sx={{ width: "40px", height: "40px", marginRight: "10px" }}
            />
            <ListItemText
              primary={<Typography variant="h6">Backup</Typography>}
              secondary="History, data backup. Safeguard your data with history and data backup options."
            />
            <Button color="primary">Manage</Button>
          </ListItem>
          <Divider />

          <ListItem>
            <DataUsage
              sx={{ width: "40px", height: "40px", marginRight: "10px" }}
            />
            <ListItemText
              primary={<Typography variant="h6">Data and storage usage</Typography>}
              secondary="Network usage, auto-download. Monitor your network usage and manage auto-download settings."
            />
            <Button color="primary">Manage</Button>
          </ListItem>
          <Divider />

          <ListItem>
            <Help sx={{ width: "40px", height: "40px", marginRight: "10px" }} />
            <ListItemText
              primary={<Typography variant="h6">Help</Typography>}
              secondary="FAQ, contact us, privacy policy. Access frequently asked questions, contact support, and view privacy policy."
            />
            <Button color="primary">Manage</Button>
          </ListItem>
          <Divider />

          <ListItem>
            <PersonAdd
              sx={{ width: "40px", height: "40px", marginRight: "10px" }}
            />
            <ListItemText
              primary={<Typography variant="h6">Invite a friend</Typography>}
              secondary="Share the app and enjoy it together with friends."
            />
            <Button color="primary" onClick={handleInviteFriend}>
              Invite
            </Button>
          </ListItem>
        </List>

        {/* "Agree and continue" button */}
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "5px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAgreeAndContinue}
          >
            Agree and continue
          </Button>
        </Box>
      </div>

      {/* Modal to display QR code */}
      <Modal
        open={openQRModal}
        onClose={handleCloseQRModal}
        aria-labelledby="qr-code-modal"
        aria-describedby="qr-code-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            maxWidth: "80vw",
            maxHeight: "80vh"
          }}
        >
          <Button variant="contained" color="primary" onClick={handleOpenEmailModal}>
            Send via Email
          </Button>
          <br />
          <br />
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
              shareableLink
            )}&size=200x200`}
            alt="QR Code"
          />
        </Box>
      </Modal>

      {/* Modal to enter recipient's email address */}
      <Modal
        open={openEmailModal}
        onClose={handleCloseEmailModal}
        aria-labelledby="email-modal"
        aria-describedby="email-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            maxWidth: "80vw",
            maxHeight: "80vh"
          }}
        >
          <Typography variant="h6">Enter recipient's email address</Typography>
          <TextField
            label="Email"
            variant="outlined"
            value={recipientEmail}
            onChange={e => setRecipientEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleSendEmail}>
            Send
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Setting;
