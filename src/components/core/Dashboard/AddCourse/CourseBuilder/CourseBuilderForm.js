import React, { useState } from "react";
import { useForm } from "react-hook-form";
import IconBtn from "../../../../common/IconBtn";
import {GrAddCircle} from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import {BiLeftArrow, BiRightArrow} from "react-icons/bi";
import {setCourse, setEditCourse,setStep} from "../../../../../slices/courseSlice";
import {toast} from "react-hot-toast";
import {updateSection,createSection} from "../../../../../services/operations/courseDetailsAPI";
import NestedView from "./NestedView";


const CourseBuilderForm = ()=>{


    const {register,handleSubmit,setValue,formState:{errors}} = useForm();
    const [editSectionName,setEditSectionName] = useState(null);
    const {course} = useSelector((state)=>state.course);
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);
    const {token} = useSelector((state)=>state.auth);


    const handleChangedEditSectionName = (sectionId,sectionName)=>{

        if(editSectionName === sectionId){
            cancelEdit();
            return;
        }

       setEditSectionName(sectionId);
       setValue("sectionName",sectionName);

    }



    const cancelEdit=()=>{

        setEditSectionName(null);
        setValue("sectioName","");
        
    }

    const goBack=()=>{

        dispatch(setStep(1));
        dispatch(setEditCourse(true));

    }

    const goToNext = ()=>{

        if(course.courseContent.length === 0){
            toast.error("Please add atleast one section");
            return;
        }
        
        if(course.courseContent.some((section) => section.subSection.length === 0)){
            toast.error("Please add atleast one lecture in each section");
            return;
        }
        
        dispatch(setStep(3));

    }



    const onSubmit = async(data) => {

        setLoading(true);

        let result;

        if(editSectionName){
            //we are editing section name

            result = await updateSection(
                {
                    sectionName:data.sectionName,
                    sectionId:editSectionName,
                    courseId:course._id,
                },token
            )

        }else{
            result = await createSection({
                sectionName:data.sectionName,
                courseId:course._id
            },token)
        }

        //update values
        if(result){
            dispatch(setCourse(result));
            setEditSectionName(null);
            setValue("sectionName","");
        }

        setLoading(false);

    }



    return(
        <div className="bg-richblack-800 border border-richblack-700 rounded-md p-6 gap-6">

            <p className="font-semibold font-inter text-2xl text-richblack-5">
                Course Builder</p>

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="flex flex-col mt-6 gap-y-1">
                    <label htmlFor="sectionName"
                    className="text-sm text-richblack-5"
                    >Section name<sup className="text-pink-50">*</sup></label>
                    <input
                    id="sectionName"
                    placeholder="Add Section Name"
                    {...register("sectionName",{required:true})}
                    className="w-full bg-richblack-700 p-3 text-richblack-200 font-medium rounded-md"
                    />
                    {
                        errors.sectionName && (
                            <span className="text-sm text-pink-200">
                                Section Name is required</span>
                        )
                    }


                </div>

                <div className="mt-10 flex w-full">
                    <IconBtn
                    type="submit"
                    text={editSectionName ? "Edit Section Name " : "Create Section"}
                    outline={true}
                    customClasses={"text-yellow-50"}
                    >
                        <GrAddCircle/>
                       
                    </IconBtn>

                    {
                        editSectionName && (
                            <button
                            type="button"
                            onClick={cancelEdit}
                            className="text-sm text-richblack-300 underline ml-10"
                            >
                                Cancel Edit
                            </button>
                        )
                    }
                </div>


            </form>

            {
                course?.courseContent?.length > 0 && (
                    <NestedView handleChangedEditSectionName={handleChangedEditSectionName}/>
                )
            }

            <div className="flex justify-end gap-x-3 mt-10">
                <button 
                onClick={goBack}
                className="bg-richblack-600 gap-3 py-3 px-6 text-richblack-5 font-medium rounded-md cursor-pointer flex items-center"
                >
                    <BiLeftArrow/>
                    Back
                </button>

                <IconBtn
                text={"Next"}
                onclick={goToNext}
                >
                    <BiRightArrow/>

                </IconBtn>

            </div>



        </div>
    )
}

export default CourseBuilderForm;
