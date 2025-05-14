import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../../common/IconBtn";
import { resetCourseState, setStep } from "../../../../../slices/courseSlice";
import { COURSE_STATUS } from "../../../../../utils/constants";
import { useNavigate } from "react-router-dom";
import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI";


const PublishCourse = ()=>{

    const {
        register,
        handleSubmit,
        setValue,
        getValues
    }=useForm();

    const dispatch = useDispatch();
    const {course} = useSelector((state)=>state.course);
    const {token} = useSelector((state)=>state.auth);
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{

        if(course?.status === COURSE_STATUS.PUBLISHED){
            setValue("public",true);
        }

    },[]);

    const goToCourses=()=>{
        dispatch(resetCourseState());
        navigate("/dashboard/my-courses");
    }

    const handleCoursePublish = async()=>{

        if(course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true
          || (course.status === COURSE_STATUS.DRAFT && getValues("public") === false)){

            //No Updation in form
            //No need to make api call

            goToCourses();
            return;

        }

        const formData = new FormData();

        formData.append("courseId",course._id);
        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT

        formData.append("status",courseStatus);

        setLoading(true);

        const result = await editCourseDetails(formData,token);

        if(result){
            goToCourses();
        }

        setLoading(false);

    }




    const onSubmit = ()=>{
        handleCoursePublish();
    }

    const goBack = ()=>{
        dispatch(setStep(2));
    }


    return(
        <div className=" rounded-md border-[1px] bg-richblack-800 p-6  border-richblack-700">
            <p className="text-richblack-5 text-2xl font-semibold">
                Publish Course
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col mt-4">
                    <label htmlFor="public">
                    <input
                    type="checkbox"
                    id="public"
                    {...register("public")}
                    className="rounded h-4 w-4 accent-richblack-400"
                    />
                    <span className="ml-3 text-richblack-400">
                        Make this Course as Public
                    </span>
                    </label>
                </div>

                <div className="flex justify-end gap-x-3">
                    <button
                    disabled={loading}
                    type="button"
                    onClick={goBack}
                    className="flex items-center rounded-md bg-richblack-600 px-6 py-3 text-richblack-5"
                    >
                        Back
                    </button>

                    <IconBtn
                    disabled={loading}
                    text="Save Changes"
                    />


                </div>

            </form>

        </div>
    )
}

export default PublishCourse;
