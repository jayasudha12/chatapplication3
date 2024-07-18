
import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, Box, Button } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Navbar = ({ notificationCount, clearNotifications }) => {
    return (
        <AppBar position="static" sx={{ backgroundColor: 'white' }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1 }} />
                <IconButton color="black">
                    <Badge badgeContent={notificationCount} color="primary">

                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                {notificationCount > 0 && (
                    <Button style={{color: "black"}} onClick={clearNotifications}>
                        Clear Notifications
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;

