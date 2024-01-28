const User = require('../models/User');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const JWT_SECRET = "h@rsh!t";





// create user function for sign up
createUser = async (req, res) => {
    try {
    let newUserObj = await User.findOne({email:req.body.email});
    if(newUserObj){
        return res.status(404).json({success:false,message: "Sorry ! email already exists" })
    }
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password,salt)
             newUserObj = new User({
                name: req.body.name,
                email: req.body.email,
                password: secPassword,
            })
            const newUser = await newUserObj.save();
            const data = {
                user:{
                    id:newUser._id
                }
            }
            // jwt.sign means generate authtoken
            const authToken = jwt.sign(data,JWT_SECRET);
            res.status(200).send({ success:true,message: "User Created !", status: 200,token:authToken })
        } catch (error) {
            console.error(error.message)
            res.status(500).send({ success:false,error:error.message,message:"Internal server error" })
        }
}


// Authenticate the user for user sign in

signInUser = async (req,res)=>{
    try {
     const{email,password} = req.body;
     if(!email || !password){
        return res.status(404).json({success:false,message: "Both email and password required" })
     }
        let user = await User.findOne({email:email});
        if(!user){
            return res.status(404).json({success:false,message: "Please try to login correct creds !" })
        }
        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(404).json({success:false,message: "Please try to login correct creds !" })
        }
        const data = {
            user:{
                id:user._id
            }
        }
        // jwt.sign means generate authtoken
        const authToken = jwt.sign(data,JWT_SECRET);
        res.status(200).send({ success:true,message: "Login IN !", status: 200,token:authToken })
     } catch (error) {
            console.error(error.message)
            res.status(500).send({ error:error.message,message:"Internal server error" })
     }
     
}

loggedUser = async(req,res)=>{
try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.status(200).send({message: "User details !", status: 200,data:user})
} catch (error) {
    console.error(error.message)
    res.status(500).send({ error:error.message,message:"Internal server error" })
}
}

// Get logged in user details via auth token we need to send auth token 


module.exports = { createUser,signInUser,loggedUser }