import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {RxDropdownMenu} from "react-icons/rx";
import {MdEdit} from "react-icons/md";
import {RiDeleteBin6Line} from "react-icons/ri";
import { BiSolidDownArrow } from "react-icons/bi";
import {AiOutlinePlus} from "react-icons/ai";
import SubSectionModal from "./SubSectionModal";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import {deleteSection, deleteSubSection} from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";


const NestedView = ({handleChangedEditSectionName})=>{

    const {course} = useSelector((state)=>state.course);
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();

    const [addSubSection,setAddSubSection] = useState(null);
    const [viewSubSection,setViewSubSection] = useState(null);
    const [editSubSection,setEditSubSection] = useState(null);

    const [confirmationModal,setConfirmationModal] = useState(null);



    const handleDeleteSection = async(sectionId)=>{
        
        const result = await deleteSection({
            sectionId,
            courseId:course._id,
        },token)

        if(result){

            dispatch(setCourse(result));
        }

        setConfirmationModal(null);


    }


    const handleDeleteSubSection = async(subSectionId,sectionId)=>{

        const result = await deleteSubSection({subSectionId,sectionId,token})

        if(result){

            const updatedCourseContent = course.courseContent.map((section)=>section._id === sectionId ? result:section);

            const updatedCourse = {...course,courseContent:updatedCourseContent};

            dispatch(setCourse(updatedCourse));

        }

        setConfirmationModal(null);

    }
    


    return(
        <div>
            
            <div className="mt-8 rounded-lg bg-richblack-700 border border-richblack-600 p-6 px-8">
                {course?.courseContent?.map((section)=>(
                    <details key={section._id} open>
                        
                        <summary className="flex items-center justify-between gap-x-3 border-b-2 border-richblack-600 py-3">
                            <div className="flex items-center gap-x-3">
                                <RxDropdownMenu className="text-richblack-400 text-xl"/>
                                <p className="text-richblack-50 font-semibold ">
                                    {section.sectionName}</p>
                            </div>
                            
                            <div className="flex items-center gap-x-3">
                                <button
                                onClick={()=>handleChangedEditSectionName(section._id,section.sectionName)}
                                className="text-richblack-400 text-xl"
                                >
                                    <MdEdit/>
                                </button>

                                <button
                                onClick={()=>{
                                    setConfirmationModal({
                                        text1:"Delete this section",
                                        text2:"All the lectures in this section will be deleted",
                                        btn1Text:"Delete",
                                        btn2Text:"Cancel",
                                        btn1Handler:()=>handleDeleteSection(section._id),
                                        btn2Handler:()=>setConfirmationModal(null)
                                    })
                                }}
                                
                                >
                                    <RiDeleteBin6Line className="text-richblack-400 text-xl"/>
                                </button>

                                <span className="text-richblack-600">|</span>

                                <BiSolidDownArrow className={`text-[18px] text-richblack-400`}/>

                            </div>

                        </summary>

                        <div>
                            {
                                section.subSection.map((data)=>(
                                    <div 
                                    key={data?._id}
                                    onClick={()=>setViewSubSection(data)}
                                    className="py-3 pl-6 flex items-center justify-between gap-x-3 border-b-2 border-richblack-600"
                                    >
                                        
                                        <div className="flex items-center gap-x-3">
                                           <RxDropdownMenu  className="text-xl text-richblack-400"/>
                                           <p className="font-medium text-richblack-50">{data.title}</p>
                                        </div>

                                        <div
                                        onClick={(e)=>e.stopPropagation()}
                                        className="flex items-center gap-x-3"
                                        >
                                            <button
                                            onClick={()=>setEditSubSection({...data,sectionId:section._id})}
                                            >
                                                <MdEdit className="text-xl text-richblack-400"/>
                                            </button>

                                            <button
                                            onClick={()=>{
                                                setConfirmationModal({
                                                    text1:"Delete this Sub Section",
                                                    text2:"Selected lecture will be deleted",
                                                    btn1Text:"Delete",
                                                    btn2Text:"Cancel",
                                                    btn1Handler:()=>handleDeleteSubSection(data._id,section._id),
                                                    btn2Handler:()=>setConfirmationModal(null)
                                                })
                                            }}
                                            >

                                                <RiDeleteBin6Line className="text-xl text-richblack-400"/>

                                            </button>


                                        </div>


                                    </div>
                                ))
                            }

                            <button
                            onClick={()=>setAddSubSection(section._id)}
                            className="mt-4 flex items-center gap-x-2 text-yellow-50"
                            >
                                <AiOutlinePlus/>
                                <p>Add Lecture</p>
                            </button>

                        </div>

                    </details>
                ))}
            </div>

            {
                addSubSection ?  (<SubSectionModal
                modalData={addSubSection}
                setModalData = {setAddSubSection}
                add={true}
                />) :
                viewSubSection ? (<SubSectionModal
                    modalData={viewSubSection}
                    setModalData = {setViewSubSection}
                    view={true}
                />) :
                editSubSection ? (<SubSectionModal
                    modalData={editSubSection}
                    setModalData = {setEditSubSection}
                    edit={true}
                />) :
                (<div></div>)
            }

            {
                confirmationModal ?
                (<ConfirmationModal modalData={confirmationModal}/>) :
                (<div></div>)
            }


        </div>
    )
}

export default NestedView;
