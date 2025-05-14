import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {apiConnector} from "../../../services/apiconnector";
import {contactusEndpoint} from "../../../services/apis";
import CountryCode from "../../../data/countrycode.json";
import { useDispatch } from "react-redux";
import { contact } from "../../../services/operations/contactAPI";


const ContactUsForm = ()=>{

    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();

    const submitContactForm = async(data)=>{
        console.log("Logging Data",data);

        try{

            setLoading(true);

            dispatch(contact(
                data.firstName,
                data.lastName,
                data.email,
                data.countryCode,
                data.phoneNumber,
                data.message,
            ));

            setLoading(false); 

        }catch(error){

            console.log(error.message);
            setLoading(false);

        }

        reset();


    }

    const {
        register,
        handleSubmit,
        reset,
        formState:{errors,isSubmitSuccessful}
    } = useForm();


    useEffect(()=>{
        if(!isSubmitSuccessful){
            reset({
                email:"",
                firstName:"",
                lastName:"",
                message:"",
                phoneNumber:"",

            })
        }
    },[reset,isSubmitSuccessful]);



    return(
        <form onSubmit={handleSubmit(submitContactForm)}>

            <div className="flex flex-col gap-10 text-white  mt-12">

            <div className="flex gap-5">

                {/* First Name */}

                <div className="flex flex-col gap-y-2">
                    <label htmlFor="firstName"
                    className="text-sm">
                        First Name
                    </label>

                        <input 
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="Enter First Name"
                        {...register("firstName",{required:true})}
                       
                          className="placeholder-richblack-400 w-full shadow-sm shadow-richblack-5 rounded-[0.5rem] bg-richblack-700 p-[12px] pr-12 text-richblack-5"
                        />
                        {
                            errors.firstName && (
                                <span
                                className="mt-1 ml-2 text-[12px] text-yellow-100">
                                    Please Enter Your Name
                                </span>
                            )
                        }

                </div>


                {/* Last Name */}

                <div className="flex flex-col gap-y-2">
                    <label htmlFor="lastName"
                    className="text-sm">
                        Last Name
                    </label>

                        <input 
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Enter Last Name"
                        {...register("lastName",{required:true})}
                     
                          className="w-full shadow-sm placeholder-richblack-400 shadow-richblack-5 rounded-[0.5rem] bg-richblack-700 p-[12px] pr-12 text-richblack-5"
                        />
                        {
                            errors.lastName && (
                                <span
                                className="mt-1 ml-2 text-[12px] text-yellow-100">
                                    Please Enter Your Name
                                </span>
                            )
                        }

                </div>


            </div>

            {/* Email */}

            <div className="flex flex-col  gap-y-2">
                <label htmlFor="email"
                className="text-sm">Email Address</label>
                <input 
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email Address"
                {...register("email",{required:true})}
                  className="w-full shadow-sm shadow-richblack-5 placeholder-richblack-400 rounded-[0.5rem] bg-richblack-700 p-[12px] pr-12 text-richblack-5"
                />
                {
                    errors.email && (
                        <span
                        className="mt-1 ml-2 text-[12px] text-yellow-100">
                            Please Enter Your Email Address
                        </span>
                    )
                }
            </div>


            {/* Phone Number */}

            <div className="flex flex-col  gap-y-2">
                
                <label htmlFor="phoneNumber" className="text-sm">Phone Number</label>

                <div className="flex flex-row  gap-x-4">

                    {/* Drop Down */}

                    <div className="flex w-[100px]  gap-6">
                        <select
                        className="shadow-sm w-full shadow-richblack-5  rounded-[0.5rem] bg-richblack-700 p-[12px]"
                        name="dropdown"
                        id="dropdown"
                        {...register("countryCode",{required:true})}
                        
                        >
                            {
                                CountryCode.map((element,index)=>(
                                    <option key={index} value={element.code}
                                    
                                    >
                                        {element.code} - {element.country}
                                    </option>
                                ))
                            }
                        </select>
                    </div>


                    <div className="w-full">
                        <input
                        type="number"
                        name="phoneNumber"
                        id="phonNumber"
                        placeholder="12345 67890"
                        {...register("phoneNumber",
                            {
                            required:{value:true,message:"Please Enter Phone Number "},
                            maxLength:{value:10,message:"Invalid Phone Number"},
                            minLength:{value:8,message:"Invalid Phone Number"}
                            })}

                              className="w-full shadow-sm placeholder-richblack-400 shadow-richblack-5 rounded-[0.5rem] bg-richblack-700 p-[12px] pr-12 text-richblack-5"
                        />

                    </div>

                </div>
                {
                    errors.phoneNo && (
                        <span
                        className="mt-1 ml-2 text-[12px] text-yellow-100">
                            {errors.phoneNo.message}
                        </span>
                    )
                }


            </div>


            {/* Message */}

            <div className="flex flex-col  gap-y-2">

                <label htmlFor="message"
                className="text-sm">Message</label>

                <textarea
                name="message"
                id="message"
                cols="30"
                rows="7"
                placeholder="Enter Your Message Here"
                {...register("message",{required:true})}
               
                  className="w-full shadow-sm shadow-richblack-5 placeholder-richblack-400 rounded-[0.5rem] bg-richblack-700 p-[12px] pr-12 text-richblack-5"
                />
                
                {
                    errors.message &&
                    <span
                    className="mt-1 ml-2 text-[12px] text-yellow-100">
                        Please Enter Your Message
                    </span>

                }




            </div>


            <button type="submit" 
            className="btn bg-yellow-50 py-2  rounded-md text-center px-6 text-[16px] font-bold text-black">
                Send Message
            </button>

            </div>


        </form>
    )
}

export default ContactUsForm;
