import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { passwordChange } from "../../../services/operations/profileAPI";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";

const PasswordChange = ()=>{

      const {
                register,
                handleSubmit,
                reset,
                formState:{errors,isSubmitSuccessful}
            } = useForm();


       const dispatch = useDispatch();

       const {user}=useSelector((state)=>state.profile);
       const {token}=useSelector((state)=>state.auth);


    
    async function submitHandler(data){

        try{

            dispatch(passwordChange(token,user.email,
                data.oldPassword,data.newPassword,data.confirmPassword
            ));


        }catch(error){
            console.log(error);
        }

    }



    const [showOldPassword, setOldPassword] = useState(false)
    const [showNewPassword, setNewPassword] = useState(false)
    const [showConfirmPassword, setConfirmPassword] = useState(false)
    
        


    return(
        <div  className="flex flex-col gap-4 p-6 rounded-md  border border-richblack-700">

            <h1 className="text-richblack-5 text-2xl">
                Password
            </h1>

            <form onSubmit={handleSubmit(submitHandler)}>

   <div className="flex flex-col gap-x-4 gap-y-6">

    <div className="flex justify-between items-center">

             <div className="flex flex-col w-[45%]">
             <label className="relative">
               <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                 Old Password <sup className="text-pink-200">*</sup>
               </p>
               <input
                 type={showOldPassword ? "text" : "password"}
                 placeholder="Enter Password"
                 
                 {...register("oldPassword",{required:true})}
                 className=" shadow-sm  shadow-richblack-5 w-full rounded-[0.5rem] bg-richblack-700 p-[12px] pr-10 text-richblack-100"
               />
               <span
                 onClick={() => setOldPassword((prev) => !prev)}
                 className="absolute right-3 top-[38px] z-[10] cursor-pointer"
               >
                 {showOldPassword ? (
                   <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                 ) : (
                   <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                 )}
               </span>
             </label>
             </div>

             <div className="flex flex-col w-[45%]">
             <label className="relative">
               <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                 New Password <sup className="text-pink-200">*</sup>
               </p>
               <input
                 type={showNewPassword ? "text" : "password"}
                 placeholder="Enter New Password"
                
                 {...register("newPassword",{required:true})}
                 className=" shadow-sm  shadow-richblack-5 w-full rounded-[0.5rem] bg-richblack-700 p-[12px] pr-10 text-richblack-100"
               />
               <span
                 onClick={() => setNewPassword((prev) => !prev)}
                 className="absolute right-3 top-[38px] z-[10] cursor-pointer"
               >
                 {showNewPassword ? (
                   <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                 ) : (
                   <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                 )}
               </span>
             </label>
             </div>

    </div>

             <div className="flex flex-col w-[45%]">

             <label className="relative">
               <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                 Confirm Password <sup className="text-pink-200">*</sup>
               </p>
               <input
                 type={showConfirmPassword ? "text" : "password"}
                 placeholder="Enter Password"
                 {...register("confirmPassword",{required:true})}
                 className="w-full  shadow-sm  shadow-richblack-5 rounded-[0.5rem] bg-richblack-700 p-[12px] pr-10 text-richblack-100"
               />
               <span
                 onClick={() => setConfirmPassword((prev) => !prev)}
                 className="absolute right-3 top-[38px] z-[10] cursor-pointer"
               >
                 {showConfirmPassword ? (
                   <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                 ) : (
                   <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                 )}
               </span>
             </label>

             </div>

             <button className="w-fit mx-auto bg-yellow-50 py-2  rounded-md text-center px-6 text-[16px] font-bold text-black">
                Change Password
             </button>
             


           </div>

            </form>

        </div>
    )
}


export default PasswordChange;
