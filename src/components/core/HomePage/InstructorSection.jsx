import React from "react";
import Instructor from "../../../assets/Images/Instructor.png";
import HighlighText from "./HighlightText";
import Button from "./Button";
import { FaArrowRight } from "react-icons/fa";


const InstructorSection=()=>{
    return(
        <div className="mt-16">

            <div className="flex max-lg:flex-col lg:flex-row gap-20 items-center">

                <div className="lg:w-[50%] ">
                    <img 
                    src={Instructor}
                    alt="Instructor"
                    className="shadow-[-20px_-20px_0px_0px_#F5F5F5] shadow-white"
                    />
                </div>

                <div className="lg:w-[50%] flex flex-col gap-10">
                    <div className="text-4xl font-semibold w-[50%]">
                        Become an 
                        <HighlighText text={"Instructor"}/>
                    </div>

                    <p className="font-medium text-[16px] w-[90%] text-richblack-300 ">
                    Instructors from around the world teach millions of students on LearnSphere. We provide the tools and skills to teach what you love.
                    </p>

                    <div className="w-fit">

                   
                        <Button active={true} linkto={"/signup"}>
                            <div className="flex flex-row gap-2 items-center">    
                            
                            Start Teaching Today
                            <FaArrowRight/>

                            </div>
                        </Button>
                    


                    </div>


                </div>



            </div>


        </div>
    )
}

export default InstructorSection;
