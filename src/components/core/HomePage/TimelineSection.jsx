import React from "react";

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from "../../../assets/Images/TimelineImage.png";

import timeline2 from '../../../assets/Images/timeline2.jpg'
const timeline =[
    {
        Logo:Logo1,
        heading:"Leadership",
        Description:"Fully committed to the success company"
    },
    {
        Logo:Logo2,
        heading:"Responsibility",
        Description:"Students will always be our top priority"
    },
    {
        Logo:Logo3,
        heading:"Flexibility",
        Description:"The ability to switch is an important skills"
    },
    {
        Logo:Logo4,
        heading:"Solve the problem",
        Description:"Code your way to a solution"
    }
]



const TimelineSection = ()=>{

    return(

        <div>

            <div className="flex max-lg:flex-col max-lg:items-center lg:flex-row gap-16 ">

                <div className="w-[45%] flex flex-col gap-20 ">
                    {
                        timeline.map((element,index)=>(
                            
                            <div className="flex flex-row gap-6" key={index}>
                                <div className="w-[50px] h-[50px] bg-white flex items-center rounded-full justify-center">
                                    <img src={element.Logo} />
                                </div>

                                <div className="relative">
                                    <h2 className="font-semibold text-[18px]">{element.heading}</h2>
                                    <p className="text-base ">{element.Description}</p>
                                   {index !== 3 ?
                                   ( <div className="absolute w-1 h-16 border-richblack-400 border-dotted border-r -left-12 -translate-x-1 translate-y-1"></div>):
                                    (" ")
                                   
                                }
                                </div>



                            </div>

                        ))
                    }
                </div>

                <div className="relative">
                    
                    <img src={timelineImage} 
                    alt="timelineImage"
                    className="shadow-white z-[20] relative 
                shadow-[20px_20px_0px_0px_#F5F5F5] object-cover h-fit"/>
                <div className="bg-code-time z-[10] absolute  w-[780px] h-[480px] -top-4 -left-12"></div>

                <div className="absolute z-[30] bg-caribbeangreen-700 flex flex-row text-white uppercase py-7
                left-[50%] -translate-x-[50%] -translate-y-[50%]">

                    <div className="flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7">
                        <p className="text-3xl font-bold ">10</p>
                        <p className="text-caribbeangreen-300 text-sm">Years  Experience</p>
                    </div>

                    <div className="flex gap-5 items-center px-7 ">
                    <p className="text-3xl font-bold ">250</p>
                    <p className="text-caribbeangreen-300 text-sm">types of courses</p>
                    </div>

                </div>



                </div>


            
            </div>

        </div>

    )

}

export default TimelineSection;
