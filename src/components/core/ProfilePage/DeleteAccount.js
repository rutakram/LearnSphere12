import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteProfile } from "../../../services/operations/profileAPI";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../common/ConfirmationModal";

const DeleteAccount = ()=>{

    const dispatch = useDispatch();
    const {token}=useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const [confirmationModal,setConfirmationModal] = useState(null);


    return(
        <div className="rounded-md p-5  flex gap-x-4 bg-pink-900 border border-pink-700">

            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-pink-400 bg-opacity-40">
                <MdDelete
                className="text-pink-200 text-2xl"
                />
            </div>

            <div className="flex flex-col items-start gap-y-2">
                <h1 className="text-pink-5 text-[18px] font-bold font-inter">Delete Account</h1>

                <div className="font-inter font-medium text-[14px] text-pink-25">
                    <p>Would you like to delete account?</p>
                    <p>This account contains Paid Courses. Deleting your account will remove all the contain associated with it.</p>
                </div>

                <button className="text-pink-300  font-inter font-medium italic"
                onClick={
                 ()=>{setConfirmationModal(true)}   
                    // ()=>{dispatch(deleteProfile(navigate,token))}
                }
                >
                I want to delete my account.
                </button>
            </div>

            {
                confirmationModal && 
                <ConfirmationModal
                modalData={
                    {
                        text1:"Are You Sure ?",
                        text2:"Your Account Will Be Permanently Deleted",
                        btn1Text:"Delete",
                        btn2Text:"Cancel",
                        btn1Handler:()=>dispatch(deleteProfile(navigate,token)),
                        btn2Handler:()=>setConfirmationModal(null)
                    }
                }
                />
            }

        </div>
    )
}

export default DeleteAccount;
