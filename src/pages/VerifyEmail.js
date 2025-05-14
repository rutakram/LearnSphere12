import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/common/Spinner";
import OtpInput from 'react-otp-input';
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, signUp } from "../services/operations/authAPI";
import { GiBackwardTime } from "react-icons/gi";

const VerifyEmail = ()=>{

    const {signupData,loading} = useSelector((state) => state.auth);

    const [otp,setOtp]=useState("");

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(()=>{
    
        if(!signupData){
            navigate("/signup")
        }
    },[]);


    function  handleOnSubmit(e){
        
        e.preventDefault();

        const{
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,    
        }=signupData;

        dispatch(signUp(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate));

    }


    return (
        <div className="max-w-[508px] p-4 lg:p-8 mx-auto my-auto">
            {
                loading ?
                (<Spinner/>):
                (
                    <div className="flex flex-col gap-y-4">
                        <h1  className="text-[1.875rem] font-inter font-semibold leading-[2.375rem] text-richblack-5">
                            Verify Email
                        </h1>

                        <p  className="font-inter text-[18px] text-richblack-100">
                            A verification code has been sent to you. Enter the code below
                        </p>

                        <form onSubmit={handleOnSubmit}>

                        <OtpInput
                          value={otp}
                          onChange={setOtp}
                          numInputs={6}
                          renderSeparator={<span>-</span>}
                          renderInput={(props) =>{
                            return (
                                <div className=' p-6  rounded-lg bg-richblack-800 ' style={{ 'boxShadow': '0px -1px 0px 0px #FFFFFF2E inset' }}>
                                  <input {...props} className='font-inter text-xl font-medium leading-6 text-left focus:outline-none bg-transparent text-richblack-5' />
                                </div>
                              )
                          }
                        }
                          
                        />

                        <button type="submit"
                        className="btn mt-6 w-full  rounded-[8px] bg-yellow-50 py-[10px] px-[12px] font-semibold text-richblack-900">
                            Verify Email
                        </button>

                        </form>

                        <div className="flex justify-between items-center">
                            
                        <div className="flex items-center gap-x-2 font-medium">

                        <IoIosArrowRoundBack className="text-richblack-5 text-3xl"/>

                        <Link to="/login">
                        <p className="text-richblack-5">Back to Login</p>
                        </Link>
                                          
                        </div>

                        <div className="text-blue-100 flex items-center gap-x-2">

                        <GiBackwardTime className="w-6 h-6"/>

                        <button
                        onClick={()=>dispatch(sendOtp(signupData.email,navigate))}
                        className="font-medium font-inter text-xl"
                        >
                            Resend it
                        </button>

                        </div>


                        </div>

                    </div>
                )

            }

        </div>
    )

}

export default VerifyEmail;
