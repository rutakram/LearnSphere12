import React from "react";
import HighlightText from "../HomePage/HighlightText";

const Quote=()=>{
    return(
        <div className="mt-[80px] w-11/12 px-20 py-20 mx-auto text-4xl text-white text-center font-semibold">
        We are passionate about revolutionizing the way we learn. Our innovative platform 

        <HighlightText text={"combines technology"}/>

        <span
        className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold">
            {" "}
            , expertise
        </span>

        , and community to create an 

        <span
        className="bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold"
        >
            {" "}
        unparalleled educational experience.
        </span>

        </div>
    )
}

export default Quote;
