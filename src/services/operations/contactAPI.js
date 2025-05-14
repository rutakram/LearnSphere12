import {contactusEndpoint} from "../apis";
import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"

export function contact(
    firstName,
    lastName,
    email,
    countryCode,
    phoneNumber,
    message
 ) {


    return async (dispatch) => {
     

      try {
        const response = await apiConnector("POST",contactusEndpoint.CONTACT_US_API,
       {firstName,lastName,email,countryCode,phoneNumber,message
        })

        console.log("Message API RESPONSE............", response)
  
        console.log(response.data.success)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("Message Sent Successfully")
       
      } catch (error) {
        console.log("Message API ERROR............", error)
        toast.error("Could Not Send Message")
      }
    

    }
  }

