import React from "react";
import Button from "./Button";
import HighlighText from "./HighlightText";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({
    postion,heading,subheading,ctabtn1,
    ctabtn2,codeblock,backgroundGradient,codeColor
})=>{

    return(
        <div className={`flex ${postion} my-20 justify-between gap-10`}>

            {/* Section - 1 */}

            <div className="lg:w-[50%] flex flex-col gap-8 ">
                {heading}

                <div className="text-richblack-300 font-bold ">
                    {subheading}
                </div>

                <div className="flex gap-7 mt-7">
                    <Button active={ctabtn1.active} linkto={ctabtn1.linkto}>
                        <div className="flex gap-2 items-center ">
                            {ctabtn1.btnText}
                            <FaArrowRight/>
                        </div>
                    </Button>

                    <Button active={ctabtn2.active} linkto={ctabtn2.linkto}>
                        {ctabtn2.btnText}
                    </Button>



                </div>

            </div>

            {/* Section - 2 */}

            <div className="relative flex lg:w-[500px] h-fit  py-4 code-border">

                <div className={` absolute z-[20] top-0 ${backgroundGradient}`}>

                </div>

                <div className="text-center flex flex-col lg:w-[10%] text-richblack-400 font-bold font-inter">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>


                <div className={`lg:w-[90%] pr-2 flex flex-col gap-2 font-bold font-mono ${codeColor}`}>
                    
                    <TypeAnimation
                    sequence={[codeblock,2000,""]}
                    repeat={Infinity}
                    cursor={true}
                    style={
                        {
                            display:"block",
                            whiteSpace:"pre-line"
                        }
                    }
                    omitDeletionAnimation={true}
                    />

                </div>

                

            </div>



        </div>
    )

}

export default CodeBlocks;
