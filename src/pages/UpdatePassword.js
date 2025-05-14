import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/common/Spinner";
import { resetPassword } from "../services/operations/authAPI";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IoIosArrowRoundBack } from "react-icons/io";

const UpdatePassword = ()=>{

    const {loading} =useSelector((state)=>state.auth);

    const [showPassword,setShowPassword] = useState(false);

    const navigate = useNavigate();

    const [showConfirmPassword,setShowConfirmPassword] = useState(false);

    const dispatch=useDispatch();

    const location =useLocation();

    const [formData,setFormData] = useState({
        password:"",
        confirmPassword:""
    });

    const {password,confirmPassword} = formData;

    const handleOnChange=(e)=>{

        setFormData((prevData)=>(
            {
            ...prevData,
            [e.target.name] : e.target.value

            }

        ))

    }


    const handleOnSubmit=(e)=>{

        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password,confirmPassword,token,navigate));

    }


    return(
        <div className="max-w-[508px] p-4 lg:p-8 mx-auto my-auto">
            {
                loading ?
                (<Spinner/>):
                (
                    <div className="flex flex-col gap-y-4">
                        <h1 className="text-[1.875rem] font-inter font-semibold leading-[2.375rem] text-richblack-5"
                        >Choose new password</h1>

                        <p className="font-inter text-[18px] text-richblack-100">
                            Almost done. Enter your new password and youre all set.</p>

                        <form onSubmit={handleOnSubmit}
                        className="flex flex-col gap-y-4">

                            <label className="relative w-full">
                                <p  className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                    New password 
                                    <sup className="text-pink-200">*</sup>
                                </p>

                                <input
                                required
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={password}
                                onChange={handleOnChange}
                                placeholder="Enter Password"
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                  }}
                                  className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"

                                />

                                 <span
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                                        >
                                          {showPassword ? (
                                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                          ) : (
                                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                          )}
                                        </span>


                            </label>

                            <label className="relative w-full">

                                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
                                >Confirm new password 
                                <sup className="text-pink-200">*</sup>
                                
                                </p>

                                <input
                                required
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={handleOnChange}
                                placeholder="Confirm Password"
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                  }}
                                  className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"

                                />

                                  <span
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                    className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                                        >
                                          {showConfirmPassword ? (
                                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                          ) : (
                                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                          )}
                                    </span>

                            </label>

                            <button type="submit"
                            className="btn mt-6 w-full  rounded-[8px] bg-yellow-50 py-[10px] px-[12px] font-medium text-richblack-900">
                                Reset Password
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

export default UpdatePassword;
