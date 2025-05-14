import {toast} from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import rzpLogo from "../../assets/Logo/rzp_logo.png";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";


const { studentEndpoints } = require("../apis");

const {COURSE_PAYMENT_API,COURSE_VERIFY_API,SEND_PAYMENT_SUCCESS_EMAIL_API} 
= studentEndpoints;


function loadScript(src){

    return new Promise((resolve)=>{
        const script = document.createElement("script");
        script.src=src;

        script.onload = ()=>{
            resolve(true);
        }

        script.onerror = ()=>{
            resolve(false);
        }

        document.body.appendChild(script);
    })

}


export async function buyCourse(token,courses,userDetails,navigate,dispatch){

    const toastId = toast.loading("Loading");

    try{
        //load the script
        
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res){
            toast.error("Razorpay SDK failed to load");
            return;
        }

       
        

        //initiate the order
        const orderResponse = await apiConnector("POST",COURSE_PAYMENT_API,
            {courses},{
                Authorization:`Bearer ${token}`
            });


        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message)
        }

        console.log("order",orderResponse);
        

        //options
        const options ={
            key:"rzp_test_uhhaFg05HtdWOD",
            currency:orderResponse.data.message.currency,
            amount: orderResponse.data.message.amount,
            order_id:orderResponse.data.message.id,
            name:"StudyNotion",
            description:"Thank you for purchasing the course",
            image:rzpLogo,
            prefill:{
                name:`${userDetails.firstName}`,
                email:`${userDetails.email}`,
                contact: "9664815944"
            },
                            
            handler:function(response){
                //send success mail
                sendPaymentSucessEmail(response,orderResponse.data.message.amount,token);

                //verify payment
                verifyPayment({...response,courses},token,navigate,dispatch)
            }
        }


        console.log("you are hererwe");
        const paymentObject = new window.Razorpay(options);

        console.log("no---");
        paymentObject.open();

       console.log("her----");

        paymentObject.on("payment.failed",function(response){
            console.log("Razorpay Payment Error:", JSON.stringify(response.error, null, 2));
            toast.error("Oops Payment Failed")
            console.log(response.error);   
        })

       console.log("byeeee");



    }catch(error){

        console.log("PAYMENT API ERROR",error);
        toast.error("Could not make payment");

    }

    toast.dismiss(toastId);

}


async function sendPaymentSucessEmail(response,amount,token){

    try{

        console.log("erherhe");

        await apiConnector("POST",SEND_PAYMENT_SUCCESS_EMAIL_API,{
            orderId:response.razorpay_order_id,
            paymentId:response.razorpay_payment_id,
            amount
        },{
            Authorization: `Bearer ${token}`
        })

        console.log("no way u amcoiming");

    }catch(error){
        
        console.log("PAYMENT SUCCESS EMAIL ERROR...",error);

    }

}


//verify payment

async function  verifyPayment(bodyData,token,navigate,dispatch){

    const toastId = toast.loading("Verifying Payment...");
    dispatch(setPaymentLoading(true));

    try{

        const response = await apiConnector("POST",COURSE_VERIFY_API,bodyData,{
            Authorization: `Bearer ${token}`
        })

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        toast.success("Payment Successfull , you are added to the course");

        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());

    }catch(error){

        console.log("PAYMENT VERIFY ERROR...",error);
        toast.error("Could not verify payment");

    }

    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));

}





