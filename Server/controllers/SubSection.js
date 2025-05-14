const SubSection=require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require('dotenv').config();


//create subSection

exports.createSubSection = async(req,res) => {
    
    try{
        //Fetch data from request body
        const {sectionId, title,description}=req.body;

        //extract file/video
        const video = req.files.videoFile;

        //validation
        if(!sectionId || !title  || !description || !video){
            return res.status(400).json({
                success:false,
                message:"All Fields are required"
            })
        }

        //upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME)
        
        //create subSection
        const subSectionDetails = await SubSection.create({
            title:title,
            timeDuration:`${uploadDetails.duration}`,
            description:description,
            videoUrl:uploadDetails.secure_url
        })

        //update section 
        const updatedSection = await Section.findByIdAndUpdate(sectionId,
            {$push:{
                subSection:subSectionDetails._id
            }},
            {new:true}
        ).populate("subSection").exec();
        
        //return response

        return res.status(200).json({
            success:true,
            message:"Sub Section Created Successfully",
            data:updatedSection
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


//update SubSection
 
exports.updateSubSection = async (req, res) => {
    try {
      const { sectionId,subSectionId, title, description } = req.body
      const subSection = await SubSection.findById(subSectionId)
  
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        })
      }
  
      if (title !== undefined) {
        subSection.title = title
      }
  
      if (description !== undefined) {
        subSection.description = description
      }
      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await uploadImageToCloudinary(
          video,
          process.env.FOLDER_NAME
        )
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }
  
      await subSection.save()

      const updatedSection = await Section.findById(sectionId).populate("subSection");
  
  
      return res.json({
        success: true,
        message: "Section updated successfully",
        data:updatedSection
      })

    } catch (error) {

      console.error(error)

      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the section",
      })

    }
}
 

//delete SubSection

exports.deleteSubSection = async (req, res) => {
    try {
      const { subSectionId, sectionId } = req.body
      await Section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $pull: {
            subSection: subSectionId,
          },
        }
      )
      const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
  
      if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }

      const updatedSection = await Section.findById(sectionId).populate("subSection");
  
      return res.json({
        success: true,
        message: "SubSection deleted successfully",
        data:updatedSection
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
      })
    }
}

