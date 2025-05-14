import React from "react";
import { IoIosChatboxes } from "react-icons/io";
import { BsGlobeCentralSouthAsia } from "react-icons/bs";
import { IoCall } from "react-icons/io5";
import ContactUsForm from "../components/common/ContactPage/ContactUsForm";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";


const Contact = ()=>{
    return(
        <div>

            <div className="mt-20 gap-x-10 flex w-11/12 max-w-maxContent mx-auto ">

                <div className="lg:w-[40%]">
                    <div className="flex flex-col gap-6 rounded-xl bg-richblack-800 p-4 lg:p-6">

                        <div className="flex flex-col gap-[2px] p-3 text-sm text-richblack-200">

                        <div className="flex flex-row items-center gap-3">
                            <IoIosChatboxes className="text-3xl"/>
                            <h1 className="text-lg font-semibold text-richblack-5">
                                Chat on us
                            </h1>
                        </div>

                        <p className="font-medium">Our friendly team is here to help.</p>
                        <p className="font-semibold">info@learnsphere.com</p>
                        </div>



                        <div className="flex flex-col gap-[2px] p-3 text-sm text-richblack-200">

                        <div className="flex flex-row items-center gap-3">
                            <BsGlobeCentralSouthAsia className="text-2xl"/>
                            <h1 className="text-lg font-semibold text-richblack-5">
                            Visit us
                            </h1>
                        </div>

                        <p className="font-medium">Come and say hello at our office HQ.</p>
                        <p className="font-semibold">Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016</p>
                        </div>


                        <div className="flex flex-col gap-[2px] p-3 text-sm text-richblack-200">

                        <div className="flex flex-row items-center gap-3">
                            <IoCall className="text-2xl"/>
                            <h1 className="text-lg font-semibold text-richblack-5">
                            Call us
                            </h1>
                        </div>

                        <p className="font-medium">Mon - Fri From 8am to 5pm</p>
                        <p className="font-semibold">+123 456 7869</p>
                        </div>


                    </div>
                </div>

                
            <div className="w-[60%] flex px-14 py-14 flex-col border border-richblack-600 rounded-md ">
                <div>

                <h1 className="text-4xl leading-10 font-semibold text-richblack-5">
                    Got a Idea? We've got the skills. Let's team up
                </h1>
                
                <p className="mt-4 text-richblack-300">
                    Tell us more about yourself and what you're got in mind.
                </p>

                </div>

                <ContactUsForm/>



            </div>

            </div>


            {/* Review slider */}
            <div>

            <h1 className="text-white text-center text-4xl font-semibold mt-8">
                Reviews from other learners
            </h1>

            <ReviewSlider/>

            </div>


            <Footer/>



        </div>
    )
}

export default Contact;
