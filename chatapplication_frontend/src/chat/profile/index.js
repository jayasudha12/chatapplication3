import { Avatar, Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Profile =({user})=>{
  const navigate = useNavigate();
  const logOut = ()=>{
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    
    navigate("/");
  }
    return (
       <Box sx={{background:"#f5f5f5",width:"25vw",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
         <Avatar  src="/static/images/avatar/1.jpg" sx={{width:"156px",height:"150px"}}>
         </Avatar>
      
    <Typography variant ="h5" fontFamily="sans-serif" sx={{textTransform:"uppercase",color:"primary.light"}}>
      {user.name}
    </Typography>
    <Typography variant="subtitle1">{user.email}</Typography>
    
    <Button onClick={logOut} variant="contained" sx={{ mt: 2 }}>Logout</Button>

    
    </Box>
    );
};
export default Profile;