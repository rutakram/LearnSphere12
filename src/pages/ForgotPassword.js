import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/common/Spinner";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authAPI";
import { FiArrowLeft } from "react-icons/fi";
import { IoIosArrowRoundBack } from "react-icons/io";

const ForgotPassword = ()=>{

    const {loading} = useSelector((state)=>state.auth);
    const [emailSent,setEmailSent] = useState(false);
    const [email,setEmail] = useState("");
    const dispatch = useDispatch();

    function handleOnSubmit(e){
        
        e.preventDefault();

        dispatch(getPasswordResetToken(email,setEmailSent));

    }


    return(
        <div className="max-w-[500px] p-4 lg:p-8 mx-auto my-auto">
            {
                loading ?
                (<Spinner/>):
                (
                    <div className="flex flex-col gap-y-4">

                        <h1 className="text-[1.875rem] font-inter font-semibold leading-[2.375rem] text-richblack-5">
                            {
                                !emailSent ? "Reset Your Password" : "Check Your Email"
                            }
                        </h1>

                        <p className="font-inter text-[18px] text-richblack-100">
                            {
                                !emailSent  ?
                                 "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery " :
                                 `We have sent the reset email to your ${email}`
                            }
                        </p>

                        <form onSubmit={handleOnSubmit}>
                            {
                                !emailSent && (
                                    <label className="w-full">

                                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                            Email Address: 
                                            <sup  className="text-pink-200">*</sup>
                                        </p>

                                        <input 
                                        required
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e)=>setEmail(e.target.value)}
                                        placeholder="Enter Your Email Address"
                                        style={{
                                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                          }}
                                          className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                                        />

                                        


                                    </label>
                                )
                            }

                        <button
                        className="btn mt-6 w-full  rounded-[8px] bg-yellow-50 py-[10px] px-[12px] font-medium text-richblack-900">
                            {
                                !emailSent ? "Reset Password" : "Resend Email"
                            }
                        </button>

                        </form>

                        <div className="flex items-center gap-x-2 font-medium">
                           <IoIosArrowRoundBack className="text-richblack-5 text-3xl"/>
                            <Link to="/login">
                            <p className="text-richblack-5">Back to Login</p>
                            </Link>

                        </div>


                    </div>
                )

            }


        </div>
    )
}

export default ForgotPassword;
