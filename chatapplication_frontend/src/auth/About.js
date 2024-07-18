import React from 'react';
import { Box, Container, Typography, Paper, Grid, Avatar, Divider, Button } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import imgo from "./image2.avif";
import img2 from "./img4.webp";

const About = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', py: 4 }}>
      <Container maxWidth={false} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Paper elevation={6} sx={{ p: 4, borderRadius: 4, maxWidth: '1200px', width: '100%', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', backgroundColor: '#fff' }}>
          <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            About Us
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1" paragraph align="center" sx={{ fontSize: '1.1rem', color: 'text.secondary', textAlign: 'justify' }}>
            Welcome to ChatApp, your go-to solution for seamless and secure communication. This platform provides robust real-time messaging, media sharing, and numerous features to keep you connected with friends, family, and colleagues.
          </Typography>
          
          <Grid container spacing={4} sx={{ my: 4 }}>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={imgo}
                alt="Our Story"
                sx={{ width: '100%', height: 'auto', borderRadius: 2, boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}
              />
            </Grid>
            <Grid item xs={12} md={6} display="flex" flexDirection="column" justifyContent="center">
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.dark', textAlign: 'justify' }}>
                Our Story
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', color: 'text.secondary', textAlign: 'justify' }}>
                ChatApp was found to  recognize the need for a secure and user-friendly messaging platform. Starting as a small team, the goal was to create a product that prioritizes user experience and security.
                <br /><br />
                Over the years, we have grown into a dedicated team of professionals, continuously striving to enhance our services. Our journey is marked by constant learning and adaptation, ensuring that we remain at the forefront of communication technology.
                <br /><br />
                With a focus on innovation, we have introduced features that cater to the diverse needs of our users, making ChatApp a reliable and versatile platform for personal and professional communication.
              </Typography>
            </Grid>
          </Grid>
          
          <Grid container spacing={4} sx={{ my: 4 }}>
            <Grid item xs={12} md={6} display="flex" flexDirection="column" justifyContent="center">
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.dark', textAlign: 'justify' }}>
                Our Mission
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', color: 'text.secondary', textAlign: 'justify' }}>
                Our mission is to revolutionize communication by providing a reliable, fast, and secure messaging platform. We are committed to continuous improvement and innovation to meet the evolving needs of our users.
                <br /><br />
                We believe in the power of communication to bring people together, foster collaboration, and drive progress. By prioritizing user experience and security, we aim to build a platform that users can trust and rely on for their communication needs.
                <br /><br />
                Our team is dedicated to creating a product that not only meets but exceeds the expectations of our users, ensuring a seamless and enjoyable communication experience.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={img2}
                alt="Our Mission"
                sx={{ width: '100%', height: 'auto', borderRadius: 2, boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}
              />
            </Grid>
          </Grid>
          
          <Grid container spacing={4} sx={{ my: 4 }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ bgcolor: '#fff', p: 3, borderRadius: 4, boxShadow: '0 4px 8px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: 'primary.main', mb: 2 }}>
                  <SecurityIcon />
                </Avatar>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.dark', textAlign: 'center' }}>
                  Secure
                </Typography>
                <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', color: 'text.secondary', textAlign: 'justify' }}>
                  With state-of-the-art encryption, ChatApp ensures that messages and data remain private and secure.
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box sx={{ bgcolor: '#fff', p: 3, borderRadius: 4, boxShadow: '0 4px 8px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: 'primary.main', mb: 2 }}>
                  <SpeedIcon />
                </Avatar>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.dark', textAlign: 'center' }}>
                  Fast
                </Typography>
                <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', color: 'text.secondary', textAlign: 'justify' }}>
                  Experience real-time messaging and media sharing without delays, no matter where you are in the world.
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              
              <Box sx={{ bgcolor: '#fff', p: 3, borderRadius: 4, boxShadow: '0 4px 8px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: 'primary.main', mb: 2 }}>
                  <PeopleIcon />
                </Avatar>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.dark', textAlign: 'center' }}>
                  Connected
                </Typography>
                <Typography variant="body1" paragraph sx={{ fontSize: '1.0rem', color: 'text.secondary', textAlign: 'justify' }}>
                  Stay connected with friends, family, and colleagues across the globe. ChatApp ensures seamless communication everytime.
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button variant="contained" color="primary" startIcon={<HomeIcon />} onClick={handleGoHome}>
              Let's Explore Chatapp
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default About;

