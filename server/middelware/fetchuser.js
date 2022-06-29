const jwt=require("jsonwebtoken");

const JWT_SECRETE="rushibhaukijaihojaiho";

const fetchuser=(req,res,next)=>{
    const token=req.header('token');

    if(!token){
        return res.status(401).send("Please Validate Using Valid Token");
    }

    try {
        const data=jwt.verify(token,JWT_SECRETE);
        req.user=data.user;
        next();
    } catch (error) {
        res.status(404).send("Some Internal Server error Occured");
    }
}
module.exports=fetchuser;