import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from './iStock-1161435367.jpg';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import logo from './1df796d0170ca6f3e273e22d1b69f4d4.jpg';
const Homepage = () => {
    const navigate = useNavigate();

    const navigateTo = (path) => {
        console.log(`Navigating to ${path}`);
        navigate(path);
    };

    return (
        <div style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center bottom', // Adjusted position to bring the image down slightly
            backgroundAttachment: 'fixed', // Optional: keeps the background fixed during scroll
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <AppBar position="static">
                <Toolbar>
                    <img src={logo} alt="ChatNexus Logo" style={{ height: 40, marginRight: 20 }} />
                    <Typography variant="h5" style={{ flexGrow: 1 }}>
                        ChatNexus
                    </Typography>
                    <Button color="inherit" onClick={() => navigateTo('/login')}>Login</Button>
                    <Button color="inherit" onClick={() => navigateTo('/register')}>Register</Button>
                    <Button color="inherit" onClick={() => navigateTo('/about')}>About Us</Button>
                </Toolbar>
            </AppBar>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    color: 'black',
                    textAlign: 'center',
                    p: 9,
                    
                    // Adds a slight overlay for better text readability
                }}
            >
                <Typography variant="h3" component="h3"sx={{ mb: 2 }}>
                    Welcome to ChatNexus
                </Typography>
                <Typography variant="h6" component="p" sx={{ mb: 2 }}>
                     Your ultimate destination for seamless and secure communication. Connect with friends, family, and colleagues in real-time with our intuitive and user-friendly platform. Join ChatNexus today and stay connected effortlessly!
                </Typography>
                
            </Box>
        </div>
    );
}

export default Homepage;
