import React from "react";
import { Link } from "react-router-dom";

const Foot=({link})=>{
    return(
        <Link to={`${link.link}`}
        className="font-inter text-richblack-400 text-[14px] hover:text-white transition-all duration-200">
        {link.title}
        </Link>
    )
}

export default Foot;