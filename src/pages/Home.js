import React, { act } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/HomePage/HighlightText";
import Button from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import Footer from "../components/common/Footer";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import ReviewSlider from "../components/common/ReviewSlider";
import banneringvideo from '../assets/Images/bannering.mp4'


const Home=()=>{


    return(
        <div>
            {/* Section - 1 */}
            <div className="relative mx-auto flex flex-col w-11/12 items-center
             text-white justify-between max-w-maxContent">

              

                <div className="group shadow-richblack-300 mt-16 p-1 mx-auto rounded-md bg-richblack-700 font-bold text-richblack-200
                transition-all duration-200 hover:scale-95 w-fit ">
                    <Link to={"/signup"}>
                    <div className="flex items-center gap-2 rounded-md
                    px-10 py-[5px] transition-all duration-200
                    group-hover:bg-richblack-900">
                        <p>Become an Instructor</p>
                        <FaArrowRight/>
                    </div>

                    </Link>
                </div>
                
              

                <div className="mt-7 text-center text-4xl font-semibold ">
                    Empower Your Future With 
                    <HighlightText text={"Coding Skills"}/>
                </div>

                <div className="mt-4 w-[90%] font-bold text-center text-lg  text-richblack-300">
                With our online coding courses, you can learn at
                your own pace, from anywhere in the world, and
                get access to a wealth of resources, including
                hands-on projects, quizzes, and personalized 
                feedback from instructors.
                </div>

                <div className="flex flex-row gap-7 mt-8 font-bold ">
                    <Button 
                    active={true} linkto={"/signup"}
                    >
                        Learn More
                    </Button>

                    <Button
                    active={false} linkto={"/login"}>
                        Book a Demo
                    </Button>
                </div>


                <div className="mx-3 my-12
             shadow-[-10px_-8px_50px_-5px] shadow-blue-200"
                >
                <video
                muted 
                loop
                autoPlay
                className="
                 shadow-white
                shadow-[20px_20px_0px_0px_#F5F5F5]"
                >
                    <source 
                    src={banneringvideo}
                    type="video/mp4"
                    >
                    </source>

                </video>

                

               
                </div>


                {/* Code Section - 1 */}

                <div>

                    <CodeBlocks 
                    postion={"lg:flex-row max-lg:flex-col"}
                    heading={
                        <div className="text-4xl font-semibold">
                            Unlock your 
                            <HighlightText text={" coding potential "}/> 
                            with our online courses.
                        </div>
                    }
                    subheading={
                        "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                    }
                    ctabtn1={
                        {
                            btnText:"Try it Yourself",
                            linkto:"/signup",
                            active:true
                        }
                    }
                    ctabtn2={
                        {
                            btnText:"Learn More",
                            linkto:"/login",
                            active:false
                        }
                    }
                    codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title><linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><a href="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><a href="two/">Two</a><a href="three/">Three</a>\n</nav>`}
                    codeColor={"text-yellow-25"}
                    backgroundGradient={"bg-code-1"}

                    />

                </div>


                {/* Code Section - 2  */}
                <div>

<CodeBlocks 
postion={"lg:flex-row-reverse max-lg:flex-col"}
heading={
    <div className="text-4xl font-semibold">
        Start 
        <HighlightText text={" coding in seconds "}/> 
       
    </div>
}
subheading={
    "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
}
ctabtn1={
    {
        btnText:"Continue Lesson",
        linkto:"/signup",
        active:true
    }
}
ctabtn2={
    {
        btnText:"Learn More",
        linkto:"/login",
        active:false
    }
}
codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n</h1><ahref="/">Header</a>\n</h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
codeColor={"font-bold "}
backgroundGradient={"bg-code-2"}

/>

                </div>


                <ExploreMore/>
                


            </div>


            {/* Section - 2 */}
            <div className="bg-pure-greys-5 text-richblack-700 mt-20">
                <div className="homepage_bg h-[330px]">

                    <div className="w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto">

                    <div className="h-[150px]"></div>
                    <div className="flex flex-row gap-7 text-white ">
                        
                        <Button active={true} linkto={"/signup"}>
                        <div className="flex items-center gap-3">
                            Explore Full Catalog
                            <FaArrowRight/>
                        </div>
                        </Button>

                        <Button active={false} linkto={"/signup"}>
                        <div>
                            Learn More
                        </div>
                        </Button>

                    </div>



                    </div>

                </div>

                <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between
                gap-7">

                    <div className="flex max-lg:flex-col lg:flex-row gap-5 mb-10 mt-[95px] justify-between">
                        <div className="text-4xl font-semibold lg:w-[45%]">
                            Get the Skills you need for a 
                            <HighlightText text={"job that is in demand."}/>
                        </div>

                    <div className="flex flex-col gap-10 lg:w-[40%] items-start">
                        <div className="text-[16px] ">
                        The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                        </div>

                        <Button active={true} linkto={"/signup"}>
                        <div>
                        Learn More
                        </div>
                        </Button>

                    </div>

                    </div>


                <TimelineSection/>

                <LearningLanguageSection/>
                </div>



            </div>
            

            {/* Section - 3 */}
            <div className="w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 
            first-letter bg-richblack-900 text-white  ">

                <InstructorSection/>

                <h2 className="text-center text-4xl font-semibold mt-10 ">Reviews from other learners</h2>

                <ReviewSlider/>
                
            </div>


            {/* Footer */}

            <Footer/>


        </div>
    )

}

export default Home;