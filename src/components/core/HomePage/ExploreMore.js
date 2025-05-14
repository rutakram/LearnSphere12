import React, { useState } from "react";
import {HomePageExplore} from "../../../data/homepage-explore";
import HighlighText from "./HighlightText";
import CourseCard from "./CourseCard";

const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skill paths",
    "Career paths"
]

const ExploreMore= ()=>{

    const [currentTab,setCurrentTab] = useState(tabsName[0]);
    const [courses,setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard,setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards=(value)=>{

        setCurrentTab(value);
        const result=HomePageExplore.filter((course)=>course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);

    }

    return(
        <div className="relative max-lg:h-[1350px]">

            <div className="text-4xl font-semibold text-center">
                Unlock the 
                <HighlighText text={"Power of Code"}/>
            </div>

            <p className="text-center text-richblack-300 text-lg font-semibold mt-3">
            Learn to Build Anything You Can Imagine
            </p>

            <div className="flex max-lg:flex-col lg:flex-row items-center gap-2 lg:rounded-full bg-richblack-800 mb-5 mt-5
            max-lg:w-[50%] max-lg:rounded-lg max-lg:mx-auto
             px-1 py-1 shadow-sm shadow-richblack-50">
                {
                    tabsName.map((element,index)=>{
                        return(
                            <div
                            className={`text-[16px] 
                                ${currentTab === element ? 
                                    ("bg-richblack-900 text-richblack-5 font-medium"):
                                    ("text-richblack-200 ")
                                }
                                 rounded-full transition-all duration-200 cursor-pointer
                                 hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2`}
                            key={index}
                            onClick={()=>{setMyCards(element)}}
                            >
                                {element}
                            </div>
                        )
                    })
                }
            </div>


            <div className="lg:h-[150px] "></div>


            <div className="flex max-lg:flex-col absolute lg:-translate-y-28 gap-12 lg:-translate-x-[20%] ">
                {
                    courses.map((element,index)=>(
                        <CourseCard
                        key={index}
                        data={element}
                        currentCard={currentCard}
                        setCurrentCard={setCurrentCard}
                        />
                    ))
                }


            </div>


        </div>
    )
}

export default ExploreMore;
