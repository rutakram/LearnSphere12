import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createSubSection, updateSubSection } from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";
import { RxCross1 } from "react-icons/rx";
import Upload from "../Upload";
import IconBtn from "../../../../common/IconBtn";

const SubSectionModal = ({
    modalData,
    setModalData,
    add=false,
    view=false,
    edit=false,
})=>{

    const {
        register,
        handleSubmit,
        setValue,
        formState:{errors},
        getValues
    } = useForm();

    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);
    const {course} = useSelector((state)=>state.course);
    const {token} = useSelector((state)=>state.auth);


    useEffect(()=>{

        if(view || edit){

            setValue("lectureTitle",modalData.title);
            setValue("lectureDesc",modalData.description);
            setValue("lectureVideo",modalData.videoUrl);

        }

    },[]);



    const isFormUpdated = ()=>{

        const currentValues = getValues();

        if(currentValues.lectureTitle !== modalData.title 
        ||currentValues.lectureDesc !== modalData.description 
        ||currentValues.lectureVideo !== modalData.videoUrl 
        )
        {
            return true;
        }else{
            return false;
        }

    }


    const handleEditSubSection = async()=>{

        const currentValues = getValues();
        const formData = new FormData();

        formData.append("sectionId",modalData.sectionId);
        formData.append("subSectionId",modalData._id);

        if(currentValues.lectureTitle !== modalData.title){
            formData.append("title",currentValues.lectureTitle);
        }

        if(currentValues.lectureDesc !== modalData.description){
            formData.append("description",currentValues.lectureDesc);
        }

        if(currentValues.lectureVideo !== modalData.videoUrl){
            formData.append("video",currentValues.lectureVideo);
        }

        
        setLoading(true);

        const result = await updateSubSection(formData,token);
        console.log("modal",modalData);
        console.log("section",result.courseContent);

        if(result){
            console.log("result coming",result);
            const updatedCourseContent = course.courseContent.map(
                (section)=>section._id === modalData.sectionId ? result:section);

            const updatedCourse = {...course,courseContent:updatedCourseContent};

            console.log("Updated Course",updatedCourse);
            dispatch(setCourse(updatedCourse));
        }

        setModalData(null);

        setLoading(false);

    }



    const onSubmit = async(data)=>{

        if(view){
            return;
        }

        if(edit){
            if(!isFormUpdated){
                toast.error("No Changes Made To The Form");
            }else{

                handleEditSubSection();

            }
            return;
        }

        const formData = new FormData();

        formData.append("sectionId",modalData);
        formData.append("title",data.lectureTitle);
        formData.append("description",data.lectureDesc);
        formData.append("videoFile",data.lectureVideo);

        setLoading(true);

        const result = await createSubSection(formData,token);

        if(result){   
            const updatedCourseContent = course.courseContent.map(
                (section)=>section._id === modalData ? result:section);

                
            const updatedCourse = {...course,courseContent:updatedCourseContent};

            dispatch(setCourse(updatedCourse));
        }

        setModalData(null);

        setLoading(false);

    }




    return(
        <div className="z-[100] overflow-auto pt-2  rounded-md fixed  inset-0 bg-black bg-opacity-80  flex justify-center ">

            <div className="flex  flex-col rounded-md bg-richblack-800 gap-6  w-[500px] h-[500px] ">
                <div className="flex py-4 px-6 justify-between w-full bg-richblack-700 ">
                    <p className="text-white font-semibold text-[18px]">
                        {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</p>
                    <button onClick={()=>(!loading ? setModalData(null) : {})}>
                        <RxCross1 className="text-white"/>
                    </button>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="bg-richblack-800 px-4 ">

                    <Upload 
                    name="lectureVideo"
                    label="Lecture Video"
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    video={true}
                    viewData={view ? modalData.videoUrl : null}
                    editData={edit ? modalData.videoUrl : null}
                    
                    />

                    <div className="flex flex-col mt-4">
                        <label className="text-sm text-richblack-5">
                            Lecture Title <sup className="text-pink-50">*</sup>
                        </label>

                        <input
                        id="lectureTitle"
                        placeholder="Enter Lecture Title"
                        {...register("lectureTitle",{required:true})}
                        className="w-full bg-richblack-700 p-3 text-richblack-200 font-medium rounded-md"
                       />

                       {
                        errors.lectureTitle && (
                            <span  className="text-sm text-pink-200">
                                Lecture Title is required</span>
                        )
                       }

                    </div>

                    <div className="flex flex-col  mt-4">
                        <label  className="text-sm text-richblack-5">
                            Lecture Description</label>
                        <textarea 
                        id="lectureDesc"
                        placeholder="Enter Lecture Description"
                        {...register("lectureDesc",{required:true})}
                         className="w-full bg-richblack-700 p-3 text-richblack-200 font-medium rounded-md"
                        />
                        {
                            errors.lectureDesc && (
                                <span  className="text-sm text-pink-200">
                                    Lecture Description is required</span>
                            )
                        }
                    </div>

                    {
                        !view && (
                            <div className="pt-6 pb-6">
                                <IconBtn
                                text={loading ? "Loading..." : edit ? "Save Changes" : "Save"}
                                />
                            </div>
                        )
                    }



                </form>

            </div>



        </div>
    )
}

export default SubSectionModal;
