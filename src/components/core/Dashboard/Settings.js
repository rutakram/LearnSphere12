import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { changePicture } from "../../../services/operations/profileAPI";
import { useNavigate } from "react-router-dom";
import Spinner from "../../common/Spinner";
import ProfileForm from "../ProfilePage/ProfileForm";
import PasswordChange from "../ProfilePage/PasswordChange";
import DeleteAccount from "../ProfilePage/DeleteAccount";

const Settings=()=>{

    const {user}=useSelector((state)=>state.profile);
    const {token}=useSelector((state)=>state.auth);

    const dispatch = useDispatch();


    const [loading,setLoading] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
         
          const formData = new FormData();
          formData.append("displayPicture", file);
          dispatch(changePicture(formData, token,navigate)); // Upload file immediately
          
        }

      };

    
    
        // const submitContactForm = async(data)=>{

        //     console.log("Logging Data",data);
    
        //     try{
    
        //         setLoading(true);
    
        //         const formData = new FormData();
        //         formData.append("displayPicture", data.displayPicture[0]); 
                
        //         dispatch(changePicture(formData, token,navigate)); 
    
        //         setLoading(false); 
    
        //     }catch(error){
    
        //         console.log(error.message);
        //         setLoading(false);
    
        //     }
    
        //     reset();
    
    
        // }
    

    
        const {
            register,
            handleSubmit,
            reset,
            formState:{errors,isSubmitSuccessful}
        } = useForm();


        
            useEffect(()=>{
                if(!isSubmitSuccessful){
                    reset({
                       displayPicture:""
                    })
                }
            },[reset,isSubmitSuccessful]);

            const navigate= useNavigate();
        
    



    return(
        <div className="flex flex-col gap-10 px-16">

            <h1  className="font-inter text-3xl font-semibold text-richblack-5">
                Edit Profile</h1>

            { loading ? (<Spinner/>) :
            (
                <div className="mx-auto flex flex-col gap-8 w-[800px] ml-12">
    
                    <div className="flex gap-4 p-6 rounded-md bg-richblack-800 border border-richblack-700">
                        <img src={user?.image}
                        className="h-[78px] w-[78px] rounded-full"/>
                        <div className="flex flex-col gap-2">
                            <p className="text-richblack-25 font-medium text-[16px] ">
                                Change Profile Picture</p>
    
                            <form >

                                <div className="flex gap-x-4">

                            <label 
                           htmlFor="displayPicture"
                           className="cursor-pointer font-semibold px-4 py-2 bg-yellow-25 rounded-md"
                           >
                               Change
                             </label>

                            <input 
                            type="file"
                            name="displayPicture"
                            id="displayPicture"
                            placeholder="Change"
                            {...register("displayPicture",{required:true})}
                            className="hidden" 
                            onChange={handleFileChange} 
                            accept="image/*"
                            />

                            <button type="submit" className = " border border-richblack-600 font-semibold px-4 py-2 bg-richblack-600 rounded-md text-richblack-50"
                            onClick={()=>{
                                dispatch(changePicture(null,token,navigate));
                            }}
                            > 
                                Remove
                            </button>
                            </div>
    
                            </form>
                        </div>
    
                    </div>

                    <div>
                        <ProfileForm/>
                    </div>

                    <div>
                        <PasswordChange/>
                    </div>

                    <div>
                       <DeleteAccount/> 
                    </div>
    
    
                </div>)
            }



        </div>
    )
}

export default Settings;
