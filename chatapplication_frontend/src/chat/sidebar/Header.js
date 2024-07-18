// Header.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Card, CardHeader, IconButton, Typography, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Header = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSettingsClick = () => {
    handleMenuClose();
    navigate("/settings");
  };

  return (
    <Card
      sx={{
        bgcolor: "primary.light",
        borderRadius: 0,
        color: "primary.contrastText",
      }}
    >
      <CardHeader
        avatar={<Avatar />}
        action={
          <div>
            <IconButton
              aria-label="settings"
              sx={{ color: "primary.contrastText" }}
              onClick={handleMenuClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleSettingsClick}>Settings</MenuItem>
              
              {/* Add more menu items as needed */}
            </Menu>
          </div>
        }
        title={user.name}
        subheader={
          <Typography variant="caption" fontSize="14px">
            {user.email}
          </Typography>
        }
      />
    </Card>
  );
};

export default Header;
