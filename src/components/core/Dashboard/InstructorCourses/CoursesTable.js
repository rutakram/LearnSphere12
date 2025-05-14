import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import {COURSE_STATUS} from "../../../../utils/constants";
import ConfirmationModal from "../../../common/ConfirmationModal";
import {deleteCourse, fetchInstructorCourses} from "../../../../services/operations/courseDetailsAPI";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaClock } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { formatDate } from "../../../../services/formatDate"


const CoursesTable = ({courses,setCourses})=>{

    const dispatch = useDispatch();
    const {token}  = useSelector((state)=>state.auth);
    const [loading,setLoading] = useState(false);
    const [confirmationModal,setConfirmationModal] = useState(null);
    const navigate = useNavigate();



    const handleCourseDelete = async(courseId)=>{

        setLoading(true);

        await deleteCourse({courseId:courseId},token);

        const result = await fetchInstructorCourses(token);

        if(result){
            setCourses(result);
        }

        setConfirmationModal(null);
        setLoading(false);

    }


    return(
        <div className="text-white mt-10">

           <Table className="flex flex-col items-center justify-center">

            <Thead>
                <Tr  className="flex gap-x-10 border-richblack-800 mt-4 px-8">
                    <Th className="text-[14px] w-[700px] flex items-start font-medium text-richblack-100">
                        COURSES
                    </Th>

                    <Th  className="text-[14px] font-medium text-richblack-100">
                        DURATION
                    </Th>

                    <Th  className="text-[14px] font-medium text-richblack-100">
                        PRICE
                    </Th>

                    <Th  className="text-[14px] font-medium text-richblack-100">
                        ACTIONS
                    </Th>

                </Tr>
            </Thead>

            <Tbody>
                {
                    courses.length === 0 ?(
                        <Tr>
                            <Td>
                                No Courses Found
                            </Td>
                        </Tr>
                    ):
                    (
                        courses?.map((course)=>(
                            <Tr key={course._id} className="flex   items-center gap-x-14 border-richblack-800 px-8 py-4">

                                <Td className="flex gap-x-4 w-[700px] ">
                                    <img 
                                    src={course?.thumbnail}
                                    className="h-[150px] w-[220px] rounded-lg object-cover "
                                    />
                                    <div className="flex flex-col gap-4 w-[400px]">
                                        <p className="text-xl text-richblack-5 font-semibold">
                                            {course.courseName}
                                        </p>

                                        <p className="text-richblack-100 text-sm ">
                                            {course.courseDescription}
                                        </p>

                                        <p  className="text-richblack-25 text-sm ">
                                            Created At: {formatDate(course.createdAt)}
                                        </p>
                                        {
                                            course.status === COURSE_STATUS.DRAFT ? (
                                                <div  className="flex w-fit gap-2 rounded-md bg-richblack-700 px-3 py-2 ">
                                                    <FaClock className="text-pink-50 text-[16px]"/>
                                                    <p className="text-pink-100  text-xs font-medium">
                                                        DRAFTED
                                                    </p>
                                                </div>
                                            ) :
                                            (
                                                <div className="flex w-fit gap-2 rounded-md bg-richblack-700 px-3 py-2 ">
                                                    <FaCheckCircle className="text-yellow-50 text-[16px]"/>
                                                   <p className="text-yellow-100 text-xs font-medium">
                                                    PUBLISHED
                                                    </p> 
                                                </div>
                                            )
                                        }

                                    </div>
                                    
                                </Td>

                                <Td className="text-richblack-100 text-sm min-w-fit">
                                    {course.timeDuration}
                                </Td>

                                <Td  className="text-richblack-100 text-sm w-5">
                                ₹{course.price}
                                </Td>

                                <Td className="flex gap-x-2">
                                    <button
                                    disabled={loading}
                                    onClick={()=>{
                                        navigate(`/dashboard/edit-course/${course._id}`)
                                    }}
                                    >
                                     <MdEdit className="text-xl text-richblack-400"/>
                                    </button>

                                    <button
                                    disabled={loading}
                                    onClick={()=>{
                                        setConfirmationModal({
                                            text1:"Do You want to delete this course",
                                            text2:"All the data related to this course will be deleted",
                                            btn1Text:"Delete",
                                            btn2Text:"Cancel",
                                            btn1Handler: !loading ? ()=>handleCourseDelete(course._id):()=>{}, 
                                            btn2Handler: !loading ? ()=>setConfirmationModal(null):()=>{},
                                        })
                                    }}
                                    >
                                      <RiDeleteBin6Line className="text-xl text-richblack-400"/>
                                      
                                    </button>
                                </Td>


                            </Tr>
                        ))
                    )
                }

            </Tbody>



           </Table>

           {
            confirmationModal && <ConfirmationModal modalData={confirmationModal}/>
           }



        </div>
    )
}

export default CoursesTable;
