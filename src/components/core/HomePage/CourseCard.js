import React from "react";
import { ImTree } from "react-icons/im";
import { IoPersonSharp } from "react-icons/io5";

const CourseCard=({data,currentCard,setCurrentCard})=>{
   
    return(
        <div className={`
            ${currentCard === data.heading ?
                ("shadow-yellow-50 bg-white shadow-[12px_12px_0_0] "):
                ("bg-richblack-800 ")
            }
         w-[360px] transition-all duration-200  text-richblack-25 h-[300px] box-border cursor-pointer`}
         onClick={()=>setCurrentCard(data.heading)}
         >

            <div className="border-b-[2px] border-richblack-400 border-dashed h-[80%] p-6 flex flex-col gap-3">


            <p className={`
            ${currentCard === data.heading ?
                ("text-richblack-800"):
                ("text-richblack-25")}
            text-[20px] font-semibold transition-all duration-200`}
            
            >{data.heading}</p>

            <p className="text-richblack-400">
                {data.description}</p>

            </div>
            <div className={`
                ${currentCard === data.heading ?
                    ("text-blue-300"):
                    ("text-richblack-300")
                } 
             flex font-medium items-center px-6 py-3 justify-between transition-all duration-200`}>
                
                <div className="flex gap-2 items-center justify-center">
                    <IoPersonSharp/>
                    {data.level}
                </div>

                <div className="flex gap-2 items-center">
                    <ImTree/>
                    {data.lessionNumber}
                    <div>Lession</div>
                    </div>
            </div>

        </div>
    )

}

export default CourseCard;
