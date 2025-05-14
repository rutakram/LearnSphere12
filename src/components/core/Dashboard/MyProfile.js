import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import { FaEdit } from "react-icons/fa";

const MyProfile = ()=>{

    const {user} = useSelector((state)=>state.profile);
    const navigate = useNavigate();

    return(
        <div className="flex flex-col gap-10 px-16">

            <h1 className="font-inter text-3xl font-semibold text-richblack-5">
                My Profile
            </h1>

            <div className="flex flex-col ml-12 gap-x-2 gap-y-12 mx-auto">


            {/* Section - 1 */}
            <div className="flex p-6 w-[800px] justify-between items-center rounded-md bg-richblack-800 border border-richblack-700">
                <div className="flex gap-6 items-center">
                    <img 
                    src={user?.image}
                    alt={`profile-${user?.firstName}`}
                    className="aspect-square w-[78px] rounded-full object-cover"/>
                    <div>
                        <p className="font-inter font-semibold  text-richblack-5 text-[18px]">
                            {user?.firstName + " " + user?.lastName}</p>
                        <p className="text-richblack-300 text-sm font-inter ">
                            {user?.email}</p>
                    </div>
                </div>

               
              

                <IconBtn
                text="Edit"
                onclick={()=>navigate("/dashboard/settings")}
                />
             
              


            </div>

            {/* Section - 2 */}

            <div className="flex flex-col gap-y-6 p-6 w-[800px] rounded-md bg-richblack-800 border border-richblack-700">
                <div className="flex justify-between items-center">
                    <p  className="font-inter font-semibold  text-richblack-5 text-[18px]">
                        About</p>
                    <IconBtn
                    text="Edit"
                    onclick={()=>{
                        navigate("/dashboard/settings")
                    }}
                    />
                </div>
                <p  className="text-richblack-300 text-sm font-inter ">
                    {user?.additionalDetails?.about ??
                 "write Something about Yourself"}</p>
            </div>


            {/* Section - 3 */}

            <div  className="flex flex-col gap-y-6 p-6 w-[800px] rounded-md bg-richblack-800 border border-richblack-700">
                <div className="flex justify-between items-center">
                    <p className="font-inter font-semibold  text-richblack-5 text-[18px]">
                         Personal Details</p>
                    <IconBtn
                    text="Edit"
                    onclick={()=>{
                        navigate("/dashboard/settings")
                    }}
                    />
                </div>

                <div className="flex gap-x-24">

                    <div className="flex flex-col gap-y-8">


                    <div  className="flex flex-col gap-y-2">
                        <p className="text-richblack-600 font-inter text-sm">First Name</p>
                        <p className="font-medium text-richblack-5 font-inter ">
                            {user?.firstName}</p>
                    </div>

                    <div  className="flex flex-col gap-y-2">
                        <p className="text-richblack-600 font-inter text-sm">Email</p>
                        <p  className="font-medium text-richblack-5 font-inter ">{user?.email}</p>
                    </div>

                    <div  className="flex flex-col gap-y-2">
                        <p className="text-richblack-600 font-inter text-sm">Gender</p>
                        <p  className="font-medium text-richblack-5 font-inter ">{user?.additionalDetails?.gender ?? "Add Gender"}</p>
                    </div>

                    </div>

                    <div className="flex flex-col gap-y-8">


                    <div className="flex flex-col gap-y-2">
                        <p className="text-richblack-600 font-inter text-sm">Last Name</p>
                        <p  className="font-medium text-richblack-5 font-inter ">{user?.lastName}</p>
                    </div>

                    <div  className="flex flex-col gap-y-2">
                        <p className="text-richblack-600 font-inter text-sm">Phone Number</p>
                        <p  className="font-medium text-richblack-5 font-inter ">{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
                    </div>

                    <div  className="flex flex-col gap-y-2">
                        <p className="text-richblack-600 font-inter text-sm">Date of Birth</p>
                        <p  className="font-medium text-richblack-5 font-inter ">{user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}</p>
                    </div>

                    </div>
                    


                </div>

            </div>

        </div>





        </div>
    )
}

export default MyProfile;
