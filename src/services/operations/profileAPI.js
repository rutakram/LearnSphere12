import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../slices/authSlice"
import { resetCart } from "../../slices/cartSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { endpoints, profileEndpoints } from "../apis"
import {settingsEndpoints} from "../apis";


const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API,
  } = settingsEndpoints
  



//Change Profile Picture

export function changePicture(formData,token,navigate){

  return async(dispatch)=>{

    dispatch(setLoading(true));

    try{
     

      const response = await apiConnector("PUT", UPDATE_DISPLAY_PICTURE_API,formData, 
       {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
       }
      );


      console.log("Update Display Picture: ",response);
      toast.success("Image Uploaded Successfully");

      const userImage = response?.data?.data?.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`;


      dispatch(setUser({...response.data.data, image: userImage }))

      localStorage.setItem("user", JSON.stringify(response.data.data))

      navigate("/dashboard/my-profile")


    }catch(error){
      console.log("Error in update display picture");
      console.log(error);
      toast.error("Failed to Update Picture");

    }

    dispatch(setLoading(false));

  }


}


export function setProfile({dateOfBirth,gender,contactNumber,about},token){

  return async(dispatch)=>{

    dispatch(setLoading(true));

    try{

      const response = await apiConnector("PUT",UPDATE_PROFILE_API,{
        dateOfBirth:dateOfBirth,
        gender:gender,
        contactNumber:contactNumber,
        about:about
    }
    ,{ 
          Authorization: `Bearer ${token}`
       }
      );

      
    
      const userImage = response?.data?.data?.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`;


      dispatch(setUser({...response.data.data, image: userImage }))

      localStorage.setItem("user", JSON.stringify(response.data.data))

      toast.success("Profile Updated Successfully")

    }catch(error){
      console.log(error);
      toast.error("Error in updating profile");
    }

    dispatch(setLoading(false));

  }


}


export function passwordChange(token,email,oldPassword,newPassword,confirmPassword){

  return async(dispatch)=>{

    dispatch(setLoading(true));

    try{

      const response = await apiConnector("POST",CHANGE_PASSWORD_API,{
        email,oldPassword,newPassword,confirmPassword
      }
      ,{ 
        Authorization: `Bearer ${token}`
     });


      toast.success("Password Change Successfull");


    }catch(error){
      console.log(error);
      toast.error("Password Change Unsuccessfull")
    }

    dispatch(setLoading(false));


  }


}


export function deleteProfile(navigate,token){
  
  return async(dispatch)=>{

    try{

      const response = await apiConnector("DELETE",DELETE_PROFILE_API,
      {token}
      ,{ 
        Authorization: `Bearer ${token}`
      });
      
      dispatch(setToken(null))
  
      dispatch(setUser(null))
  
      dispatch(resetCart())
  
      localStorage.removeItem("token")
  
      localStorage.removeItem("user")
  
      toast.success("Profile Deleted Successfully")
  
      navigate("/")


    }catch(error){

      console.log(error);
      toast.error("Profile Deletion Unsuccessfull")

    }

    
  }
}


export async function getInstructorData(token){

  const toastId = toast.loading("Loading");

  let result = [];

  try{

    const response = await apiConnector("GET",profileEndpoints.GET_INSTRUCTOR_DATA_API,null,{
      Authorization: `Bearer ${token}`
    })

    console.log("GET INSTRUCTOR API RESPONSE -->",response);

    result = response?.data?.courses;
    

  }catch(error){
    
    console.log("GET INSTRUCTOR API ERROR....")
    toast.error("Could not get Instructor Data")
    console.log(error);

  }

  toast.dismiss(toastId);
  return result;


}

