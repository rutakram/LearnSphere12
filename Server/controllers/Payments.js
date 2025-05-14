const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const mongoose = require("mongoose");
const crypto = require("crypto");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
const CourseProgress = require("../models/CourseProgress");


//intitate the razorapy order
exports.capturePayment  = async(req,res)=>{

    const {courses} = req.body;
    const userId = req.user.id;

    
    if(courses.length === 0 ){
        return res.json({
            success:false,
            message:"Please provide Course Id"
        });
    }

    let totalAmount = 0;

    for(const course_id of courses){
        
        let course;

        try{
            console.log("course---->",course_id);
            course = await Course.findById(course_id);

           // console.log("After--->");

            if(!course){
                return res.status(200).json({
                    success:false,
                    message:"Could not find the course"
                })
            }

            const uid = new mongoose.Types.ObjectId(userId);
            console.log("uuser----->",uid);

            if(course.studentsEnrolled.includes(uid)){
                return res.status(200).json({
                    success:false,
                    message:"Student is already enrolled"
                })
            }

            totalAmount += course.price;
            console.log("Hello reach rhee");

        }catch(error){

            console.log(error);
            return res.status(500).json({
                success:false,
                message:error.message
            })


        }


    }

    const options = {
        amount:totalAmount * 100,
        currency:"INR",
       receipt: `receipt_${Date.now()}_${Math.floor(Math.random() * 1000)}` 
    }


    try{

        const paymentResponse = await instance.orders.create(options);

        res.json({
            success:true,
            message:paymentResponse
        })

       


    }catch(error){

        return res.status(500).json({
            success:false,
            message:"Could not Initiate order"
        })

    }
 

}


//verify the payment

exports.verifyPayment = async(req,res)=>{


    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;

    const courses = req.body?.courses;
    const userId = req.user.id;

    console.log("abover herer");


    if(!razorpay_order_id || 
       !razorpay_payment_id || 
       !razorpay_signature || 
       !courses || !userId   
    ){
        return res.status(200).json({
            success:false,
            message:"Payment Failed"
        })
    }

    console.log("below herer");


    let body = razorpay_order_id + "|" +razorpay_payment_id;

    const expectedSignature = crypto
    .createHmac("sha256",process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");


    if(expectedSignature === razorpay_signature){
        
        //enroll the student
        await enrollStudents(courses,userId,res);


        //return response
        return res.status(200).json({
            success:true,
            message:"Payment Verified"
        })

    }

    
    return res.status(200).json({
        success:"false",
        message:"Payment Failed"
    })


}



const enrollStudents = async(courses,userId,res)=>{

    if(!courses || !userId || !res){
        return res.status(400).json({
            success:false,
            message:"Please Provide data for Courses or UserId"
        })
    }

    try{

    for(const courseId of courses){
        //find the course and enroll the student in it
        const enrolledCourse = await Course.findOneAndUpdate(
            {_id:courseId},
            {$push:{studentsEnrolled:userId}},
            {new:true}
        )

        if(!enrolledCourse){
            return res.status(500).json({
                success:false,
                message:"Course Not Found"
            })
        }

        const courseProgress = await CourseProgress.create({
            courseId:courseId,
            userId:userId,
            completedVideos:[]
        })

        //find the student and add the course to their list of enrolled course

        const enrolledStudent = await User.findByIdAndUpdate(userId,
            {$push:{
                courses:courseId,
                courseProgress:courseProgress._id
            }},
            {new:true}
        )

        //Send mail to student

        const emailResponse = await mailSender(
            enrolledStudent.email,
            `SuccessFully Enrolled into ${enrolledCourse.courseName}`,
             courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName}`)
        )

        console.log("Email Sent Successfully-------->",emailResponse);
    }

    }catch(error){

        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })

    }


}


exports.sendPaymentSuccessEmail = async(req,res)=>{

    const {orderId,paymentId,amount} = req.body;

    const userId = req.user.id;

    if(!orderId || !paymentId || !amount || !userId){
        return res.status(400).json({
            success:false,
            message:"Please Provide all the fields"
        })
    }

    try{

        //find enroll student
        const enrolledStudent = await User.findById(userId);

        await mailSender(
            enrolledStudent.email,
            `Payment Received`,
              paymentSuccessEmail(`${enrolledStudent.firstName}`,
                         amount/100,orderId, paymentId)
        )
    
    }catch(error){
        console.log("error in sending email",error);
        return res.status(500).json({
            success:false,
            message:"Could not send email"
        })
    }

}





