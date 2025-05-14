import React from "react";

const Spinner = ()=>{
    return(
        <div className="flex my-auto flex-col justify-center items-center gap-y-6">

        <div className="spinner">
        </div>

        <p className="text-blue-50 text-2xl font-bold">Loading...</p>

        </div>
    )
}

export default Spinner;

