import React from "react";
import HighlighText from "./HighlightText";
import Know_your_progress from "../../../assets/Images/Know_your_progress.png"
import Compare_with_others from "../../../assets/Images/Compare_with_others.png";
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png";
import Button from "./Button";


const LearningLanguageSection = ()=>{
    return(
        <div className="mt-[130px] mb-28">
            <div className="flex flex-col gap-5 items-center">

                <div className="text-4xl font-semibold text-center ">
                    Your Swiss Knife for
                    <HighlighText text={"learning any language"}/>
                </div>

                <div className="w-[80%] text-center font-medium text-richblack-600 mx-auto text-base ">
                Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                </div>

                <div className="flex max-lg:flex-col lg:flex-row gap-2 items-center justify-center mt-2">
                    <img 
                    src={Know_your_progress}
                    alt="KnowYourProgress"
                    className="object-contain -mr-32"
                    />

                    <img 
                    src={Compare_with_others}
                    alt="CompareWithOthers"
                    className="object-contain max-lg:-mt-16 max-lg:translate-x-10"
                    />
                    <img 
                    src={Plan_your_lessons}
                    alt="PlanYourLessons"
                    className="object-contain -ml-36 max-lg:-mt-20 max-lg:translate-x-28"
                    />

                </div>

                <div>
                    <Button active={true} linkto={"/signup"}>
                        Learn More
                    </Button>
                </div>




            </div>

        </div>
    )
}

export default LearningLanguageSection;
