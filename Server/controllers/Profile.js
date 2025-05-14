const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const Profile = require("../models/Profile");
const User = require("../models/User");
const { convertSecondsToDuration } = require("../utils/secToDuration")


const {uploadImageToCloudinary} =require("../utils/imageUploader");

exports.updateProfile = async(req,res)=>{

    try{

        //Fetch data
        const {dateOfBirth="",about="",contactNumber,gender}=req.body;

        //get userId
        const id=req.user.id;


        //valiation
        if(!contactNumber || !gender || !id){
            return res.status(400).json({
                success:false,
                message:"All Fields are required"
            })
        }

        //find profile
        const userDetails = await User.findById(id);

        const profileId = userDetails.additionalDetails;
        
        const profileDetails = await Profile.findById(profileId);

        //update profile
        profileDetails.dateOfBirth=dateOfBirth;
        profileDetails.about=about;
        profileDetails.gender=gender;
        profileDetails.contactNumber=contactNumber;

        await profileDetails.save();

        const user= await User.findById(id).populate("additionalDetails");

        //return response

        return res.status(200).json({
            success:true,
            message:"Profile Details Updated Successfully",
            data:user
        })


    }catch(error){
        
        console.log(error);

        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message
        })

    }

}


// Todo : Imagine you have an account and you press on delete
// then after two days it will be deleted ,how to do that?


//delete Account

exports.deleteAccount = async(req,res)=>{

    try{

        //Fetch id
        const id=req.user.id;

        //validation
        const userDetails = await User.findById(id);

        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User not Found"
            })
        }

        ///*************** */
        ///It is reaminini//
        //***********/

        //delete profile
        await Profile.findByIdAndDelete(userDetails.additionalDetails);
        
        await Course.updateMany(
          { studentEnrolled: id },
          { $pull: { studentEnrolled: id } }
      );

        await CourseProgress.findByIdAndDelete(userDetails.courseProgress);

    
        //delete user
        await User.findByIdAndDelete(id);

        //TODO : unenroll user from all courses
      

        //return response
        return res.status(200).json({
            success:true,
            message:"User Deleted Successfully"
        })


    }catch(error){

        console.log(error);

        return res.status(500).json({
            success:false,
            message:"User cannot be deleted , please try again"
        })

    }

}


exports.getAllUserDetails = async(req,res)=>{

    try{

        //Fetch id
        const id=req.user.id;

        //validation and get User Details
        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        if(!userDetails){
            res.status(400).json({
                success:false,
                message:"User Details not Found"
            })
        }

        //return response
        return res.status(200).json({
            success:true,
            message:"User Data Fetched Successfully",
            data:userDetails
        })


    }catch(error){

        console.log(error);
        
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message
        })

    }

}


exports.updateDisplayPicture = async (req, res) => {

 
  try {
      const userId = req.user.id

      if(req.files){

        const displayPicture = req.files.displayPicture
        const image = await uploadImageToCloudinary(
          displayPicture,
          process.env.FOLDER_NAME,
          1000,
          1000
        )
        console.log(image)
        const updatedProfile = await User.findByIdAndUpdate(
          { _id: userId },
          { image: image.secure_url },
          { new: true }
        )
        res.send({
          success: true,
          message: `Image Updated successfully`,
          data: updatedProfile,
        })


      }else{

        const user = await User.findById(userId).populate("additionalDetails");

        const updatedProfile = await User.findByIdAndUpdate(
          { _id: userId },
          { image: ` https://api.dicebear.com/5.x/initials/svg?seed=${user.firstName} ${user.lastName}`},
          { new: true }
        )

        res.send({
          success: true,
          message: `Image Updated successfully`,
          data: updatedProfile,
        })

      }
      
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
  
exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id
    let userDetails = await User.findOne({
      _id: userId,
    })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec()
    userDetails = userDetails.toObject()

    var SubsectionLength = 0

    

    for (var i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0
      
      SubsectionLength = 0
      
      for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        
        console.log("u-->",userDetails.courses[i].courseContent[j]);

        totalDurationInSeconds += userDetails.courses[i].courseContent[
          j
        ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
        userDetails.courses[i].totalDuration = convertSecondsToDuration(
          totalDurationInSeconds
        )
        SubsectionLength +=
          userDetails.courses[i].courseContent[j].subSection.length
      }

      
      let courseProgressCounter = await CourseProgress.findOne({
        courseId: userDetails.courses[i]._id,
        userId: userId,
      })

     
     
     let courseProgressCount = courseProgressCounter?.completedVideos.length


      if (SubsectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100
      } else if(!courseProgressCounter){
        
        userDetails.courses[i].progressPercentage = 0;
         
     } else {
        // To make it up to 2 decimal point
        const multiplier = Math.pow(10, 2)
        userDetails.courses[i].progressPercentage = Math.min(
          100,
          Math.round((courseProgressCount / SubsectionLength) * 100 * multiplier) /
            multiplier
        );
      }
    }

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      })
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}


exports.instructorDashboard = async (req, res) => {
  try {
   
    const courseDetails = await Course.find({
      instructor:req.user.id
    });

    const courseData = courseDetails.map((course)=>{
      const totalStudentsEnrolled = course.studentsEnrolled.length
      const totalAmountGenerated = totalStudentsEnrolled * course.price

      //create an new object with additional field

      const courseDataWithStats = {
        _id:course._id,
        courseName:course.courseName,
        courseDescription:course.courseDescription,
        totalStudentsEnrolled,
        totalAmountGenerated
      }

      return courseDataWithStats

    })

    return res.status(200).json({
      success:true,
      courses:courseData
    })


  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}
