const { Router } = require('express')
const fetchuser=require('../middelware/fetchuser')
const User=require('../models/User');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const router=Router();

const JWT_SECRETE="rushibhaukijaihojaiho";

// Creating User : POST request on api/auth/createuser
router.post('/createuser',[
    body('name',"UserName Should be of minimum 3 characters").isLength({min:3}),
    body('email',"Enter The Valid Email").isEmail(),
    body('password',"Password Should be of minimum 5 characters").isLength({min:5}),
],async(req,res)=>{
    const errors = validationResult(req);
    let success=false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    try {
        const {name,email,password}=req.body;
        let user=await User.findOne({email});
        if(user){
            return res.status(409).send({success,msg:"User With This Email aldready Exists"});
        }
        const salt=await bcrypt.genSalt(10);
        const securedPasswaord=await bcrypt.hash(password,salt)
        user=await User.create({name,email,password:securedPasswaord});
        const data={
            user:{
                name:user.name,
                id:user._id,
            }
        }
        const token=jwt.sign(data,JWT_SECRETE);
        res.json({success:true,token});
    } catch (error) {
        res.status(404).send({success,msg:"Some Internal server Error Occured"});
    }
});


// Login User : Post req on api/auth/login
router.post('/login',[
    body('email',"Enter The Valid Email").isEmail(),
    body('password',"Password Should be of minimum 5 characters").isLength({min:5}),
],async(req,res)=>{
    const errors = validationResult(req);
    let success=false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    try {
        const {email,password}=req.body;
        let user=await User.findOne({email});
        if(!user){
            return res.status(401).send({success,msg:"Enter a Valid Credentials"});
        }
        const result=await bcrypt.compare(password,user.password);
        if(!result){
            return res.status(401).send({success,msg:"Enter a Valid Credentials"});
        }
        const data={
            user:{
                name:user.name,
                id:user._id,
            }
        }
        const token=jwt.sign(data,JWT_SECRETE);
        res.json({success:true,token});
    } catch (error) {
        res.status(404).send({success,msg:"Some Internal server Error Occured"});
    }
});

// Get User Details
router.get('/getuserdetails',fetchuser,async(req,res)=>{
    try {
        const user=await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (error) {
        res.status(404).send("Some Internal Server Error Occured");
    }
}); 

// Get USer Details By Id
router.get('/getuserdetails/:id',async(req,res)=>{
    try {
        const user=await User.findById(req.params.id).select("-password");
        res.json(user);
    } catch (error) {
        res.status(404).send("Some Internal Server Error Occured");
    }
})
module.exports=router;