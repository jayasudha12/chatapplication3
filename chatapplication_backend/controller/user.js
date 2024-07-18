const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
router.post("/login",async(req,res)=>{
    try{
       const{email,password}  = req.body;
       const user = await User.findOne({email})
       if(!user) return res.status(400).send({msg:"User not found"});
       const matchpassword = await bcrypt.compare(password,user.password)
       if(!matchpassword)return  res.status(400).send({msg:"Password does not match"});
       console.log({user});
       const token = jwt.sign({
        _id: user._id,
        name:user.name,
        email:user.email,
       },"shhhhh",{ expiresIn: '1d' }
    );
     return res.status(200).send({
        data:{token},
        msg : "Fetch user", });
    }
    catch(error){
        res.status(400).send({msg:"Internal Server Error"});
      }
});
router.post("/register",async(req,res)=>{
  try{
    const {name,email,password} = req.body;
    const userExist = await User.findOne({email});
    if(userExist) return res.status(400).send({msg:"Email already exists"});
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);
    const user = new User({name,email,password:hash});
    await user.save();
    const token = jwt.sign({
        _id: user._id,
        name:user.name,
        email:user.email,
       },"shhhhh",{ expiresIn: '1d' }
    );
    return res.status(200).send({
      data:{token},
      msg : "user created successfully", });
  
    
  }
  catch(error){
    res.status(400).send({msg:"Internal Server Error"});
  }

});
router.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token) return res.status(400).send({ msg: "Token is required" });

    let decoded;
    try {
      decoded = jwt.verify(token, "resetSecretKey");
    } catch (error) {
      return res.status(400).send({ msg: "Invalid or expired token" });
    }

    const user = await User.findById(decoded._id);
    if (!user) return res.status(400).send({ msg: "User not found" });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    user.password = hash;
    await user.save();

    res.status(200).send({ msg: "Password has been reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});



module.exports = router;
