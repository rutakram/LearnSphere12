import React from "react";
import  { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {apiConnector} from "../../../services/apiconnector";
import {contactusEndpoint} from "../../../services/apis";
import CountryCode from "../../../data/countrycode.json";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../../../services/operations/profileAPI";
import { FaCalendar } from "react-icons/fa";


const ProfileForm = ()=>{
    
        const [loading,setLoading] = useState(false);
        const dispatch = useDispatch();
        const {user} = useSelector((state)=>state.profile);
        
        const {token}=useSelector((state)=>state.auth);
        
        const [selectedGender, setSelectedGender] = useState(user?.additionalDetails?.gender);


        const submitContactForm = async(data)=>{

            console.log("Logging Data",data);
    
            try{
    
                setLoading(true);

                data.gender=selectedGender;
    
               dispatch(setProfile(data,token));
    
                setLoading(false); 
    
            }catch(error){
    
                console.log(error.message);
                setLoading(false);
    
            }
    
            reset();
    
    
        }

        const initialValues = {
            firstName: `${user?.firstName ?? " "} `,
            lastName:  ` ${user?.lastName ?? " "}` ,
            dateOfBirth: `${user?.additionalDetails?.dateOfBirth ?? ''}`,
            gender: `${user?.additionalDetails?.gender ?? ""}`,
            countryCode: "+91",
            contactNumber: `${user?.additionalDetails?.contactNumber ?? ""}`,
            about: `${user?.additionalDetails?.about ?? ""}`  
        }
    
        const {
            register,
            handleSubmit,
            reset,
            formState:{errors,isSubmitSuccessful}
        } = useForm({
            defaultValues: initialValues
        });
    
    
        
    
    return(
        <div className="flex flex-col gap-4 p-6 rounded-md  border border-richblack-700">

            <h1 className="text-[18px] font-semibold text-richblack-5"> 
                Profile Information</h1>

            <div className="flex flex-col gap-y-4 mb-4">
             <p className="text-sm text-white">Display Name</p>
             <div  className="w-full shadow-sm placeholder-richblack-400 shadow-richblack-5 rounded-[0.5rem] bg-richblack-700 p-[12px] pr-12 text-richblack-200">
                {user?.firstName} {" "} {user?.lastName}
             </div>
           
    

           

            </div>


            <form onSubmit={handleSubmit(submitContactForm)}>

<div className="flex flex-col gap-y-8 text-white ">



<div className="flex gap-x-4 justify-between items-center">

{/* Date of Birth */}

<div className="flex flex-col gap-y-2 w-[50%] relative">

       <label htmlFor="dateOfBirth"
        className="text-sm">
            Date Of Birth
        </label>

        <input 
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            {...register("dateOfBirth",{required:true})}
         
              className="w-full shadow-sm  shadow-richblack-5 rounded-[0.5rem] bg-richblack-700 p-[12px] pr-12 text-richblack-200
              [&::-webkit-calendar-picker-indicator]:opacity-0"
        />

        <span className="absolute top-11 right-12 pointer-events-none text-richblack-200">
            <FaCalendar/>
        </span>
           
           {
                errors.dateOfBirth && (
                    <span
                    className="mt-1 ml-2 text-[12px] text-yellow-100">
                        Please Enter Your About
                    </span>
                )
            }



</div>


{/* Gender */}

<div className="flex flex-col gap-y-2 w-[45%]">

    <p>Gender</p>

    <div className="flex  justify-between w-full shadow-sm  shadow-richblack-5 rounded-[0.5rem] bg-richblack-700 p-[12px] pr-12 text-richblack-5">

        <div className="flex items-center gap-x-2">
        <input 
            type="radio"
            name="gender"
            id="male"
            value="Male"
            {...register("gender",{required:true})}
            onChange={()=>setSelectedGender("Male")}
            className="hidden"
            />
           

       <label htmlFor="male"
        className={`flex cursor-pointer justify-center items-center gap-x-2 ${selectedGender === "Male" ? ("text-richblack-5") : ("text-richblack-200")} `}>
            <span className={`flex items-center justify-center w-4 h-4 rounded-full border-2 ${selectedGender==="Male" ? ("border-yellow-50") : ("")}`}>
                {selectedGender === "Male" &&
                <span className="w-2 absolute z-[20] h-2 rounded-full bg-yellow-50">

                </span>
                }
            </span>
             Male
        </label>

        </div>

        <div className="flex items-center gap-x-2">
        <input 
            type="radio"
            name="gender"
            id="female"
            value="Female"
            {...register("gender",{required:true})}
            onChange={()=>setSelectedGender("Female")}
            className="hidden"
            />
           

       <label htmlFor="female"
        className={`flex cursor-pointer justify-center items-center gap-x-2 ${selectedGender === "Female" ? ("text-richblack-5") : ("text-richblack-200")} `}>
            <span className={`flex items-center justify-center w-4 h-4 rounded-full border-2 ${selectedGender==="Female" ? ("border-yellow-50") : ("")}`}>
                {selectedGender === "Female" &&
                <span className="w-2 absolute z-[20] h-2 rounded-full bg-yellow-50">

                </span>
                }
            </span>
             Female
        </label>

        </div>

        <div className="flex items-center gap-x-2">
        <input 
            type="radio"
            name="gender"
            id="others"
            value="Others"
            {...register("gender",{required:true})}
            onChange={()=>setSelectedGender("Others")}
            className="hidden"
            />
           

       <label htmlFor="others"
        className={`flex cursor-pointer justify-center items-center gap-x-2 ${selectedGender === "Others" ? ("text-richblack-5") : ("text-richblack-200")} `}>
            <span className={`flex items-center justify-center w-4 h-4 rounded-full border-2 ${selectedGender==="Others" ? ("border-yellow-50") : ("")}`}>
                {selectedGender === "Others" &&
                <span className="w-2 absolute z-[20] h-2 rounded-full bg-yellow-50">

                </span>
                }
            </span>
             Others
        </label>

        </div>
           
    </div >
    {
                errors.gender && (
                    <span
                    className="mt-1 ml-2 text-[12px] text-yellow-100">
                        Please Enter Your Gender
                    </span>
                )
            }



</div>





</div>



<div className="flex justify-between items-center">

{/* Phone Number */}

<div className="flex flex-col  gap-y-2">
    
    <label htmlFor="contactNumber" className="text-sm">Phone Number</label>

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
            name="contactNumber"
            id="contactNumber"
            placeholder="12345 67890"
            {...register("contactNumber",
                {
                    required:{value:true,message:"Please Enter Phone Number "},
                    maxLength:{value:10,message:"Invalid Phone Number"},
                    minLength:{value:8,message:"Invalid Phone Number"}
                })}
                
                className="w-full shadow-sm placeholder-richblack-400 shadow-richblack-5 rounded-[0.5rem] bg-richblack-700 p-[12px] pr-12 text-richblack-200"
                />

        </div>

    </div>


</div>

{/* About */}


<div className="flex flex-col w-[45%] gap-y-2">
        <label htmlFor="about"
        className="text-sm">
           About
        </label>

            <input 
            type="text"
            name="about"
            id="about"
            placeholder="Enter Your About"
            {...register("about",{required:true})}
         
              className="w-full shadow-sm placeholder-richblack-400 shadow-richblack-5 rounded-[0.5rem] bg-richblack-700 p-[12px] pr-12 text-richblack-200"
            />
            {
                errors.about && (
                    <span
                    className="mt-1 ml-2 text-[12px] text-yellow-100">
                        Please Enter Your About
                    </span>
                )
            }

    </div>



</div>





<div className="mt-4 flex items-center gap-x-4 justify-center w-full ">

<button type="submit" 
className=" bg-yellow-50 py-2  rounded-md text-center px-6 text-[16px] font-bold text-black">
    Save
</button>

<button 
type="button"
className="bg-richblack-700 py-2 px-4 rounded-md"
onClick={()=>{reset(initialValues)}}>
    Cancel
</button>

</div>
</div>


</form>
        </div>
    )
}

export default ProfileForm;
