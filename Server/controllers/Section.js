const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection=require("../models/SubSection");

exports.createSection = async(req,res)=>{

    try{
        //Fetch data
        const {sectionName,courseId} = req.body;

        //data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"Missing Properties"
            })
        }

        //create section
        const newSection = await Section.create({sectionName});

        //update course with section ObjectId
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push:{
                    courseContent:newSection._id
                }
            },
            {new:true}
        ).populate({
            path: "courseContent",
            populate: {
              path: "subSection",
            },
          }).exec();



        //return response
        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            updatedCourse:updatedCourseDetails
        })


    }catch(error){

        console.log(error);

        return res.status(500).json({
            success:false,
            message:"Unable to create section , please try again",
            error:error.message
        })

    }

}




exports.updateSection = async(req,res)=>{
    
    try{

        //data fetch
        const {sectionName,sectionId,courseId} = req.body;

        //data validation

        if(!sectionName || !sectionId || !courseId){
            return res.status(400).json({
                success:false,
                message:"Missing properties"
            })
        }

        //update data
        const section = await Section.findByIdAndUpdate(sectionId,
            {sectionName},
            {new:true}
        );

        const course = await Course.findById(courseId)
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec();


        //return response
        return res.status(200).json({
            success:true,
            message:"Section Updated Successfully",
            data:course
        });



    }catch(error){
        
        console.log(error);

        return res.status(500).json({
            success:false,
            message:"Unable to update section , please try again",
            error:error.message
        })
    }

}




exports.deleteSection = async(req,res)=>{
    
    try{
        //get Id
        const {sectionId,courseId} = req.body;

        const sectionDetails=await Section.findOne({_id:sectionId});

        //subSection deletion
        await SubSection.deleteMany({ _id: { $in: sectionDetails.subSection } });

        //use findByIdandDelete
       await Section.findByIdAndDelete(sectionId);

        //delete in course
        await Course.findByIdAndUpdate({_id:courseId},
            {$pull:{
               courseContent:sectionId 
            }}
        )


        const course = await Course.findById(courseId).
        populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec();


        //return response
        return res.status(200).json({
            success:true,
            message:"Section Deleted Successfully",
            data:course
        })


    }catch(error){

        console.log(error);

        return res.status(500).json({
            success:false,
            message:"Unable to delete section , please try again",
            error:error.message
        })
    }

}


