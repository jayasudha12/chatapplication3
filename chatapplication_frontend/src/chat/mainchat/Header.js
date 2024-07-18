import { Avatar, Button, Card, CardHeader, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import CallIcon from '@mui/icons-material/Call';


const Header = ({roomData})=>{
    return(
        <Card sx={{borderRadius:0}}
        elevation = {0}>
        <CardHeader
          avatar={
            <>
            <Button sx={{minWidth:"auto",mr:1}}>
          <ArrowBackIcon></ArrowBackIcon>
          </Button>
            <Avatar>
            </Avatar>
            
            </>
          }
          action={
            <>
           
            <IconButton >
            <VideoCallIcon></VideoCallIcon>
            </IconButton>
            <IconButton >
           <CallIcon></CallIcon>
            </IconButton>

            </>
          }
          title={roomData.receiver.name}
          subheader={
            <Typography variant = "caption">{roomData.receiver.email}</Typography>
  }
        />  
      </Card>
    );
};
export default Header;