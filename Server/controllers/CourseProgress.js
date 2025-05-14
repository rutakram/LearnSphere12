const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");

exports.updateCourseProgress = async(req,res)=>{

    const {courseId,subSectionId} = req.body;

    const userId =req.user.id;

    try{

        //check if sub section is valid
        const subSection = await SubSection.findById(subSectionId);

        if(!subSection){
            return res.status(404).json({
                success:false,
                error:"Invalid SubSection"
            })
        }

        //check for old entry

        let courseProgress  = await CourseProgress.findOne({
            courseId:courseId,
            userId:userId
        });

        

        if(!courseProgress){
            return res.status(404).json({
                success:false,
                message:"Course Progress does not exist"
            })
        }

        //check for re-completing video/subsection

        if(courseProgress.completedVideos.includes(subSectionId)){
            return res.status(400).json({
                error:"Sub Section already completed"
            })
        }

        //push into completed video
        courseProgress.completedVideos.push(subSectionId);

        await courseProgress.save();

        return res.status(200).json({
            success:true,
            message:"Course Progress Success"
        })


    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            error:"Internal Server Error"
        })
    }


}

