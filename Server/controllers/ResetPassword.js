const User=require("../models/User");
const mailSender=require("../utils/mailSender");
const bcrypt=require("bcryptjs");
const crypto=require("crypto");

//reset Password Token

exports.resetPasswordToken = async (req,res)=>{

    try{

    //Get email from req body
    const email=req.body.email;

    //check user for this email, email validation
    const user= await User.findOne({email:email});

    if(!user){
        return res.json({
            message:"Your email is not registered with us"
        })
    }


    //generate token

    const token=crypto.randomBytes(20).toString("hex");

    //update user by adding token and expiration time

    const updatedDetails = await User.findOneAndUpdate(
        {email:email},
        {
            token:token,
            resetPasswordExpires : Date.now() + 5*60*1000
        },
        {
            new:true
        }
    );

    //create url

    const url=`https://studynotion-frontend-olive-sigma.vercel.app/update-password/${token}`;

    //send mail containing the url
    await mailSender(email,
        "Password Reset Link",
        `Password Reset Link : ${url}`
    )

    //return response
    return res.json({
        success:true,
        message:"Email sent successfully , please check email and change password"
    })

}catch(error){

    console.log(error);
    return res.status(500).json({
        success:false,
        message:"Something went wrong while sending reset Password mail"
    })

}

}




//Reset Password

exports.resetPassword = async(req,res)=>{

    try{

    //Data Fetch
    const {password,confirmPassword,token}=req.body;

    //Validation 
    if(password !== confirmPassword){
        return res.json({
            success:false,
            message:"Password not matching"
        })
    }

    //Get userdetails from db using token
    const userDetails = await User.findOne({token:token});

    //If no entry - invalid token
    if(!userDetails){
        return res.json({
            success:false,
            message:"Token is invalid"
        })
    }

    //Token time check
    if(userDetails.resetPasswordExpires  < Date.now()){

        return res.json({
            success:false,
            message:"Token is Expired , please regenerate your token"
        })

    }

    //hash password

    const hashedPassword = await bcrypt.hash(password,10);

    //password update

    await User.findOneAndUpdate(
        {token:token},
        {password:hashedPassword},
        {new:true}
    )

    //return response

    return res.status(200).json({
        success:true,
        message:"Password Reset Successfully"
    })

}catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"Something went wrong while sending reset password mail"
    })
}



}



