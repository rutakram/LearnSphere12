const User=require("../models/User");
const OTP=require("../models/OTP");
const otpGenerator=require("otp-generator");
const bcrypt=require("bcryptjs");
const Profile=require("../models/Profile");
const jwt=require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const otpTemplate = require("../mail/templates/emailVerificationTemplate");
require("dotenv").config();


//Send OTP

exports.sendOTP=async(req,res)=>{

    try{

    //Fetch email from request body
    const {email}=req.body;

    //Check if user already exist
    const checkUserPresent=await User.findOne({email});

    //If user exist ,then send response
    if(checkUserPresent){
        return res.status(401).json({
            success:false,
            message:"User Already registered"
        })
    }


    //generate otp
    var otp=otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false
    })

    console.log("OTP Generated : ",otp);

    //check unique otp or not
    const result=await OTP.findOne({otp:otp});

    while(result){
        otp=otpGenerator(6,{
            lowerCaseAlphabets:false,
            upperCaseAlphabets:false,
            specialChars:false,
        })
        result=await OTP.findOne({otp:otp});
    }

    const otpPayload={email,otp};


    //create an entry for OTP

    const otpBody=await OTP.create(otpPayload);
    console.log(otpBody);

    const emailResponse = await mailSender(
        email,
        `Verification Email From StudyNotion`,
        otpTemplate(otp)
    )

    console.log("email---------->",emailResponse);


    res.status(200).json({
        success:true,
        message:"OTP sent successfully",
        otp
    })


}
catch(error){

    console.log(error);
    return res.status(500).json({
        success:false,
        message:error.message
    })


}


}




//SignUp

exports.signUp = async(req,res)=>{

    try{

    //Fetching data from request body
    const{
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        otp
    }=req.body;



    //Validation

    if(!firstName || !lastName || !email || !password 
       || !confirmPassword  ||!otp || !accountType
    ){
        return res.status(403).json({
            success:false,
            message:"All Fields are required"
        })
    }

    //Matching Password

    if(password !== confirmPassword){
        return res.status(400).json({
            success:false,
            message:"Password and confirm Password value does not match"
        })
    }

    //check user already exist or not

    const existingUser=await User.findOne({email});

    if(existingUser){
        return res.status(400).json({
            success:false,
            message:"User is already registered"
        })
    }

    //Find most recent otp stored for user

    const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
    console.log(recentOtp);


    //validate OTP
    if(recentOtp.length == 0){
        return res.status(400).json({
            success:false,
            message:"OTP Not Found"
        })
    }else if(otp !== recentOtp[0].otp){
        //console.log(recentOtp.otp);
        return res.status(400).json({
            success:false,
            message:"Invalid OTP"
        })
    }
    
		// Create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);



    //hash password

    const hashedPassword=await bcrypt.hash(password,10);

    //Create entry in DB

    const profileDetails = await Profile.create({
        gender:null,
        dateOfBirth:null,
        about:null,
        contactNumber:null
    });


   const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType: accountType,
            approved: approved,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        });



    return res.status(200).json({
        success:true,
        message:'User is registered successfully',
        user
    })

}catch(error){

    console.log(error);

    return res.status(500).json({
        success:false,
        message:"User cannot be registered,Please try again"
    })

}


}




//Login

exports.login=async(req,res)=>{

    try{

        //Get data from request body
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All Fields are required, Please try again"
            })
        }

        //Check user exist or not
        const user = await User.findOne({email}).populate("additionalDetails");

        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered , please signup first"
            })
        }


        //generate JWT Token , after password matching
        if(await bcrypt.compare(password,user.password)){

            const payload={
                email:user.email,
                id:user._id,
                accountType:user.accountType
            }

            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h",
            })

            user.token=token;
            user.password=undefined;

            const options={
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true
            }


            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged in successfully"
            });


        }else{

        return res.status(401).json({
            success:false,
            message:"Password is incorrect"
        })
    }

    }catch(error){

        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login Failure, please try again"
        })


    }

}




//changePassword

exports.changePassword=async(req,res)=>{

    try{

        //Get data from request body
        const {email,oldPassword,newPassword,confirmPassword}=req.body;

        //validation

        const user=await User.findOne({email});


        if(await bcrypt.compare(oldPassword,user.password)){

            if(newPassword !== confirmPassword){
                return res.status(400).json({
                    success:false,
                    message:"Password does not match"
                })
            }


    //hash password

    const hashedPassword=await bcrypt.hash(newPassword,10);


    //update in db

    await User.findByIdAndUpdate(
        user._id,
        { $set: { password: hashedPassword } },
        { new: true },
       );



    //Send mail

    try{
    
    const mail=await mailSender(email,'Change in password',"You have successfully change password");
    console.log(mail);

    }catch(error){
        console.log(error);
    }


    //return response

    return res.status(200).json({
        success:true,
        message:"Change in password is successfull"
    })



    }else{
            return res.status(401).json({
                success:false,
                message:"Password is incorrect"
            })
        }


    }catch(error){

        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failure in changing password"
        })

    }


}







